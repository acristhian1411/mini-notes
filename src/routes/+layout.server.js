import { getNoteList } from '$lib/server/getNoteList';
import fs from 'fs';
import path from 'path';
function getLooseFiles() {
	const dir = path.resolve('src/lib/notes');
	return fs
	  .readdirSync(dir)
	  .filter((f) => f.endsWith('.md') && fs.statSync(path.join(dir, f)).isFile())
	  .map((f) => f.replace('.md', ''));
  }

export async function load() {
	const notes = getNoteList();
	const looseFiles = getLooseFiles();
	return { notes, looseFiles };
}
