export const getCloudinaryPreset = () => {
  const config = useRuntimeConfig()
  return config.public.uploadPreset
}