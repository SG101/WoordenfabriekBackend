import Model from '../models/model';

const LearningDetailsModel = new Model('vwChallengeQuestions');

export const ChallengeQuestions = async (req, res) => {
  try {
    let { ChallengeID } = req.query;
    let data = '';
    if (ChallengeID) {
      ChallengeID = `'${ChallengeID}'`;
      data = await LearningDetailsModel.select('id, challengelevelid, word, morepheme1, morpheme2, morpheme3, stam, stambetekenis, morphemebetekenis1, morphemebetekenis2, morphemebetekenis3, paragraph, challengeid', 'challengelevelid', ChallengeID);
    } else {
      data = await LearningDetailsModel.select('id, challengelevelid, word, morepheme1, morpheme2, morpheme3, stam, stambetekenis, morphemebetekenis1, morphemebetekenis2, morphemebetekenis3, paragraph, challengeid');
    }
    res.status(200).json({ LearningQuestions: data });
  } catch (err) {
    res.status(200).json({ LearningQuestions: err.stack });
  }
};
