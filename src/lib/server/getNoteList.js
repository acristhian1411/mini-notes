import fs from 'fs';
import path from 'path';

export function getNoteList() {
	const notesDir = path.resolve('src/lib/notes');
	const files = fs.readdirSync(notesDir);

	// Filtramos los archivos .md y sacamos la extensión
	return files
		.filter((file) => file.endsWith('.md'))
		.map((file) => file.replace('.md', ''));
}
