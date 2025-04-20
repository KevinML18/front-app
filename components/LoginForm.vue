<template>
    <div
        class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-slate/30 z-50"
        @click.self="$emit('show-auth-form', 'close')"
    >
        <div class="bg-slate-900 flex flex-col p-10 rounded-xl gap-3 w-full max-w-sm">
            <label>{{ $t('email') }}</label>
            <input type="email" v-model="email" class="bg-slate-800 rounded-md p-1">
            <label>{{ $t('password') }}</label>
            <input type="password" v-model="password" class="bg-slate-800 rounded-md p-1">
            <label>
                <input type="checkbox" v-model="remember"> {{ $t('remember_me') }}
            </label>
            <button class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 p-1 rounded-xl cursor-pointer">
                {{ $t('login') }}
            </button>
            <button @click="$emit('show-auth-form', 'register')" class="cursor-pointer hover:text-slate-300 active:text-slate-400">
                {{ $t('register_redirect') }}
            </button>
        </div>
    </div>
</template>

<script setup>
const email = ref('')
const password = ref('')
const remember = ref(false)
</script>