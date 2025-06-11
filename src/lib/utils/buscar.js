// src/lib/utils/buscar.js
import Fuse from 'fuse.js';
import fs from 'fs';
import path from 'path';

const notesDir = path.resolve('src/lib/notes');

export function buscarNotas(query, options = { caseSensitive: false }) {
  const files = fs.readdirSync(notesDir).filter(f => f.endsWith('.md'));
  const documentos = files.map(name => {
    const content = fs.readFileSync(path.join(notesDir, name), 'utf-8');
    return { title: name.replace('.md', ''), content };
  });

  const fuse = new Fuse(documentos, {
    keys: ['title', 'content'],
    isCaseSensitive: options.caseSensitive ?? false,
    includeScore: true,
    threshold: 0.4
  });

  return fuse.search(query).map(res => res.item);
}
