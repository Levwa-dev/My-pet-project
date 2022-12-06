export const validatorService = {
    validateEmail (email) {
        const regex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
        return regex.test(email)
    },
    validatePassword (password) {
        const regex = /[0-9a-zA-Z]{6,}/
        return  regex.test(password)
    }
}