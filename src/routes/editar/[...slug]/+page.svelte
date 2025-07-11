<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    // import MarkdownEditor from './MarkdownEditor.svelte';
    import CodeMirrorEditor from './CodeMirrorEditor.svelte';
  
    let content = '';
    let slug = '';
  
    onMount(async () => {
      const res = await fetch(`/api/notas/${$page.params.slug}`);
      const json = await res.json();
      content = json.content;
      slug = json.slug;
    });
  
    async function guardar() {
      await fetch(`/api/notas/${slug}`, {
        method: 'PUT',
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' }
      });
      goto(`/${slug}`);
    }
  </script>
  
  <h1>Editar: {slug}</h1>
  <textarea bind:value={content} rows="20" class="w-full"></textarea>
  <!-- <CodeMirrorEditor bind:value={content} onChange={guardar} /> -->
  <button on:click={guardar}>Guardar</button>
  