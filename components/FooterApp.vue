<template>
  <footer class="bg-slate-900 text-white py-10 mt-10">
    <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
      <div class="space-y-2 max-w-lg">
        <h2 class="text-2xl font-bold text-emerald-400">{{ $t('footer_header') }}</h2>
        <p class="text-gray-300">
          {{ $t('footer_description') }}
        </p>
        <div class="flex justify-center md:justify-start gap-4 mt-4">
          <a href="https://instagram.com" target="_blank">
            <Instagram class="w-6.5 h-6.5 text-white hover:text-emerald-400 active:text-emerald-600"" />
          </a>
          <a href="https://facebook.com" target="_blank">
            <Facebook class="w-6.5 h-6.5 text-white hover:text-emerald-400 active:text-emerald-600"" />
          </a>
          <a href="https://twitter.com" target="_blank">
            <Twitter class="w-6.5 h-6.5 text-white hover:text-emerald-400 active:text-emerald-600" />
          </a>
        </div>
      </div>
      <div>
        <p class="text-sm text-gray-400">© 2025 {{$t('footer_rights')}}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Instagram, Facebook, Twitter } from 'lucide-vue-next'

const { t } = useI18n()
</script>
