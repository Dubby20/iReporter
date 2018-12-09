import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const {
  expect
} = chai;

const user = {
  email: 'ebuka179@gmail.com',
  password: 'password221'
};
chai.use(chaiHttp);
let userToken;

const redFlag = {
  location: '6.524379, 3.379206',
  images: [
    'https://static.pulse.ng/img/incoming/origs7532087/2036362149-w644-h960/babachir-lawal.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtbtjMiVvbOLVc7dA53s3_st7BjF-wtTxNu8Tq_-5al0IZBId.jpg'
  ],
  videos: [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtbtjMiVvbOLVc7dA53s3_st7BjF-wtTxNu8Tq_-5al0IZBId',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtbtjMiVvbOLVc7dA53s3_st7BjF-wtTxNu8Tq_-5al0IZBId'
  ],
  comment: 'Grass Cutting” scandal of ex-secretary to the Federal Government'
};

describe('/POST orders', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/auth/login')
      .send(user)
      .end((error, response) => {
        userToken = response.body.data[0].token;
        done();
      });
  });
  it('it should create a red-flag', (done) => {
    chai
      .request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(redFlag)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.be.an('array');
        expect(response.body.data[0]).to.have.property('message').eql('Created red-flag record');
        done();
      });
  });

  it('it should not place an empty red-flag', (done) => {
    const invalidRedFlag = {
      location: '',
      images: '',
      videos: [],
      comment: ''
    };
    chai
      .request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(invalidRedFlag)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body)
          .to.have.property('message')
          .eql('Input fields must not be empty');
        done();
      });
  });

  it('it should not create a red-flag if input is not valid', (done) => {
    const redFlag2 = {
      location: '10.89',
      images: 'htpps://wwww.bbgfddhghj',
      videos: [],
      comment: ''
    };
    chai
      .request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken)
      .send(redFlag2)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('it should not create a red-flag if the user is not authenticated', (done) => {
    chai
      .request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', '')
      .send(redFlag)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.error).eql('Unauthorized');
        done();
      });
  });

  it('it should not create a red-flag if the token is invalid', (done) => {
    chai
      .request(server)
      .post('/api/v1/red-flags')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', 'eghdfhyujgfjkgk')
      .send(redFlag)
      .end((error, response) => {
        expect(response).to.have.status(403);
        expect(response.body).to.be.an('object');
        expect(response.body.error).eql('Access denied');
        done();
      });
  });
});