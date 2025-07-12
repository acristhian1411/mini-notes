<script>
    import { onMount } from "svelte";
    export let files;
    let selectedFile = '';
    let targetFolder = '';
    
    async function mover() {
      if (!selectedFile || !targetFolder) return alert('Faltan datos');
  
      const res = await fetch('/mover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: selectedFile, targetFolder })
      });
  
      if (res.ok) {
        alert('Archivo movido con éxito');
        selectedFile = '';
        targetFolder = '';
      } else {
        alert('Error al mover el archivo');
      }
    }

    onMount(async () => {
        console.log(files,'files')
    });
  </script>
  
  <div class="bg-gray-800 p-4 rounded text-white">
    <h2 class="text-lg font-bold mb-2">Mover archivo a carpeta</h2>
    <div class="space-y-2">
      <select bind:value={selectedFile} class="w-full text-black p-1 rounded">
        <option value="" disabled selected>Selecciona archivo</option>
        {#each files as file}
          <option value={file}>{file}</option>
        {/each}
      </select>
  
      <input
        type="text"
        bind:value={targetFolder}
        class="w-full p-1 text-black rounded"
        placeholder="Nombre de carpeta (nueva o existente)"
      />
  
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
        onclick={mover}
      >
        Mover
      </button>
    </div>
  </div>
  