export const getApiUrl = () => {
  const config = useRuntimeConfig()
  return config.public.apiUrl
}