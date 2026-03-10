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
            exec('git add . && git commit -m "chore: auto sync from preview" && git push', (err, stdout, stderr) => {
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
                const { name, email, username, token } = JSON.parse(body);
                const safeName = name?.replace(/"/g, '\\"');
                const safeEmail = email?.replace(/"/g, '\\"');
                
                exec('git config --get remote.origin.url', (errUrl, stdoutUrl, stderrUrl) => {
                  let originUrl = stdoutUrl.trim();
                  
                  if (errUrl || !originUrl) {
                    // Fallback just in case, though unlikely
                    originUrl = `https://github.com/${username}/repository.git`;
                  }
                  
                  // Clean up existing credentials if any
                  originUrl = originUrl.replace(/https:\/\/[^@]*@/, 'https://');
                  
                  let newOriginUrl = originUrl;
                  if (token && username) {
                     newOriginUrl = originUrl.replace('https://', `https://${username}:${token}@`);
                  }
                  
                  const commands = [];
                  if (safeName && safeEmail) {
                    commands.push(`git config --global user.name "${safeName}"`);
                    commands.push(`git config --global user.email "${safeEmail}"`);
                  }
                  commands.push(`git remote set-url origin "${newOriginUrl}"`);
                  
                  exec(commands.join(' && '), (err, stdout, stderr) => {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: !err, output: 'GitHub credentials updated successfully!\n' + (stderr || '') }));
                  });
                });
              } catch (e) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, output: 'Invalid JSON' }));
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
