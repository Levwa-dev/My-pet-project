export default class MockLocalStorage {
    constructor(){
        this.store = {}
    }
    setItem (key, value) {
        this.store[key] = value.toString()
    }
    getItem (key) {
        return this.store[key] || null
    }
    removeItem (key) {
        delete this.store[key]
    }
    clear () {
        this.store = {}
    }
}