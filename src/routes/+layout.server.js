import { getNoteList } from '$lib/server/getNoteList';

export async function load() {
	const notes = getNoteList();
	return { notes };
}
