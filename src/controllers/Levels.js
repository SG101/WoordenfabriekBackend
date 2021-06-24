import Model from '../models/model';

const challengeModel = new Model('Levels');

export const ChallengeDetails = async (req, res) => {
  try {
    let { LevelID } = req.query;
    let data = '';
    if (LevelID) {
      LevelID = `'${LevelID}'`;
      data = await challengeModel.select('levelid, levelsubtitle', 'levelid', LevelID);
    } else {
      data = await challengeModel.select('levelid, levelsubtitle');
    }
    res.status(200).json({ Levels: data });
  } catch (err) {
    res.status(200).json({ Levels: err.stack });
  }
};
