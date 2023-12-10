const db = require("../application/database");

const getShifts = async () => {
  const shifts = await db("ms_shift").select(
    "shift_start_time",
    "shift_end_time"
  );

  return shifts.map((shift) => {
    return (
      shift.shift_start_time.substring(0, 5) + " - " + shift.shift_end_time.substring(0, 5)
    );
  });
};

module.exports = {
  getShifts,
};
