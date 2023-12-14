const db = require("../application/database");
const TransactionHelper = require("../helper/transaction-helper");

const getShifts = async () => {
  const shifts = await db("ms_shift").select(
    "shift_start_time",
    "shift_end_time"
  );

  return shifts.map((shift) => {
    return (
      shift.shift_start_time.substring(0, 5) +
      " - " +
      shift.shift_end_time.substring(0, 5)
    );
  });
};

const getTransactions = async (request) => {
  const { start_date, end_date } = request.body;
  const getDayCount = TransactionHelper.getDayCount(start_date, end_date);
  let listOfTransactions = [];

  /* check database for this range days */
  for (let x = 0; x <= getDayCount; x++) {
    const date = new Date(start_date);
    date.setDate(date.getDate() + x);
    
    let transactions = await db("tr_transaction").whereRaw(
      "TO_CHAR(transaction_date, 'YYYY-MM-DD') = ?",
      TransactionHelper.formatDate(date)
    );
    
    /* if no data, generate dummy data */
    if (transactions.length === 0) {
      /* 1. generate dummy data */
      const transaction = TransactionHelper.generateTransactions()
      
      /* 2. insert lecturer data to db */
      for(let x=0; x<transaction.length; x++) {
        await insertLecturerData(transaction[x].lecturerID, transaction[x].lecturerName)
        await insertCourseData(transaction[x].courseID, transaction[x].courseDescription)
        await insertTransactionData(transaction[x], date)
      }

      /* 3. fetch inserted data */
      transactions = await db("tr_transaction").whereRaw(
        "TO_CHAR(transaction_date, 'YYYY-MM-DD') = ?",
        TransactionHelper.formatDate(date)
      );
    }

    listOfTransactions = [...listOfTransactions, ...transactions];
  }

  /* return list of transactions */
  return listOfTransactions;
};


async function insertLecturerData(lecturerID, lecturerName) {
  await db("ms_lecturer")
    .insert({
      lecturer_id: lecturerID,
      lecturer_name: lecturerName,
      input_user: "SYSTEM",
      input_date: new Date(),
    })
    .onConflict("lecturer_id")
    .ignore();
};

async function insertCourseData (courseID, courseDescription) {
  await db("ms_course")
    .insert({
      course_id: courseID,
      course_description: courseDescription,
      input_user: "SYSTEM",
      input_date: new Date(),
    })
    .onConflict("course_id")
    .ignore();
};

async function insertTransactionData(transaction, date) {
  await db("tr_transaction")
    .insert({
      lecturer_id: transaction.lecturerID,
      shift_id: transaction.shiftID,
      status_id: 1 /* none */,
      course_id: transaction.courseID,
      class_id: transaction.classID,
      transaction_date: date,
      transaction_link: transaction.linkZoom,
      input_user: "SYSTEM",
      input_date: date,
    })
    .onConflict("transaction_id")
    .ignore();
}



module.exports = {
  getShifts,
  getTransactions,
};
