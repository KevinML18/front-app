<template>
  <div>
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
        type="email"
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
      <button @click.prevent="submit(ruleFormRef)" class="btn-custom w-full" type="primary">
        <DotLottieVue
          v-if="loading"
          src="animations/loading2.lottie"
          autoplay
          loop
          class="w-27 h-6"
        />
        <span v-else>{{ $t('login') }}</span>
      </button>
    </ElForm>
    <span
      class="text-white flex justify-center mt-4 cursor-pointer hover:text-slate-200 active:text-slate-300"
      @click="$emit('show-auth-form', 'register')"
    >
      {{ $t('register_redirect') }}
    </span>
  </div>
</template>

<script setup>
import { ElForm, ElFormItem, ElInput } from 'element-plus'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { $showError } from '@/utils/notifications'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/auth/useAuth'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'


const { login } = useAuth()
const { t } = useI18n()
const router = useRouter()
const emit = defineEmits(['show-auth-form'])

const loading = ref(false)

// Datos form
const form = reactive({
  userEmail: '',
  password: ''
})

// Validadores
const rules = reactive({
  userEmail: { required },
  password: { required },
})

const ruleFormRef = ref()
const inputRules = reactive({
  userEmail: [
    {
      required: true,
      message: t('email_is_required'),
      trigger: ['blur', 'change']
    },
    {
      type: 'email',
      message: t('invalid_email'),
      trigger: ['blur', 'change'],
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

const submit = async (formEl) => {
  loading.value = true
  await formEl.validate((valid, fields) => {
    if (!valid) {
      const firstErrorField = Object.values(fields)?.find(field => field[0]?.message)
      if (firstErrorField) {
        $showError(firstErrorField[0].message)
      }
      loading.value = false
      return
    }

    loginUser()
  })
}

const loginUser = async () => {
  const url = `${getApiUrl()}/api/v1/auth/login?email=${encodeURIComponent(form.userEmail)}&password=${encodeURIComponent(form.password)}`

  try {
    const response = await fetch(url, { method: 'POST' })
    const data = await response.json()

    if ("error" in data) {
      data.msg === "Error al conectarse a la base de datos: 2003 (HY000): Can't connect to MySQL server on '52.1.39.126:3307' (10060)"
        ? $showError(t('database_error'))
        : $showError(data.msg)
    } else {
      login(data.data)
      $showSuccess(`${t('welcome')} ${data.data.nombre_usuario}`)
      emit('show-auth-form', 'close')
      await router.push('/')
    }
  } catch (err) {
    $showError(t('database_error'))
  } finally {
    loading.value = false
  }
}

</script>