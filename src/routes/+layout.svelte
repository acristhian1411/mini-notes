<script>
	import '../app.css';
	// let data = $props();
	import MoveToFolder from '$lib/utils/MoveToFolder.svelte';
	let { children, data } = $props();
	let openFolders = $state([]); // para manejar el despliegue
	const toggleFolder = (folder) => {
		if (openFolders.includes(folder)) {
		openFolders.splice(openFolders.indexOf(folder), 1);
		} else {
		openFolders.push(folder);
		console.log('openFolders.has(folder)',openFolders.includes(folder))
		}
	};
	const isFolder = (val) => typeof val === 'object';
    let showForm = $state(false);
	
	let editing = $state([]);
	let newPath = $state(null);

	function startEdit(name, path) {
		console.log('name',name,'path',path)
		editing = [name];
		newPath = path;
	}

	async function saveEdit(){
		newPath = newPath.trim();

		if (!newPath || newPath === editing[0]) return;

		const res = await fetch('/mover', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ filename: editing[0], newPath })
		});

		if (res.ok) {
			editing = [];
			location.reload();
		} else {
			alert('Error al mover o renombrar');
		}
	}

</script>

<div class="flex h-screen">
	<!-- Sidebar -->
	<aside class="w-64 bg-gray-800 text-black p-4 transition-transform -translate-x-full sm:translate-x-0">
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-xl font-bold">Notas</h2>
			<a href="/descargar-todo" class="text-sm bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded text-white ml-2" title="Descargar todo">⬇</a>
			<button
			  onclick={() => showForm = !showForm}
			  class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
			>
			  + Nueva
			</button>
		  </div>
		<ul class="space-y-2">
			{#each Object.entries(data.notes) as [key, val]}
				{#if isFolder(val)}
				<li>
					<button type="button" class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" onclick={() => toggleFolder(key)} aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
						  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{key}</span>
						  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
							 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
						  </svg>
					</button>
					{#if openFolders.includes(key)}
					<ul id="dropdown-example" class={openFolders.includes(key) ? 'block' : 'hidden'}>
						{#each Object.entries(val) as [fileName, filePath]}
						<li class="flex items-center justify-between w-full p-2 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700">
							{#if editing.includes(filePath)}
								<div class="mt-2 flex gap-2">
									<input
									bind:value={newPath}
									class="p-1 rounded text-black w-full"
									placeholder="Ej: nuevaCarpeta/nuevoNombre"
									/>
									<button onclick={() => saveEdit()} class="bg-green-600 text-white px-2 rounded">✅</button>
									<button onclick={() => editing = []} class="bg-red-500 text-white px-2 rounded">❌</button>
								</div>
							{:else}	
								<a href="/{filePath}" class="flex items-center w-full p-2 text-gray-900 transition hover:underline duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">{fileName}</a>
								<a href="/descargar/{filePath}" class="text-sm bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded text-white ml-2">
									⬇
								</a>
							{/if}
						<button
							class="text-sm bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded text-white"
							title="Renombrar / Mover"
							onclick={() => startEdit(filePath, filePath)}
						>
							✏️
						</button>
					</li>
					{/each}
				</ul>
				{/if}
			</li>
			{:else}
			<li>
				{#if editing.includes(val)}
					<div class="mt-2 flex gap-2">
						<input
						bind:value={newPath}
						class="p-1 rounded text-black w-full"
						placeholder="Ej: nuevaCarpeta/nuevoNombre"
						/>
						<button onclick={() => saveEdit()} class="bg-green-600 text-white px-2 rounded">✅</button>
						<button onclick={() => editing = []} class="bg-red-500 text-white px-2 rounded">❌</button>
					</div>
				{:else}	
					<a href="/{val}" class="text-white hover:underline">{val}</a>
					<a href={`/descargar/${val}`} class="text-sm bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded text-white ml-2" title="Descargar">
						⬇
					</a>
				{/if}
				<button
					class="text-sm bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded text-white"
					title="Renombrar / Mover"
					onclick={() => startEdit(val, val)}
				>
					✏️
				</button>
			</li>
			{/if}
			{/each}
			<!-- <MoveToFolder files={data.looseFiles}/> -->
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


