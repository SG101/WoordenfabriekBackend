import Model from '../models/model';

const userModel = new Model('public."vwUsers"');

export const userPage = async (req, res) => {
  try {
    let { userEmail } = req.query;
    let data = '';
    if (userEmail) {
      userEmail = `'${userEmail}'`;
      data = await userModel.select('Min(id) as ID, Min(studentname) as name, Count(*) AS TotalFound', 'studentemail', userEmail);
    } else {
      data = await userModel.select('Min(id) as ID, Min(studentname) as name, Count(*) AS TotalFound');
    }
    res.status(200).json({ vwUsers: data.rows });
  } catch (err) {
    res.status(200).json({ vwUsers: err.stack });
  }
};
