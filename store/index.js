// stores/index.js
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

export const useLanguageStore = defineStore('language', {
    state: () => ({
        userLanguage: 'es',
    }),
    actions: {
        setLanguage(lang) {
            this.userLanguage = lang
            const { locale } = useI18n()
            locale.value = lang
        }
    },
    persist: true
})
