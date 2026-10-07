const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function main() {
  const targetDir = path.join(process.env.LOCALAPPDATA, 'MinGit');
  const gitExe = path.join(targetDir, 'cmd', 'git.exe');
  
  if (fs.existsSync(gitExe)) {
    console.log('MinGit already exists at:', gitExe);
    return;
  }

  const url = 'https://github.com/git-for-windows/git/releases/download/v2.56.0.windows.2/MinGit-2.56.0.2-64-bit.zip';
  const zipPath = path.join(process.env.TEMP, 'mingit.zip');

  console.log('Downloading MinGit from', url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(zipPath, Buffer.from(arrayBuffer));
  console.log('Downloaded', fs.statSync(zipPath).size, 'bytes');

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log('Extracting with tar or powershell...');
  try {
    execSync(`tar -xf "${zipPath}" -C "${targetDir}"`, { stdio: 'inherit' });
  } catch (e) {
    execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${targetDir}' -Force"`, { stdio: 'inherit' });
  }

  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
  console.log('Extraction complete! Git executable:', gitExe);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
