import { secret } from '../settings';

const jwt = require('jsonwebtoken');

const users = [ {
  id: 1,
  username: 'jaap@appalot.com',
  password: 'test',
  firstName: 'Jaap',
  lastName: 'Gerritsen'
} ];

function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

async function authenticate({ username, password }) {
  const user = users.find(u => u.username === username && u.password === password);

  // create a jwt token that is valid for 7 days
  const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });

  return {
    ...omitPassword(user),
    token
  };
}
