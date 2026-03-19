import { exec } from 'child_process';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'git-push-api',
        configureServer(server) {
          server.middlewares.use('/_git_status', (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            exec('git status -s', (err, stdout, stderr) => {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: !err, output: stdout + (stderr || '') }));
            });
          });

          server.middlewares.use('/_git_push', (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            exec('git add . && git commit -m "chore: auto sync from preview" ; git push -f origin HEAD:main', (err, stdout, stderr) => {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: !err, output: stdout + (stderr || '') }));
            });
          });

          server.middlewares.use('/_git_config', (req, res) => {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
              try {
                const { name, email } = JSON.parse(body);
                // Basic sanitization
                const safeName = name.replace(/"/g, '\\"');
                const safeEmail = email.replace(/"/g, '\\"');
                exec(`git config --global user.name "${safeName}" && git config --global user.email "${safeEmail}"`, (err, stdout, stderr) => {
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: !err, output: stdout + (stderr || '') }));
                });
              } catch (e) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, output: 'Invalid JSON' }));
              }
            });
          });

          server.middlewares.use('/_execute_cmd', (req, res) => {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
              try {
                const { cmd } = JSON.parse(body);
                if (typeof cmd !== 'string') throw new Error('Invalid Command');
                exec(cmd, (err, stdout, stderr) => {
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: !err, output: stdout + (stderr || '') }));
                });
              } catch (e) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, output: 'Error Executing' }));
              }
            });
          });

          server.middlewares.use('/_github_auth', (req, res) => {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
              try {
                const { name, email, repoUrl, token } = JSON.parse(body);
                const safeName = name?.replace(/"/g, '\\"');
                const safeEmail = email?.replace(/"/g, '\\"');
                
                let newOriginUrl = repoUrl;
                if (token && repoUrl) {
                  // e.g. https://github.com/user/repo.git -> https://x-access-token:<token>@github.com/user/repo.git
                   newOriginUrl = repoUrl.replace('https://github.com/', `https://x-access-token:${token}@github.com/`);
                }
                
                const commands = [];
                if (safeName && safeEmail) {
                  commands.push(`git config --global user.name "${safeName}"`);
                  commands.push(`git config --global user.email "${safeEmail}"`);
                }
                // Also set user locally just in case
                if (safeName && safeEmail) {
                  commands.push(`git config user.name "${safeName}"`);
                  commands.push(`git config user.email "${safeEmail}"`);
                }
                
                if (newOriginUrl) {
                  // Try changing existing origin, if fails then add origin
                  commands.push(`git remote set-url origin "${newOriginUrl}" || git remote add origin "${newOriginUrl}"`);
                }
                
                exec(commands.join(' && '), (err, stdout, stderr) => {
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: !err, output: 'GitHub configured successfully!\n' + (stderr || '') }));
                });
              } catch (e) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, output: 'Invalid JSON' }));
              }
            });
          });

          server.middlewares.use('/_github_device_code', async (req, res) => {
            try {
              const resp = await fetch('https://github.com/login/device/code', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ client_id: '178c6fc778ccc68e1d6a', scope: 'repo user' }).toString()
              });
              const json = await resp.json();
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(json));
            } catch(e) {
              res.writeHead(500); res.end('Error');
            }
          });

          server.middlewares.use('/_github_device_token', (req, res) => {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', async () => {
              try {
                const { device_code } = JSON.parse(body);
                const resp = await fetch('https://github.com/login/oauth/access_token', {
                  method: 'POST',
                  headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: new URLSearchParams({ 
                    client_id: '178c6fc778ccc68e1d6a', 
                    device_code, 
                    grant_type: 'urn:ietf:params:oauth:grant-type:device_code' 
                  }).toString()
                });
                const json = await resp.json();
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(json));
              } catch(e) {
                res.writeHead(500); res.end('Error');
              }
            });
          });
        }
      }
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
