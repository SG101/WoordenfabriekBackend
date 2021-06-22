import Model from '../models/model';

const challengeModel = new Model('public."Challenges"');

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
    res.status(200).json({ Challenges: data.rows });
  } catch (err) {
    res.status(200).json({ Challenges: err.stack });
  }
};
