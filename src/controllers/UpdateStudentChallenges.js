import Model from '../models/model';

const UpdateModel = new Model('StoreStudentChallenges');

export const UpdateStudentChallenges = async (req, res) => {
  try {
    const params = req.body;
    let data = '';
    console.log(params);
    data = await UpdateModel.Update(params);
    res.status(200).json({ UpdateStudentChallenges: data });
  } catch (err) {
    res.status(200).json({ UpdateStudentChallenges: err.stack });
  }
};
