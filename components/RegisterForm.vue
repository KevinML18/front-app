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
        type="email"
        :error="invalidEmail ? t('invalid_email') : ''"
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
        <span v-else>{{ $t('register') }}</span>
      </button>
    </ElForm>
    <span
      class="text-white flex justify-center mt-4 cursor-pointer hover:text-slate-200 active:text-slate-300"
      @click="$emit('show-auth-form', 'login')"
    >
      {{ $t('login_redirect') }}
    </span>
  </div>
</template>


<script setup>
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { useVuelidate } from '@vuelidate/core'
import { required, email, } from '@vuelidate/validators'
import { $showError } from '@/utils/notifications'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const { t } = useI18n()
const emit = defineEmits(['show-auth-form'])
const invalidEmail = ref(false)
const loading = ref(false)
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

const v$ = useVuelidate(rules, form)

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

    register()
  })
}

const register = async () => {
  const url = `${getApiUrl()}/api/v1/usuarios/crear?nombre_usuario=${encodeURIComponent(form.username)}&nombre=${encodeURIComponent(form.name)}&apellidos=${encodeURIComponent(form.lastname)}&email=${encodeURIComponent(form.userEmail)}&password=${encodeURIComponent(form.password)}&foto=null`

  try {
    const response = await fetch(url, {
      method: 'POST'
    })

    const data = await response.json()

    if ("error" in data) {
      data.msg === "Error al conectarse a la base de datos: 2003 (HY000): Can't connect to MySQL server on '52.1.39.126:3307' (10060)"
        ? $showError(t('database_error'))
        : $showError(data.msg)
    } else {
      emit('show-auth-form', 'login')
    }
  } catch(err) {
    $showError(t('database_error'))
  } finally {
    loading.value = false
  }

}

</script>