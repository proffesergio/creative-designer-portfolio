require('dotenv').config();
const { spawn } = require('child_process');

const child = spawn('npx', ['next', 'start'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env },
});

child.on('error', (error) => {
  console.error('Failed to start Next.js:', error);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code);
});
