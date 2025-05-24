<template>
  <ElForm class="custom-form">
    <ElFormItem :label="$t('email')" label-position="top">
      <ElInput v-model="email" class="input-custom" />
    </ElFormItem>
    <ElFormItem :label="$t('password')" label-position="top">
      <ElInput v-model="password" class="input-custom" />
    </ElFormItem>
    <ElFormItem>
      <span @click="$emit('show-auth-form', 'login')" class="text:cyan-50 cursor-pointer hover:text-slate-300 active:text-slate-400">
        {{ $t('register_redirect') }}
      </span>
      <ElButton @click="registerUser" class="btn-custom w-full" type="primary">
        {{ $t('register') }}
      </ElButton>
    </ElFormItem>
  </ElForm>
</template>


<script setup>
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'

const name = ref('')
const lastname = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
</script>