import Model from '../models/model';

const UpdateModel = new Model('StoreStudentLevels');

export const UpdateStudentLevels = async (req, res) => {
  try {
    const params = req.body;
    let data = '';
    data = await UpdateModel.Update(params);
    res.status(200).json({ UpdateStudentLevels: data });
  } catch (err) {
    res.status(200).json({ UpdateStudentLevels: err.stack });
  }
};
