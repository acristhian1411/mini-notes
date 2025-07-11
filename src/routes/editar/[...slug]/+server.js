import fs from 'fs';
import path from 'path';
import { error, json } from '@sveltejs/kit';

const base = path.resolve('src/lib/notes');

export async function GET({ params }) {
  console.log('params en editar',params)
  const file = path.join(base, `${params.slug}.md`);
  if (!fs.existsSync(file)) throw error(404, 'No existe');

  const content = fs.readFileSync(file, 'utf-8');
  return json({ slug: params.slug, content });
}

export async function PUT({ request, params }) {
  const { content } = await request.json();
  const file = path.join(base, `${params.slug}.md`);
  fs.writeFileSync(file, content, 'utf-8');
  return json({ status: 'ok' });
}
