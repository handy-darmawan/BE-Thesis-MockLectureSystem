const transactionService = require('../service/transaction-service')

const getShifts = async (request, response, next) => {
    try {
        const shifts = await transactionService.getShifts()
        response.status(200).json({
            data: shifts
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getShifts,
}