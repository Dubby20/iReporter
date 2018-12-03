import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  RedFlagValidator
} from '../helpers/validateRedFlag';

const {
  expect
} = chai;

chai.use(chaiHttp);

describe('Validate red-flag input', () => {
  let redFlagValidator;
  beforeEach((done) => {
    redFlagValidator = new RedFlagValidator();
    done();
  });
  it('should validate testForCreatedBy function', (done) => {
    redFlagValidator.testForCreatedBy(1);
    expect(redFlagValidator.passing).to.equal(true);
    redFlagValidator.testForCreatedBy('1');
    expect(redFlagValidator.passing).to.equal(false);
    expect(redFlagValidator.errMessage).to.equal('Type of createdBy must be a registered user number');
    done();
  });

  it('should validate testForType function', (done) => {
    redFlagValidator.testForType('red-flag');
    expect(redFlagValidator.passing).to.equal(true);
    redFlagValidator.testForType('red');
    expect(redFlagValidator.passing).to.equal(false);
    expect(redFlagValidator.errMessage).to.equal('Type of record can either be red-flag or intervention');
    done();
  });

  it('should validate testForLocation function', (done) => {
    redFlagValidator.testForLocation('6.524379, 3.379206');
    expect(redFlagValidator.passing).to.equal(true);
    redFlagValidator.testForLocation('6.524379 3.379206');
    expect(redFlagValidator.passing).to.equal(false);
    expect(redFlagValidator.errMessage).to.equal('Input does not match a Lat Long coordinates');
    done();
  });

  it('should validate testForStatus function', (done) => {
    redFlagValidator.testForStatus('resolved');
    expect(redFlagValidator.passing).to.equal(true);
    redFlagValidator.testForStatus('denied');
    expect(redFlagValidator.passing).to.equal(false);
    expect(redFlagValidator.errMessage).to.equal('Input does not match any of the recommended status');
    done();
  });

  it('should validate testForImages function', (done) => {
    redFlagValidator.testForImages('https://static.pulse.ng/img/incoming/origs7532087/2036362149-w644-h960/babachir-lawal.jpg');
    expect(redFlagValidator.passing).to.equal(true);
    redFlagValidator.testForImages('https://static.pulse.ng/img/incoming/origs7532087/2036362149-w644-h960/babachir-lawal');
    expect(redFlagValidator.passing).to.equal(false);
    expect(redFlagValidator.errMessage).to.equal('Input is not a valid image extension');
    done();
  });

  it('should validate testForVideos function', (done) => {
    redFlagValidator.testForVideos('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtbtjMiVvbOLVc7dA53s3_st7BjF-wtTxNu8Tq_-5al0IZBId');
    expect(redFlagValidator.passing).to.equal(true);
    redFlagValidator.testForVideos(123456);
    expect(redFlagValidator.passing).to.equal(false);
    expect(redFlagValidator.errMessage).to.equal('Input must be characters');
    done();
  });

  it('should validate testForComment function', (done) => {
    redFlagValidator.testForComment('$24 billion NNPC contract scam');
    expect(redFlagValidator.passing).to.equal(true);
    redFlagValidator.testForComment('Employment scandals in Central Bank of Nigeria (CBN) and Federal Inland Revenue Service (FIRS). Grass Cutting scandal of ex-secretary to the Federal Government ' + '\n' +
      'Employment scandals in Central Bank of Nigeria (CBN) and Federal Inland Revenue Service (FIRS). Employment scandals in Central Bank of Nigeria (CBN) and Federal Inland Revenue Service (FIRS).');
    expect(redFlagValidator.passing).to.equal(false);
    expect(redFlagValidator.errMessage).to.equal('Comment must be characters not exceeding 300 words');
    done();
  });

  it('should validate resetValid function', (done) => {
    redFlagValidator.resetValid();
    expect(redFlagValidator.passing).to.equal(true);
    done();
  });
  it('should validate testForEmptyStringInput function', (done) => {
    const incidents = {
      createdBy: 2,
      type: 'intervention',
      location: '6.524379, 3.379206',
      status: 'rejected',
      images: 'https://static.pulse.ng/img/incoming/origs7872357/5196368231-w644-h960/DSuR9f-XUAY9MDF.jpg',
      videos: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtbtjMiVvbOLVc7dA53s3_st7BjF-wtTxNu8Tq_-5al0IZBId',
      comment: '$24 billion NNPC contract scam'
    };
    redFlagValidator.testForEmptyStringInput(incidents);
    // expect(redFlagValidator.errMessage).to.equal(undefined);
    expect(redFlagValidator.passing).to.equal(true);
    redFlagValidator.testForEmptyStringInput({
      status: ''
    });
    expect(redFlagValidator.passing).to.equal(false);
    expect(redFlagValidator.errMessage).to.equal('Input fields must not be empty');
    done();
  });
});