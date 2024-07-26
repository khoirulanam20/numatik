import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// document.addEventListener('DOMContentLoaded', function () {
//     const themeToggleBtn = document.getElementById('theme-toggle');
//     const htmlElement = document.documentElement;

//     if (themeToggleBtn) {
//         themeToggleBtn.addEventListener('click', function () {
//             if (htmlElement.classList.contains('dark')) {
//                 htmlElement.classList.remove('dark');
//                 localStorage.setItem('theme', 'light');
//             } else {
//                 htmlElement.classList.add('dark');
//                 localStorage.setItem('theme', 'dark');
//             }
//         });

//         // Set theme on initial load
//         if (localStorage.getItem('theme') === 'dark') {
//             htmlElement.classList.add('dark');
//         }
//     }
// });