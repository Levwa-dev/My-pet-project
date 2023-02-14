class PaginationServie {

    getPaginatedData (categoryCount, limit, page) { // Розрахунок сторінок для пагінації даних
        const pages = Math.ceil(categoryCount.count/limit)
        const offset = limit * page - limit
        return {pages, offset, limit}
    }

}

module.exports = new PaginationServie()