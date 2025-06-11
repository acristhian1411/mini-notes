import fs from 'fs';
import path from 'path';
import { redirect } from '@sveltejs/kit';

export async function POST({ request }) {
  const formData = await request.formData();
  const filename = formData.get('filename')?.toString().trim();

  if (!filename || filename.includes('/')) {
    return new Response('Nombre inválido', { status: 400 });
  }

  const filePath = path.resolve('src/lib/notes', `${filename}.md`);

  if (fs.existsSync(filePath)) {
    return new Response('Ya existe una nota con ese nombre', { status: 400 });
  }

  fs.writeFileSync(filePath, `# ${filename}\n\nTu contenido aquí...`);

  throw redirect(303, `/${filename}`);
}
