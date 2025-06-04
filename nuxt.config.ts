// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: [
        '@nuxt/fonts',
        '@nuxt/image',
        '@nuxt/ui',
        '@nuxtjs/i18n',
        '@nuxtjs/cloudinary'
    ],
    css: [
        '~/assets/css/main.css',
        'element-plus/dist/index.css'
    ],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    i18n: {
        defaultLocale: 'es',
        strategy: 'no_prefix',
        locales: [
            { code: 'es', name: 'Español', file: 'es.json' },
            { code: 'en', name: 'English', file: 'en.json' }
        ]
    },
    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL,
            cloudName: process.env.CLOUDINARY_NAME,
            uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET
        }
    }
})