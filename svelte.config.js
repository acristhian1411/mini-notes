// import adapter from '@sveltejs/adapter-auto';
import {mdsvex} from 'mdsvex';
// import adapter from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-vercel';
import path from 'path';
import { preprocess } from 'svelte/compiler';

const config = { 
    extensions: ['.svelte', '.md','.mdx'],
    kit: { 
        adapter: adapter({
            runtime: 'nodejs20.x',
        }),
        alias: {
            $notes: path.resolve('./src/lib/notes')
        }
    },
    preprocess:[
        mdsvex({
          extensions: ['.md','.mdx'],  
        })
    ]
 };

export default config;
