import Model from '../models/model';

const LearningDetailsModel = new Model('vwChallengeDetailsK02');

export const ChallengeQuestionsK02 = async (req, res) => {
  try {
    let { ChallengeID } = req.query;
    let data = '';
    if (ChallengeID) {
      ChallengeID = `'${ChallengeID}'`;
      data = await LearningDetailsModel.select('id, challengelevelid, Morfeem1, Morfeem2, Morfeem3, word, answer1, answer2, answer3, WoordAnswer, levelid, challengeid', 'challengelevelid', ChallengeID);
    } else {
      data = await LearningDetailsModel.select('id, challengelevelid, Morfeem1, Morfeem2, Morfeem3, word, answer1, answer2, answer3, WoordAnswer, levelid, challengeid');
    }
    res.status(200).json({ LearningQuestions: data });
  } catch (err) {
    res.status(200).json({ LearningQuestions: err.stack });
  }
};
