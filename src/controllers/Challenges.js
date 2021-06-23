import Model from '../models/model';

const challengeModel = new Model('Challenges');

export const ChallengeDetails = async (req, res) => {
  try {
    let { ChallengeID } = req.query;
    let data = '';
    if (ChallengeID) {
      ChallengeID = `'${ChallengeID}'`;
      data = await challengeModel.select('challengeid, challengesubtitle', 'challengeid', ChallengeID);
    } else {
      data = await challengeModel.select('challengeid, challengesubtitle', 'challengeid');
    }
    res.status(200).json({ Challenges: data });
  } catch (err) {
    res.status(200).json({ Challenges: err.stack });
  }
};
