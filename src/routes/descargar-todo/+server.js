import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

export async function GET() {
  const notesDir = path.resolve('src/lib/notes');
  const files = fs.readdirSync(notesDir).filter(f => f.endsWith('.md'));

  const zip = new JSZip();

  for (const file of files) {
    const content = fs.readFileSync(path.join(notesDir, file), 'utf-8');
    zip.file(file, content);
  }

  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

  return new Response(zipBuffer, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="notas.zip"'
    }
  });
}
