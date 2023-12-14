const transactionService = require("../service/transaction-service");
const ExportHelper = require("../helper/export-helper");

const getShifts = async (request, response, next) => {
  try {
    const shifts = await transactionService.getShifts();
    response.status(200).json({
      data: shifts,
    });
  } catch (error) {
    next(error);
  }
};

const getTransactions = async (request, response, next) => {
  try {
    const transactions = await transactionService.getTransactions(request);
    response.status(200).json({
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

const exportCSV = async (request, response, next) => {
  try {
    const [workbook, sheet] = ExportHelper.generateSheet();
    const transactions = await transactionService.getTransactions(request);

    if (transactions.length == 0) {
      response.status(204).end();
    } else {
      transactions.forEach((transaction) => {
        sheet.addRow(transaction);
      });

      response.setHeader("Content-Type", "text/csv");

      response.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "reports.csv"
      );

      await workbook.csv.write(response, {
        formatterOptions: { delimiter: ";" },
      });
    }
  } catch (error) {
    next(error);
  }
};

const exportExcel = async (request, response, next) => {
  try {
    const [workbook, sheet] = ExportHelper.generateSheet();
    const transactions = await transactionService.getTransactions(request);

    if (transactions.length == 0) {
        response.status(204).end()
      } else {
        transactions.forEach((transaction) => {
          sheet.addRow(transaction);
        });
  
        response.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
  
        response.setHeader(
          "Content-Disposition",
          "attachment; filename=" + "reports.xlsx"
        );
  
        await workbook.xlsx.write(response);
  
        response.end();
      }
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getShifts,
  getTransactions,
  exportCSV,
  exportExcel,
};
