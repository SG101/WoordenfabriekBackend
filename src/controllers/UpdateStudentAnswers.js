import Model from '../models/model';

const UpdateAnswersModel = new Model('StoreChallengeAnswers');

export const UpdateStudentAnswers = async (req, res) => {
  try {
    const params = req.body;
    let data = '';
    data = await UpdateAnswersModel.Update(params);
    res.status(200).json({ UpdateStudentAnswers: data });
  } catch (err) {
    res.status(200).json({ UpdateStudentAnswers: err.stack });
  }
};
