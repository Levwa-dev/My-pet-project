export const validatorService = {
    validateEmail (email) {
        const regex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
        return regex.test(email)
    },

    validatePassword (password) {
        const regex = /[а-яА-Я]/g
        if(!regex.test(password) && password.length >= 6){
            return true
        }
        return false
    },

    setLocaleTime (time) {
        const date = new Date(Date.parse(time))
        return date.toLocaleString('uk-uk')
    },

    checkFullfield (template, inputData) { // Якщо якісь дані були не заповненні, повернути помилку
        for(let key in template){
            if(!inputData.hasOwnProperty(key)){
                return false 
            }
        }
        return true
    },

    checkIfDataChanged (template, data) { // Якщо дані при редагуванні не змінились повертаємо помилку
        let copyTemplate = JSON.stringify(template)
        let copyData = JSON.stringify(data)
        if(copyTemplate === copyData){
            return false
        }
        let objectWithDifferentValues = {}
        for(let key in data) { // Шукаємо не співпадаючі значення, та додаємо їх до об'єкту
            if(JSON.stringify(template[key]) !== JSON.stringify(data[key])){
                objectWithDifferentValues[key] = data[key]
            }
        }
        return objectWithDifferentValues
    },

    validateDeliveringForm(formName) { // Валідація форми доставки 
        const inputs = document.forms[formName].getElementsByTagName("input")
        let valid = true
        for(let input of inputs){
            if(input.value === ''){
                input.setCustomValidity("Обов'язкове поле")
                input.reportValidity()
                valid = false
            }
            if(input.type === 'time'){
                if(input.validity.rangeUnderflow){
                    input.setCustomValidity("Час доставки раніше 09:00, змініть час доставки")
                    input.reportValidity()
                    valid = false
                }
                if(input.validity.rangeOverflow) {
                    input.setCustomValidity("Час доставки пізніше 19:00, змініть час доставки")
                    input.reportValidity()
                    valid = false
                }
            }
        }
        return valid
    },
    validateCallBackForm (formName) { // Валідація форми зворотнього зв'язку
        const inputs = document.forms[formName].getElementsByTagName("input")
        let valid = true
        for(let input of inputs) {
            if(input.value === '') {
                input.setCustomValidity("Обов'язкове поле")
                input.reportValidity()
                valid = false
            }
        }
        return valid
    }
    
}