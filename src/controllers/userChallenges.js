import Model from '../models/model';

const lessonModel = new Model('public."vwLessonChallengeSummary"');

export const ChallengePage = async (req, res) => {
  try {
    let { OnlyCurrent } = req.query;
    let { lessonID } = req.query;
    let data = '';
    if ((lessonID) && !(OnlyCurrent)) {
      lessonID = `'${lessonID}'`;
      data = await lessonModel.select('studentchallengeid, studentlessonid, challengesubtitle, startdate, completiondate, earnedstars, completionprogress, challengeid, challengetitle,lessontitle, lessonsubtitle', 'StudentLessonID', lessonID);
    } else if (OnlyCurrent) {
      OnlyCurrent = `'${OnlyCurrent}'`;
      data = await lessonModel.select('studentchallengeid, studentlessonid, challengesubtitle, startdate, completiondate, earnedstars, completionprogress,  challengeid, challengetitle,lessontitle, lessonsubtitle', 'StudentLessonID', lessonID, 'isCurrent', OnlyCurrent);
    } else {
      data = await lessonModel.select('studentchallengeid, studentlessonid, challengesubtitle, startdate, completiondate, earnedstars, completionprogress,  challengeid, challengetitle,lessontitle, lessonsubtitle');
    }
    res.status(200).json({ vwUsers: data.rows });
  } catch (err) {
    res.status(200).json({ vwUsers: err.stack });
  }
};
