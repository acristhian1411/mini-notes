<script lang="ts">
    export let data;
    import { goto } from '$app/navigation';

    function editar() {
        goto(`/editar/${data.slug}`);
    }

  </script>
  
  <svelte:head>
    <title>{data.metadata.title ?? data.slug}</title>
  </svelte:head>
  
<h1>
    <button on:click={editar}>Editar</button>
</h1>
  <article class="prose prose-sm md:prose lg:prose-lg">
    {@html data.content}
  </article>
  