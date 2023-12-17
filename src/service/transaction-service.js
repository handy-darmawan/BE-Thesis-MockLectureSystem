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
  const page = parseInt(request.query.page) || 1;
  const limit = parseInt(request.query.limit) || 10;
  const offset = (page - 1) * limit;
  const { start_date, end_date } = request.query;
  let [bindings, placeholders] = await getTransacHelper(start_date, end_date);

  const rowResults = await db.raw(
    TransactionHelper.rawQueryAllTransactions +
      ` where TO_CHAR(tr.transaction_date, 'YYYY-MM-DD') in (${placeholders})`,
    bindings
  );

  const totalRow = rowResults.rows.length;
  const totalPage = Math.ceil(totalRow / limit);

  /* fetch all data from db */
  bindings.push(limit, offset);
  const listsOfTransactions = await db.raw(
    TransactionHelper.rawQueryAllTransactions +
      ` where TO_CHAR(tr.transaction_date, 'YYYY-MM-DD') in (${placeholders}) order by tr.transaction_date asc limit ? offset ?`,
    bindings
  );

  /* return list of transactions */
  return { listsOfTransactions, page, limit, totalPage, totalRow };
};

const searchTransaction = async (request) => {
  const date = request.date;
  const shiftID = await getShiftID(request.shift);
  const courseID = request.course_id;
  const lecturerName = request.lecturer_name;
  const classID = request.class_id;

  let rawQuery =
    TransactionHelper.rawQueryAllTransactions +
    " where TO_CHAR(tr.transaction_date, 'YYYY-MM-DD') = ? and mss.shift_id = ? and msc.course_id = ? and msl.lecturer_name = ? and tr.class_id = ?";
  const transaction = await db.raw(rawQuery, [
    date,
    shiftID,
    courseID,
    lecturerName,
    classID,
  ]);

  return transaction.rows;
};

const updateLectureStatus = async (request) => {
  const transactionID = request.transactionID;

  await db("tr_transaction").where({ transaction_id: transactionID }).update({
    status_id: 2 /* set to present */,
    transaction_update_date: new Date(),
    update_user: "BOT",
    update_date: new Date(),
  });
};

/* --- functionality --- */

async function getShiftID(shift) {
  const [shiftStart, shiftEnd] = TransactionHelper.getShift(shift);
  const shiftID = await db("ms_shift")
    .where({
      shift_start_time: shiftStart,
      shift_end_time: shiftEnd,
    })
    .select("shift_id");

  return shiftID[0].shift_id;
}


async function insertAllData(transactionsCount) {
  /* if no data, generate dummy data */
  if (transactionsCount === 0) {
    /* 1. generate dummy data */
    const transaction = TransactionHelper.generateTransactions();
    /* 2. insert lecturer data to db */
    for (let x = 0; x < transaction.length; x++) {
      await insertLecturerData(
        transaction[x].lecturerID,
        transaction[x].lecturerName
      );
      await insertCourseData(
        transaction[x].courseID,
        transaction[x].courseDescription
      );
      await insertTransactionData(transaction[x], date);
    }
  }
}

async function getTransacHelper(startDate, endDate) {
  var bindings = [];
  var placeholders = [];
  const getDayCount = TransactionHelper.getDayCount(startDate, endDate);

  /* check database for this range days and generate the data */
  for (let x = 0; x <= getDayCount; x++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + x);

    const formattedDate = TransactionHelper.formatDate(date);
    bindings.push(formattedDate);

    placeholders.push("?");

    let transactions = await db.raw(
      TransactionHelper.rawQueryAllTransactions +
        " where TO_CHAR(tr.transaction_date, 'YYYY-MM-DD') = ?",
      [formattedDate]
    );

    await insertAllData(transactions.rows.length);
  }

  return [bindings, placeholders];
}

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
}

async function insertCourseData(courseID, courseDescription) {
  await db("ms_course")
    .insert({
      course_id: courseID,
      course_description: courseDescription,
      input_user: "SYSTEM",
      input_date: new Date(),
    })
    .onConflict("course_id")
    .ignore();
}

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
  searchTransaction,
  updateLectureStatus,
};
