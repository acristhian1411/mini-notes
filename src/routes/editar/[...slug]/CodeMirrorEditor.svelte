<script >
    import { onMount } from 'svelte';
    import { EditorView, basicSetup } from 'codemirror';
    import { EditorState } from '@codemirror/state';
    import { markdown } from '@codemirror/lang-markdown';
  
    let {value, onChange} = $props();
  
    let editorDiv = $state(null);
    let view = EditorView;
  
    onMount(() => {
        console.log(value,'value')
      view = new EditorView({
        state: EditorState.create({
          doc: value,
          extensions: [
            basicSetup,
            markdown(),
            EditorView.updateListener.of((update) => {
              if (update.docChanged) {
                const newContent = update.state.doc.toString();
                onChange(newContent);
              }
            })
          ]
        }),
        parent: editorDiv
      });
    });
  </script>
  
  <div bind:this={editorDiv} class="border border-gray-300 rounded shadow min-h-[400px]" ></div>
    
  