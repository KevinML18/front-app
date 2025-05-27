export default async function getAutUser() {
    const baseUrl = 'http://127.0.0.1/'
    localStorage.getItem('id_user')
    const response = await fetch(baseUrl, { method: 'POST' })
    if ("error" in response) {
        $showError(t('unknown_user'))
        return
    } else {
        return response
    }
}