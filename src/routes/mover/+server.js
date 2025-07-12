import fs from 'fs';
import path from 'path';
import { json, error } from '@sveltejs/kit';

export async function POST({ request }) {
//   const { filename, targetFolder } = await request.json();

//   if (!filename || !targetFolder) {
//     throw error(400, 'Datos incompletos');
//   }

//   const basePath = path.resolve('src/lib/notes');
//   const oldPath = path.join(basePath, `${filename}.md`);
//   const newDir = path.join(basePath, targetFolder);
//   const newPath = path.join(newDir, `${filename}.md`);

//   // Verificaciones
//   if (!fs.existsSync(oldPath)) throw error(404, 'Archivo no encontrado');
//   if (!fs.existsSync(newDir)) fs.mkdirSync(newDir, { recursive: true });

//   // Mover archivo
//   fs.renameSync(oldPath, newPath);

//   return json({ success: true, oldPath, newPath });

const { filename, newPath } = await request.json();

  if (!filename || !newPath) {
    throw error(400, 'Faltan datos');
  }

  const baseDir = path.resolve('src/lib/notes');

  const oldFile = path.resolve(baseDir, `${filename}.md`);
  const parts = newPath.split('/');
  const newFileName = parts.pop();
  const newDir = path.join(baseDir, ...parts);
  const newFile = path.join(newDir, `${newFileName}.md`);

  if (!fs.existsSync(oldFile)) throw error(404, 'Archivo no existe');
  if (!fs.existsSync(newDir)) fs.mkdirSync(newDir, { recursive: true });

  fs.renameSync(oldFile, newFile);

  return json({ success: true });
}
