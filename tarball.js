import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Minimal tar-gz creator in pure node (no external dependencies)
function createTarball(srcDirs, destFile) {
  const writeStream = fs.createWriteStream(destFile);
  const gzip = zlib.createGzip();
  gzip.pipe(writeStream);

  // Helper to pad metadata headers to 512 bytes
  function pad(num, size) {
    let s = num.toString(8);
    while (s.length < size - 1) s = "0" + s;
    return s + "\0";
  }

  function writeHeader(name, size, type) {
    const buffer = Buffer.alloc(512);
    // File name
    buffer.write(name, 0);
    // File mode
    buffer.write("0000777\0", 100);
    // Owner UID
    buffer.write("0000000\0", 108);
    // Group GID
    buffer.write("0000000\0", 116);
    // File size in octal
    buffer.write(pad(size, 12), 124);
    // Last modification time
    buffer.write(pad(Math.floor(Date.now() / 1000), 12), 136);
    // Checksum placeholder
    buffer.write("        ", 148);
    // File type (0 for normal file, 5 for directory)
    buffer.write(type, 156);

    // Calculate checksum
    let chksum = 0;
    for (let i = 0; i < 512; i++) {
      chksum += buffer[i];
    }
    buffer.write(pad(chksum, 8), 148);
    gzip.write(buffer);
  }

  function addFile(filePath, relativePath) {
    const stats = fs.statSync(filePath);
    const content = fs.readFileSync(filePath);
    console.log(`Adding file: ${relativePath} (${stats.size} bytes)`);
    writeHeader(relativePath, stats.size, "0");
    gzip.write(content);
    
    const odd = stats.size % 512;
    if (odd > 0) {
      gzip.write(Buffer.alloc(512 - odd));
    }
  }

  function addDir(dirPath, relativeDirPrefix) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      if (file === 'node_modules' || file === 'dist' || file === '.git' || file === '.next' || file.endsWith('.zip') || file.endsWith('.tar.gz')) {
        continue;
      }
      const fullPath = path.join(dirPath, file);
      const relPath = relativeDirPrefix ? `${relativeDirPrefix}/${file}` : file;
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        addDir(fullPath, relPath);
      } else if (stats.isFile()) {
        addFile(fullPath, relPath);
      }
    }
  }

  // Add individual files or entire directories
  for (const item of srcDirs) {
    if (fs.existsSync(item)) {
      const stats = fs.statSync(item);
      if (stats.isDirectory()) {
        addDir(item, item);
      } else {
        addFile(item, item);
      }
    }
  }

  // End tar file with 1024 bytes of zeros
  gzip.write(Buffer.alloc(1024));
  gzip.end();
  console.log(`Successfully created tarball: ${destFile}`);
}

createTarball(
  ['src', 'public', 'package.json', 'metadata.json', 'tsconfig.json', 'vite.config.ts', 'index.html', 'add-data-translations.ts', 'translate-data.ts'],
  'public/sutra-construction.tar.gz'
);
