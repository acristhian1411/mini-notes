import fs from 'fs';
import path from 'path';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
  const form = await request.formData();
  const file = form.get('file');

  if (!file || !file.name.endsWith('.md')) {
    throw error(400, 'Archivo inválido');
  }

  const content = await file.text();
  const filePath = path.resolve('src/lib/notes', file.name);

  fs.writeFileSync(filePath, content, 'utf-8');
  return json({ status: 'ok', path: `/` + file.name.replace('.md', '') });
};
