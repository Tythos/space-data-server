import Home from '@/UI/src/pages/Home/Home.svelte';
import About from '@/UI/src/pages/About/About.svelte';
import SwaggerDoc from '@/UI/src/pages/SwaggerDoc/SwaggerDoc.svelte';
import User from '@/UI/src/pages/User/User.svelte';
import Admin from '@/UI/src/pages/Admin/Admin.svelte';

import { wrap } from 'svelte-spa-router/wrap'

export const routes = {
    '/': {
        name: "Home",
        navBar: true,
        ...wrap({
            component: Home
        })
    },
    '/api': {
        name: "API",
        navBar: true,
        ...wrap({
            component: SwaggerDoc
        })
    },
    '/about': {
        name: "About",
        navBar: true,
        ...wrap({
            component: About
        })
    },
    '/user': {
        name: "User",
        navBar: false,
        ...wrap({
            component: User
        })
    },
    '/admin': {
        name: "Admin",
        navBar: true,
        ...wrap({
            component: Admin
        })
    }
};