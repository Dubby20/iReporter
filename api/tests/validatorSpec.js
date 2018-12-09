import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  ValidateUserSignup
} from '../middlewares/validateUser';
import {
  RedFlagValidator
} from '../middlewares/validateRedFlag';

const {
  expect
} = chai;

chai.use(chaiHttp);

describe('Validate  users signup', () => {
  let validateSignup;
  beforeEach((done) => {
    validateSignup = new ValidateUserSignup();
    done();
  });

  it('should validate testForEmptyStringInput function', (done) => {
    const users = {
      firstname: 'Jacinta',
      lastname: 'Nnadi',
      othernames: 'Chidubem',
      username: 'jacy20',
      email: 'jacy@gmail.com',
      password: 'password678',
      phoneNumber: '08097654572'
    };
    validateSignup.testForEmptyStringInput(users);
    expect(validateSignup.errMessage).to.equal(undefined);
    expect(validateSignup.passing).to.equal(true);
    validateSignup.testForEmptyStringInput({
      firstname: ''
    });
    expect(validateSignup.passing).to.equal(false);
    expect(validateSignup.errMessage).to.equal('Input fields must not be empty');
    done();
  });

  it('should validate testFirstName function', (done) => {
    validateSignup.testFirstName('Jacinta');
    expect(validateSignup.passing).to.equal(true);
    expect(validateSignup.errMessage).to.equal(undefined);
    validateSignup.testFirstName('Jacy0984');
    expect(validateSignup.passing).to.equal(false);
    expect(validateSignup.errMessage).to.equal('Firstname must contain between 3 and 30 characters only');
    done();
  });

  it('should validate testLastName function', (done) => {
    validateSignup.testLastName('Nnadi');
    expect(validateSignup.passing).to.equal(true);
    expect(validateSignup.errMessage).to.equal(undefined);
    validateSignup.testLastName('Nnadi0984');
    expect(validateSignup.passing).to.equal(false);
    expect(validateSignup.errMessage).to.equal('Lastname must contain between 3 and 30 characters only');
    done();
  });

  it('should validate testOtherNames function', (done) => {
    validateSignup.testOtherNames('Chidubem');
    expect(validateSignup.passing).to.equal(true);
    expect(validateSignup.errMessage).to.equal(undefined);
    validateSignup.testOtherNames('Nnadi0984');
    expect(validateSignup.passing).to.equal(false);
    expect(validateSignup.errMessage).to.equal('Othernames must contain a minimum of 3 charcaters');
    done();
  });

  it('should validate testUserName function', (done) => {
    validateSignup.testUserName('Nnadi20');
    expect(validateSignup.passing).to.equal(true);
    expect(validateSignup.errMessage).to.equal(undefined);
    validateSignup.testUserName('Nn');
    expect(validateSignup.passing).to.equal(false);
    expect(validateSignup.errMessage).to.equal('Username must contain between 3 and 30 characters only');
    done();
  });

  it('should validate testEmail function', (done) => {
    validateSignup.testEmail('jacy@gmail.com');
    expect(validateSignup.passing).to.equal(true);
    expect(validateSignup.errMessage).to.equal(undefined);
    validateSignup.testEmail('jacy.com');
    expect(validateSignup.passing).to.equal(false);
    expect(validateSignup.errMessage).to.equal('Please enter a valid email');
    done();
  });

  it('should validate testPassword function', (done) => {
    validateSignup.testPassword('password678');
    expect(validateSignup.passing).to.equal(true);
    expect(validateSignup.errMessage).to.equal(undefined);
    validateSignup.testPassword('pass');
    expect(validateSignup.passing).to.equal(false);
    expect(validateSignup.errMessage).to.equal('Password must be a minimum of 6 alphanumeric characters');
    done();
  });

  it('should validate testPhoneNumber function', (done) => {
    validateSignup.testPhoneNumber('08067584356');
    expect(validateSignup.passing).to.equal(true);
    expect(validateSignup.errMessage).to.equal(undefined);
    validateSignup.testPhoneNumber('34567');
    expect(validateSignup.passing).to.equal(false);
    expect(validateSignup.errMessage).to.equal('Please enter a valid phone number');
    done();
  });

  it('should validate the resetValid function', (done) => {
    validateSignup.resetValid();
    expect(validateSignup.passing).to.equal(true);
    done();
  });
});

describe('Validate red-flag input', () => {
  let redFlagValidator;
  beforeEach((done) => {
    redFlagValidator = new RedFlagValidator();
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

  it('should validate testForImages function', (done) => {
    redFlagValidator.testForImages(['https://static.pulse.ng/img/incoming/origs7532087/2036362149-w644-h960/babachir-lawal.jpg']);
    expect(redFlagValidator.passing).to.equal(true);
    redFlagValidator.testForImages('https://static.pulse.ng/img/incoming/origs7532087/2036362149-w644-h960/babachir-lawal');
    expect(redFlagValidator.passing).to.equal(false);
    expect(redFlagValidator.errMessage).to.equal('Input is not an array or a valid image extension');
    done();
  });

  it('should validate testForVideos function', (done) => {
    redFlagValidator.testForVideos(['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtbtjMiVvbOLVc7dA53s3_st7BjF-wtTxNu8Tq_-5al0IZBId']);
    expect(redFlagValidator.passing).to.equal(true);
    redFlagValidator.testForVideos([1234]);
    expect(redFlagValidator.passing).to.equal(false);
    expect(redFlagValidator.errMessage).to.equal('Video input is not an array or a string');
    done();
  });

  it('should validate testForComment function', (done) => {
    redFlagValidator.testForComment('$24 billion NNPC contract scam');
    expect(redFlagValidator.passing).to.equal(true);
    // eslint-disable-next-line operator-linebreak
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
      images: ['https://static.pulse.ng/img/incoming/origs7872357/5196368231-w644-h960/DSuR9f-XUAY9MDF.jpg'],
      videos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtbtjMiVvbOLVc7dA53s3_st7BjF-wtTxNu8Tq_-5al0IZBId'],
      comment: '$24 billion NNPC contract scam'
    };
    redFlagValidator.testForEmptyStringInput(incidents);
    expect(redFlagValidator.errMessage).to.equal(undefined);
    expect(redFlagValidator.passing).to.equal(true);
    redFlagValidator.testForEmptyStringInput({
      status: ''
    });
    expect(redFlagValidator.passing).to.equal(false);
    expect(redFlagValidator.errMessage).to.equal('Input fields must not be empty');
    done();
  });
});