import { createReadStream, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDirectory = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT) || 5173;

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

function getFilePath(requestUrl) {
  const url = new URL(requestUrl, 'http://localhost');
  const requestedPath = url.pathname === '/' ? '/index.html' : url.pathname;
  const filePath = resolve(projectDirectory, `.${normalize(requestedPath)}`);

  if (!filePath.startsWith(projectDirectory)) {
    return null;
  }

  return filePath;
}

export function iniciarServidor(porta = port) {
  const server = createServer((request, response) => {
    const filePath = getFilePath(request.url);

    if (!filePath || !existsSync(filePath)) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Arquivo nao encontrado.');
      return;
    }

    response.writeHead(200, {
      'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream',
    });
    createReadStream(filePath).pipe(response);
  });

  return server.listen(porta, () => {
    console.log(`Frontend rodando em http://localhost:${porta}`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  iniciarServidor();
}
