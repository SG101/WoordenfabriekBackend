import Model from '../models/model';

const lessonModel = new Model('vwLessonLevelsSummary');

export const LevelsPage = async (req, res) => {
  try {
    let { OnlyCurrent } = req.query;
    let { lessonID } = req.query;
    let data = '';
    if ((lessonID) && !(OnlyCurrent)) {
      lessonID = `'${lessonID}'`;
      data = await lessonModel.select('studentlevelid, studentlessonid, levelsubtitle, startdate, completiondate, earnedstars, completionprogress, LevelID, leveltitle,lessontitle, lessonsubtitle', 'StudentLessonID', lessonID);
    } else if (OnlyCurrent) {
      OnlyCurrent = `'${OnlyCurrent}'`;
      data = await lessonModel.select('studentlevelid, studentlessonid, levelsubtitle, startdate, completiondate, earnedstars, completionprogress,  LevelID, leveltitle,lessontitle, lessonsubtitle', 'StudentLessonID', lessonID, 'isCurrent', OnlyCurrent);
    } else {
      data = await lessonModel.select('studentlevelid, studentlessonid, levelsubtitle, startdate, completiondate, earnedstars, completionprogress,  LevelID, leveltitle,lessontitle, lessonsubtitle');
    }
    res.status(200).json({ vwUsers: data });
  } catch (err) {
    res.status(200).json({ vwUsers: err.stack });
  }
};
