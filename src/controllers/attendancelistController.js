import {prisma} from "../config/db.js";

const markAttendance = async (res, req) => {
    const {classId, attendance_date, records } = req.body;
    // const markedId = req.user.id;

    const rowsToInsert = records.maps((record) => {
        return {
            classId: classId,
            attendance_date: new Date(attendance_date),
            createBy: markerId,
            studentId: record.studentId,
            status: record.status
        };
    });

    const attendanceList = await prisma.user.createMany({
        data: rowsToInsert
    });

    res
    .status(201)
    .json({
        status: "successful",
        message: "Attendance Submitted"
    })
};


const updateAttendanceRecord = async (req, res) => {

}

export {markAttendance, updateAttendanceRecord}