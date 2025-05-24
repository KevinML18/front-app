<template>
  <ElForm class="custom-form">
    <ElFormItem :label="$t('name')" label-position="top">
      <ElInput v-model="name" class="input-custom" />
    </ElFormItem>
    <ElFormItem :label="$t('last_name')" label-position="top">
      <ElInput v-model="lastname" class="input-custom" />
    </ElFormItem>
    <ElFormItem :label="$t('last_name')" label-position="top">
      <ElInput v-model="username" class="input-custom" />
    </ElFormItem>
    <ElFormItem :label="$t('email')" label-position="top">
      <ElInput v-model="email" class="input-custom" />
    </ElFormItem>
    <ElFormItem :label="$t('password')" label-position="top">
      <ElInput v-model="password" class="input-custom" />
    </ElFormItem>
    <ElFormItem>
      <span @click="$emit('show-auth-form', 'register')">
        {{ $t('login_redirect') }}
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