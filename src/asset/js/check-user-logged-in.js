export async function checkUserLoggedIn() {
    try {
        const response = await fetch('/server/auth_verification.php')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const userData = await response.json()
        return userData
    } catch (error) {
        console.error('Error checking user login:', error)
        return false
    }
}
