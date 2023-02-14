import { commonAxios } from "../../utils/axios"

export const cartService = {

    async makeOrder (order) {
        const response = await commonAxios.post('/order/make-order', order)
        return response
    },
    getTotalPrice (array) {
        let totalPrice = 0
        for(let item of array) {
            totalPrice += item.price * item.quantity
        }
        return totalPrice.toFixed(2)
    },
    getCurrentProductInBox (array, product) {
        const productCount = array.filter(item=>item.productId === product.id).length
        if(product.quantity === productCount) {
            return false
        }
        return true
    },
    getDateForInput () { // Повертаємо дату в форматі інпуту
        const newDate = new Date ()
        const year = newDate.getFullYear()
        const month = newDate.getMonth()+1 < 10 ? '0'+ (newDate.getMonth()+1) : newDate.getMonth()+1
        const date = newDate.getDate() < 10 ? '0'+ newDate.getDate() : newDate.getDate()
        return `${year}-${month}-${date}`
    }
}