<script>
    export let notes;
    export let parentPath = '';
    export let openFolders;
    export let toggleFolder;
  
    const isFolder = (val) => typeof val === 'object';
  </script>
  
  <ul class="space-y-2 ml-2">
    {#each Object.entries(notes) as [name, value]}
      {#if isFolder(value)}
        <li>
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            class="flex justify-between items-center cursor-pointer text-white hover:text-blue-300"
            on:click={() => toggleFolder(`${parentPath}/${name}`)}
          >
            <span>
              {openFolders.has(`${parentPath}/${name}`) ? '▾' : '▸'} {name}
            </span>
          </div>
          {#if openFolders.has(`${parentPath}/${name}`)}
            <SidebarNotes
              {notes}
              parentPath={`${parentPath}/${name}`}
              openFolders={openFolders}
              {toggleFolder}
            />
          {/if}
        </li>
      {:else}
        <li>
          <a
            href="/{value}"
            class="text-sm text-white hover:underline ml-4"
          >
            {name}
          </a>
        </li>
      {/if}
    {/each}
  </ul>
  