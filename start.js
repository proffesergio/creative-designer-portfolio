const { spawn } = require('child_process');
const fs = require('fs');

const env = { ...process.env };
const envFile = fs.readFileSync('.env', 'utf8');
envFile.split('\n').forEach((line) => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    env[key.trim()] = valueParts.join('=').trim();
  }
});

const child = spawn('npx', ['next', 'start'], {
  stdio: 'inherit',
  shell: true,
  env,
});

child.on('error', (error) => {
  console.error('Failed to start Next.js:', error);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code);
});
