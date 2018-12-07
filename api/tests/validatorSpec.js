import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  ValidateUserSignup
} from '../middlewares/validateUser';

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