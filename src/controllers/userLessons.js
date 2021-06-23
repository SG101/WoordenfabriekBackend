import Model from '../models/model';

const userModel = new Model('vwStudentLessons');
const lessonModel = new Model('vwLessonChallengeSummary');

export const LessonsPage = async (req, res) => {
  try {
    let { studentEmail } = req.query;
    let { lessonID } = req.query;
    let data = '';
    if (lessonID) {
      lessonID = `'${lessonID}'`;
      data = await lessonModel.select('studentchallengeid, studentlessonid, challengesubtitle, startdate, completiondate, earnedstars, completionprogress,  challengetitle,lessontitle, lessonsubtitle', 'StudentLessonID', lessonID);
    } else if (studentEmail) {
      studentEmail = `'${studentEmail}'`;
      data = await userModel.select('StudentLessonID, LessonTitle, Status, AssignedDate, CompletionDate, StudentEMAIL', 'StudentEMAIL', studentEmail);
    } else {
      data = await userModel.select('StudentLessonID, LessonTitle, Status, AssignedDate, CompletionDate, StudentEMAIL');
    }
  
    res.status(200).json({ vwUsers: data });
  } catch (err) {
    res.status(200).json({ vwUsers: err.stack });
  }
};
