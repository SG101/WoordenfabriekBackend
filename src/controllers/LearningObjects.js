import Model from '../models/model';

const LearningObjectsModel = new Model('vwLearningObjects');

export const LearningObjects = async (req, res) => {
  try {
    let { ChallengeID } = req.query;
    let data = '';
    if (ChallengeID) {
      ChallengeID = `'${ChallengeID}'`;
      data = await LearningObjectsModel.select('challenge_x_learningobjectid, challengeid, learningobjectid, learningobjectdescription, learningobjecttitle, learningobjectsubtitle, learningobjecttypeid, learningobjecthelptext', 'challengeid', ChallengeID);
    } else {
      data = await LearningObjectsModel.select('challenge_x_learningobjectid, challengeid, learningobjectid, learningobjectdescription, learningobjecttitle, learningobjectsubtitle, learningobjecttypeid, learningobjecthelptext');
    }
    res.status(200).json({ LearningObjects: data });
  } catch (err) {
    res.status(200).json({ LearningObjects: err.stack });
  }
};
