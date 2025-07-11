import fs from 'fs';
import path from 'path';

export function getNoteList() {
	// const notesDir = path.resolve('src/lib/notes');
	// const files = fs.readdirSync(notesDir);

	// // Filtramos los archivos .md y sacamos la extensión
	// return files
	// 	.filter((file) => file.endsWith('.md'))
	// 	.map((file) => file.replace('.md', ''));

	const baseDir = path.resolve('src/lib/notes');

  const walk = (dirPath) => {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    return entries.reduce((acc, entry) => {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        acc[entry.name] = walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const name = entry.name.replace('.md', '');
        acc[name] = path.relative(baseDir, fullPath).replace(/\.md$/, '');
      }
      return acc;
    }, {});
  };

  return walk(baseDir);
}
