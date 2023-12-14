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

const getTransactions = async (request, response, next) => {
    try {
        const transactions = await transactionService.getTransactions(request)
        response.status(200).json({
            data: transactions
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getShifts,
    getTransactions
}