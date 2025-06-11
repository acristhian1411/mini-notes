<script>
	import '../app.css';
	// let data = $props();

	let { children, data } = $props();

    let showForm = $state(false);
</script>

<div class="flex h-screen">
	<!-- Sidebar -->
	<aside class="w-64 bg-gray-800 text-white p-4">
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-xl font-bold">Notas</h2>
			<button
			  onclick={() => showForm = !showForm}
			  class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
			>
			  + Nueva
			</button>
		  </div>
		  	  <ul class="space-y-2">
		{#each data.notes as note}
		  <li>
			<a href="/{note}" class="block p-2 rounded hover:bg-gray-700">{note}</a>
		  </li>
		{/each}
	  </ul>
	</aside>
	{#if showForm}
  <form method="POST" action="/crear-nota" class="mt-4">
    <input
      name="filename"
      placeholder="nombre-de-la-nota"
      class="w-full p-2 rounded bg-gray-700 text-white mb-2"
      required
    />
    <button
      type="submit"
      class="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
    >
      Crear
    </button>
  </form>
{/if}
  
	<main class="flex-1 p-6 overflow-auto">
{@render children()}
</main>
</div>


