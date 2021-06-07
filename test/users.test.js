import { expect, server, BASE_URL } from './setup';

describe('Users', () => {
  it('get users page', done => {
    server
      .get(`${BASE_URL}/users?userEmail=jaap@appalot.com`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.messages).to.be.instanceOf(Array);
        res.body.messages.forEach(m => {
          expect(m).to.have.property('UserFound');
        });
        done();
      });
  });
});
