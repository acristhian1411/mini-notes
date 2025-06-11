<script lang="ts">
    import { onMount } from 'svelte';
    import SimpleMDE from 'simplemde';
    // import 'simplemde/dist/simplemde.min.css';
  
    export let value = '';
    export let onChange: (val: string) => void;
  
    let textarea: HTMLTextAreaElement;
  
    let editor: SimpleMDE;
  
    onMount(() => {
      editor = new SimpleMDE({
        element: textarea,
        initialValue: value,
        spellChecker: false,
        autosave: {
          enabled: false
        }
      });
  
      editor.codemirror.on('change', () => {
        onChange?.(editor.value());
      });
    });
  </script>
  
  <textarea bind:this={textarea}></textarea>
  