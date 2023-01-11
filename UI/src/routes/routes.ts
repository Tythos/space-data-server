import Home from '@/UI/src/pages/Home/Home.svelte';
import About from '@/UI/src/pages/About/About.svelte';
import SwaggerDoc from '@/UI/src/pages/SwaggerDoc/SwaggerDoc.svelte';
import { wrap } from 'svelte-spa-router/wrap'

export const routes = {
    '/': {
        name: "Home",
        ...wrap({
            component: Home
        })
    },
    '/api': {
        name: "API",
        ...wrap({
            component: SwaggerDoc
        })
    },
    '/about': {
        name: "About",
        ...wrap({
            component: About
        })
    }
};