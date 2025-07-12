import fs from 'fs';
import path from 'path';
import { redirect } from '@sveltejs/kit';

export async function POST({ request }) {
  // const formData = await request.formData();
  // const filename = formData.get('filename')?.toString().trim();

  // if (!filename || filename.includes('/')) {
  //   return new Response('Nombre inválido', { status: 400 });
  // }

  // const filePath = path.resolve('src/lib/notes', `${filename}.md`);

  // if (fs.existsSync(filePath)) {
  //   return new Response('Ya existe una nota con ese nombre', { status: 400 });
  // }

  // fs.writeFileSync(filePath, `# ${filename}\n\nTu contenido aquí...`);

  // throw redirect(303, `/${filename}`);

  const formData = await request.formData();
  const inputName = formData.get('filename')?.toString().trim();

  if (!inputName) {
    return new Response('Nombre inválido', { status: 400 });
  }

  // Limpiar y normalizar ruta
  const safePath = inputName.replace(/[^a-zA-Z0-9/_\- ]/g, '').replace(/\s+/g, '-');
  const parts = safePath.split('/');
  const baseDir = path.resolve('src/lib/notes');

  // Separar carpeta y archivo
  const fileName = parts.pop(); // último elemento
  const folderPath = path.join(baseDir, ...parts);
  const filePath = path.join(folderPath, `${fileName}.md`);

  // Crear carpetas si es necesario
  fs.mkdirSync(folderPath, { recursive: true });

  // Verificar si ya existe
  if (fs.existsSync(filePath)) {
    return new Response('Ya existe una nota con ese nombre', { status: 400 });
  }

  fs.writeFileSync(filePath, `# ${fileName}\n\nTu contenido aquí...`);

  // Redirigir al nuevo archivo (ruta relativa)
  const redirectPath = `/` + [...parts, fileName].join('/');
  throw redirect(303, redirectPath);
}
