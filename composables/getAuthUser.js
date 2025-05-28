export default async function getAutUser() {
    const ide = localStorage.getItem('id_user')
    if (ide) {
        try {
            const response = await fetch(`${getApiUrl()}/mostrar_usuario/?id=${ide}`, {
                method: 'GET'
            })

            if (!response.ok) {
                $showError(t('unknown_user'))
                return
            }

            const user = await response.json()
            return user.data
        } catch (error) {
            $showError(t('unknown_user'))
            return
        }
    } else {
        return false
    }
}
