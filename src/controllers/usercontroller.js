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

async function authenticate1({ username, password }) {
  const user = users.find(u => u.username === username && u.password === password);

  // create a jwt token that is valid for 7 days
  const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });

  return {
    ...omitPassword(user),
    status: 'success',
    token
  };
}

async function authenticate2({ username, password }) {
  const user = users.find(u => u.username === username && u.password === password);

  return {
    ...omitPassword(user),
    status: 'success'
  };
}

export function authenticate(req, res, next) {
  authenticate1(req.body)
    .then(user => res.json(user))
    .catch(next);
}

export function me(req, res, next) {
  authenticate2(req.body)
    .then(user => res.json(user))
    .catch(next);
}
