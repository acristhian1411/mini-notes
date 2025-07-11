import fs from 'fs';
import path from 'path';
import { error } from '@sveltejs/kit';
import matter from 'gray-matter';
import {marked} from 'marked';

export async function load({ params }) {
  // const filePath = path.resolve('src/lib/notes', `${params.slug}.md`);
  // if (!fs.existsSync(filePath)) throw error(404, 'Nota no encontrada');

  // const raw = fs.readFileSync(filePath, 'utf-8');
  // const { content, data } = matter(raw);
  const slugPath = params.slug;
  const filePath = path.resolve('src/lib/notes', `${slugPath}.md`);

  if (!fs.existsSync(filePath)) throw error(404, 'Nota no encontrada');

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(raw);
  const html = marked(content);

  return {
    content: marked(content),
    metadata: data,
    slug: params.slug
  };
}
