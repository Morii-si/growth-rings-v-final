import { createServer } from 'node:http';
import { cp, mkdir, readFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve, extname } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const mode = process.argv[2];
if (mode === 'build') {
  const dist = join(root, 'dist');
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  await cp(join(root, 'index.html'), join(dist, 'index.html'));
  await cp(join(root, 'assets'), join(dist, 'assets'), { recursive: true });
  console.log('Static frontend ready: dist/');
} else if (mode === 'serve' || mode === 'preview') {
  const base = mode === 'preview' ? join(root, 'dist') : root;
  const args = process.argv.slice(3);
  const portAt = args.indexOf('--port');
  const port = Number(portAt >= 0 ? args[portAt + 1] : process.env.PORT || 5173);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw Error('Invalid port');
  const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.txt': 'text/plain; charset=utf-8' };
  createServer(async (req, res) => {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
      const file = resolve(base, relative);
      if (!(relative === 'index.html' || relative.startsWith('assets/')) || !file.startsWith(resolve(base) + '/')) {
        res.writeHead(404); res.end('Not found'); return;
      }
      const data = await readFile(file);
      res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' });
      res.end(req.method === 'HEAD' ? undefined : data);
    } catch { res.writeHead(404); res.end('Not found'); }
  }).listen(port, '0.0.0.0', () => console.log(`Static preview: http://localhost:${port}`));
} else {
  throw Error('Use npm run build, npm run dev, or npm run preview');
}
