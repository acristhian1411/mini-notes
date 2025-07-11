import fs from 'fs';
import path from 'path';
import { error } from '@sveltejs/kit';

export async function GET({ params }) {
  const filePath = path.resolve('src/lib/notes', `${params.slug}.md`);

  if (!fs.existsSync(filePath)) throw error(404, 'Archivo no encontrado');

  const file = fs.readFileSync(filePath);

  return new Response(file, {
    headers: {
      'Content-Type': 'text/markdown',
      'Content-Disposition': `attachment; filename="${params.slug}.md"`
    }
  });
}
