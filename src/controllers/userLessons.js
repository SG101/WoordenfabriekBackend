import Model from '../models/model';

const userModel = new Model('public."vwStudentLessons"');
const lessonModel = new Model('public."vwLessonChallengeSummary"');

export const LessonsPage = async (req, res) => {
  try {
    let { studentEmail } = req.query;
    let { lessonID } = req.query;
    let data = '';
    if (lessonID) {
      lessonID = `'${lessonID}'`;
      data = await lessonModel.select('studentchallengeid, studentlessonid, startdate, completiondate, earnedstars, completionprogress, challengesubtitle, challengetitle,lessontitle', 'StudentLessonID', lessonID);
    } else if (studentEmail) {
      studentEmail = `'${studentEmail}'`;
      data = await userModel.select('StudentLessonID, LessonTitle, Status, AssignedDate, CompletionDate, StudentEMAIL', 'StudentEMAIL', studentEmail);
    } else {
      data = await userModel.select('StudentLessonID, LessonTitle, Status, AssignedDate, CompletionDate, StudentEMAIL');
    }
    res.status(200).json({ vwUsers: data.rows });
  } catch (err) {
    res.status(200).json({ vwUsers: err.stack });
  }
};
