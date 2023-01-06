export const validatorService = {
    validateEmail (email) {
        const regex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
        return regex.test(email)
    },

    validatePassword (password) {
        const regex = /[0-9a-zA-Z]{6,}/
        return  regex.test(password)
    },

    setLocaleTime (time) {
        const date = new Date(Date.parse(time))
        return date.toLocaleString('uk-uk')
    },

    checkFullfield (template, inputData) {
        for(let key in template){
            if(!inputData.hasOwnProperty(key)){
                return false 
            }
        }
        return true
    },

    checkIfDataChanged (template, data) {
        let copyTemplate = JSON.stringify(template)
        let copyData = JSON.stringify(data)
        if(copyTemplate === copyData){
            return false
        }
        let objectWithDifferentValues = {}
        for(let key in data) { // Шукаємо не співпадаючі значення, та додаємо їх до об'єкту
            if(template[key] !== data[key]){
                objectWithDifferentValues[key] = data[key]
            }
        }
        return objectWithDifferentValues
    }
    
}