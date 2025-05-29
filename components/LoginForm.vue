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
      <ElInput v-model="form.password" class="input-custom" />
    </ElFormItem>
    <ElFormItem>
      <span @click="$emit('show-auth-form', 'register')">
        {{ $t('register_redirect') }}
      </span>
      <ElButton @click.prevent="submit(ruleFormRef)" class="btn-custom w-full" type="primary">
        {{ $t('login') }}
      </ElButton>
    </ElFormItem>
  </ElForm>
</template>


<script setup>
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { useVuelidate } from '@vuelidate/core'
import { required, email, } from '@vuelidate/validators'
import { $showError } from '@/utils/notifications'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/auth/useAuth'


const { login } = useAuth()
const { t } = useI18n()
const router = useRouter()
const invalidEmail = ref(false)
const emit = defineEmits(['show-auth-form'])

// Datos form
const form = reactive({
  userEmail: '',
  password: ''
})

// Validadores
const rules = reactive({
  userEmail: { required, email },
  password: { required },
})

const ruleFormRef = ref()
const inputRules = reactive({
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
    loginUser()
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

const loginUser = async () => {
  const url = `${getApiUrl()}/loguear_ususario/?email=${encodeURIComponent(form.userEmail)}&password=${encodeURIComponent(form.password)}`

  const response = await fetch(url, { method: 'GET' })
  const data = await response.json()

  if ("error" in data) {
    $showError(data.msg)
  } else {
    login(data.data)
    $showSuccess(`${t('welcome')} ${data.data.nombre_usuario}`)
    emit('show-auth-form', 'close')
    await router.push('/')
  }
}

</script>