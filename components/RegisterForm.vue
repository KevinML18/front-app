<template>
  <ElForm
    class="custom-form"
    require-asterisk-position="right"
    ref="ruleFormRef"
    :rules="inputRules"
    :model="form"
    label-position="top"
  >
    <ElFormItem
      :label="$t('name')"
      prop="name"
      @keydown.enter.prevent="submit(ruleFormRef)"
    >
      <ElInput v-model="form.name" class="input-custom" />
    </ElFormItem>
    <ElFormItem
      :label="$t('last_name')"
      prop="lastname"
      @keydown.enter.prevent="submit(ruleFormRef)"
    >
      <ElInput v-model="form.lastname" class="input-custom" />
    </ElFormItem>
    <ElFormItem
      :label="$t('username')"
      prop="username"
      @keydown.enter.prevent="submit(ruleFormRef)"
    >
      <ElInput v-model="form.username" class="input-custom" />
    </ElFormItem>
    <ElFormItem
      :label="$t('email')"
      prop="userEmail"
      :error="invalidEmail ? t('invalid_email') : ''"
      :validate-status="v$.userEmail.$error ? 'error' : ''"
      @keydown.enter.prevent="submit(ruleFormRef)"
    >
      <ElInput v-model="form.userEmail" class="input-custom" />
    </ElFormItem>
    <ElFormItem
      :label="$t('password')"
      prop="password"
      @keydown.enter.prevent="submit(ruleFormRef)"
    >
      <ElInput v-model="form.password" type="password" show-password class="input-custom" />
    </ElFormItem>
    <ElButton @click.prevent="submit(ruleFormRef)" class="btn-custom w-full" type="primary">
      {{ $t('register') }}
    </ElButton>
    <span
      class="text-white flex justify-center mt-4 cursor-pointer hover:text-slate-200 active:text-slate-300"
      @click="$emit('show-auth-form', 'login')"
    >
      {{ $t('login_redirect') }}
    </span>
  </ElForm>
</template>


<script setup>
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { useVuelidate } from '@vuelidate/core'
import { required, email, } from '@vuelidate/validators'
import { $showError } from '@/utils/notifications'

const { t } = useI18n()
const invalidEmail = ref(false)
const emit = defineEmits(['show-auth-form'])

// Datos form
const form = reactive({
  name: '',
  lastname: '',
  username: '',
  userEmail: '',
  password: ''
})

// Validadores
const rules = reactive({
  name: { required },
  lastname: { required },
  username: { required },
  userEmail: { required, email },
  password: { required },
})

const ruleFormRef = ref()
const inputRules = reactive({
  name: [
    {
      required: true,
      message: t('name_is_required'),
      trigger: ['blur', 'change']
    }
  ],
  lastname: [
    {
      required: true,
      message: t('lastname_is_required'),
      trigger: ['blur', 'change']
    }
  ],
  username: [
    {
      required: true,
      message: t('username_is_required'),
      trigger: ['blur', 'change']
    }
  ],
  userEmail: [
    {
      required: true,
      message: t('email_is_required'),
      trigger: ['blur', 'change']
    }
  ],
  password: [
    {
      required: true,
      message: t('password_is_required'),
      trigger: ['blur', 'change']
    }
  ],
})

const v$ = useVuelidate(rules, form)

const submit = async (formEl) => {
  if(invalidEmail.value) {
    invalidEmail.value = false
  }
  v$.value.$touch()
  await formEl.validate((valid, fields) => {
    if (fields && Object.values(fields)?.length) {
      for (const field of Object.values(fields)) {
        if (field[0]?.message) {
          $showError(field[0].message)
          return false
        }
      }
    }
  })
  if (!v$.value.$invalid) {
    register()
  } else {
    for (const key in v$.value) {
      if (v$.value[key]?.$invalid) {
        const errors = v$.value[key].$errors
        if (errors.length) {
          invalidEmail.value = true
          $showError(t('invalid_email'))
          break
        }
      }
    }
  }
}



const register = async () => {
  const url = `${getApiUrl()}/crear_usuario/?nombre_usuario=${encodeURIComponent(form.username)}&nombre=${encodeURIComponent(form.name)}&apellidos=${encodeURIComponent(form.lastname)}&email=${encodeURIComponent(form.userEmail)}&password=${encodeURIComponent(form.password)}&foto=null`

  const response = await fetch(url, {
    method: 'POST'
  })

  const data = await response.json()

  if ("error" in data) {
    $showError(data.msg)
  } else {
    emit('show-auth-form', 'login')
  }
}

</script>