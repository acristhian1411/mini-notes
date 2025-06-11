//ts-ignore
import { buscarNotas } from '$lib/utils/buscar';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
  const { query, caseSensitive } = await request.json();
  const resultados = buscarNotas(query, { caseSensitive });
  return json(resultados);
};