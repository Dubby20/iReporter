import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';


const {
  expect
} = chai;

chai.use(chaiHttp);

describe('/POST red-flag', () => {
  it('should create a red-flag record', (done) => {
    const incidents = {
      createdBy: 2,
      type: 'intervention',
      location: '6.524379, 3.379206',
      status: 'rejected',
      images: 'https://static.pulse.ng/img/incoming/origs7872357/5196368231-w644-h960/DSuR9f-XUAY9MDF.jpg',
      videos: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtbtjMiVvbOLVc7dA53s3_st7BjF-wtTxNu8Tq_-5al0IZBId',
      comment: '$24 billion NNPC contract scam'
    };
    chai.request(server)
      .post('/api/v1/red-flag')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(incidents)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body.data[0]).to.have.property('message').eql('Created red-flag record');
        done();
      });
  });

  it('should not create a red flag if input is invalid', (done) => {
    const incidents = {
      createdBy: 2,
      type: 'intervention',
      location: '6.524379, 3.379206',
      status: 'rejected',
      images: 'https://static.pulse.ng/img/incoming/origs7872357/5196368231-w644-h960/DSuR9f-XUAY9MDF',
      videos: '',
      comment: '$24 billion NNPC contract scam'
    };
    chai.request(server)
      .post('/api/v1/red-flag')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(incidents)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});