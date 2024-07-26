import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    "50": "#f8fafc",
                    "100": "#f1f5f9",
                    "200": "#e2e8f0",
                    "300": "#cbd5e1",
                    "400": "#94a3b8",
                    "500": "#64748b",
                    "600": "#475569",
                    "700": "#334155",
                    "800": "#1e293b",
                    "900": "#0f172a",
                    "950": "#020617"
                }
            },
            fontFamily: {
                body: [
                    'Inter',
                    'ui-sans-serif',
                    'system-ui',
                    '-apple-system',
                    'system-ui',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica Neue',
                    'Arial',
                    'Noto Sans',
                    'sans-serif',
                    'Apple Color Emoji',
                    'Segoe UI Emoji',
                    'Segoe UI Symbol',
                    'Noto Color Emoji'
                ],
                sans: [
                    'Inter',
                    'ui-sans-serif',
                    'system-ui',
                    '-apple-system',
                    'system-ui',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica Neue',
                    'Arial',
                    'Noto Sans',
                    'sans-serif',
                    'Apple Color Emoji',
                    'Segoe UI Emoji',
                    'Segoe UI Symbol',
                    'Noto Color Emoji'
                ]
            }
        }
    },
    plugins: [forms, require('flowbite/plugin'), require('daisyui')],
    daisyui: {
        themes: ['light', 'dark'],
    },
    flowbite: {
        themes: ['light', 'dark'],
    },
};