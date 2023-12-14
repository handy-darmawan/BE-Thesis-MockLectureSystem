const excelJS = require('exceljs');

class ExportHelper {
    static shared = new ExportHelper();

    generateSheet() {
        const workbook = new excelJS.Workbook();
        const sheet = workbook.addWorksheet("sheet1");
      
        sheet.columns = [
          { header: "Transaction ID", key: "transaction_id", width: 10 },
          { header: "Lecturer Code", key: "lecturer_id", width: 10 },
          { header: "Lecturer Name", key: "lecturer_name", width: 40 },
          { header: "Course Code", key: "course_id", width: 10 },
          { header: "Course Description", key: "course_description", width: 40 },
          { header: "Class Code", key: "class_id", width: 10 },
          { header: "Meeting Time Start", key: "shift_start_time", width: 10 },
          { header: "Meeting Time End", key: "shift_end_time", width: 10 },
          { header: "Transaction Date", key: "transaction_date", width: 10 },
          { header: "Status Description", key: "status_description", width: 10 },
        ];
      
        return [workbook, sheet];
    }
    

}

module.exports = ExportHelper.shared