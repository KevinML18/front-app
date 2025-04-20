<template>
    <div
        class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-slate/30 z-50"
        @click.self="$emit('show-auth-form', 'close')"
    >
        <div class="bg-slate-900 flex flex-col p-10 rounded-xl gap-3 w-full max-w-sm">
            <label>{{ $t('username') }}</label>
            <input
                type="email"
                v-model="username"
                class="bg-slate-800 rounded-md p-1"
            >

            <label>{{ $t('email') }}</label>
            <input
                type="email"
                v-model="email"
                class="bg-slate-800 rounded-md p-1"
            >
            
            <label>{{ $t('password') }}</label>
            <input
                type="password"
                v-model="password"
                class="bg-slate-800 rounded-md p-1"
            >
            <button class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 p-1 rounded-xl cursor-pointer">
                {{ $t('register') }}
            </button>
            <button @click="$emit('show-auth-form', 'login')" class="cursor-pointer color-slate-400 hover:text-slate-300 active:text-slate-400">
                {{ $t('login_redirect') }}
            </button>
        </div>
    </div>
</template>

<script setup>
const username = ref('')
const email = ref('')
const password = ref('')
</script>