import Model from '../models/model';

const LearningDetailsModel = new Model('public."vwChallengeQuestions"');

export const LearningDetails = async (req, res) => {
  try {
    let { LearningObjectID } = req.query;
    let data = '';
    if (LearningObjectID) {
      LearningObjectID = `'${LearningObjectID}'`;
      data = await LearningDetailsModel.select('id, challengelearningobjectid, word, morepheme1, morpheme2, morpheme3, stam, stambetekenis, morphemebetekenis1, morphemebetekenis2, morphemebetekenis3, paragraph, challengeid, learningobjectid', 'challengelearningobjectid', LearningObjectID);
    } else {
      data = await LearningDetailsModel.select('id, challengelearningobjectid, word, morepheme1, morpheme2, morpheme3, stam, stambetekenis, morphemebetekenis1, morphemebetekenis2, morphemebetekenis3, paragraph, challengeid, learningobjectid');
    }
    res.status(200).json({ LearningQuestions: data.rows });
  } catch (err) {
    res.status(200).json({ LearningQuestions: err.stack });
  }
};
