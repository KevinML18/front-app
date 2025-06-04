export const getCloudinaryName = () => {
  const config = useRuntimeConfig()
  return config.public.cloudName
}