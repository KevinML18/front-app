// stores/index.js
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

const useLanguageStore = defineStore('language', {
    state: () => ({
        userLanguage: 'es',
    }),
    actions: {
        setLanguage(lang) {
            this.userLanguage = lang
        }
    },
    persist: true
})

export default useLanguageStore