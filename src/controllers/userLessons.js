import Model from '../models/model';

const userModel = new Model('public."vwStudentLessons"');

export const LessonsPage = async (req, res) => {
  try {
    let { userEmail } = req.query;
    let data = '';
    if (userEmail) {
      userEmail = `'${userEmail}'`;
      data = await userModel.select('StudentLessonID, LessonTitle, Status, AssignedDate, CompletionDate, StudentEMAIL', 'StudentEMAIL', userEmail);
    } else {
      data = await userModel.select('StudentLessonID, LessonTitle, Status, AssignedDate, CompletionDate, StudentEMAIL');
    }
    res.status(200).json({ vwUsers: data.rows });
  } catch (err) {
    res.status(200).json({ vwUsers: err.stack });
  }
};
