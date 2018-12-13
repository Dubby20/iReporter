[![Build Status](https://travis-ci.org/Dubby20/iReporter.svg?branch=develop-1)](https://travis-ci.org/Dubby20/iReporter)
[![Coverage Status](https://coveralls.io/repos/github/Dubby20/iReporter/badge.svg?branch=develop-1)](https://coveralls.io/github/Dubby20/iReporter?branch=develop-1)
[![Maintainability](https://api.codeclimate.com/v1/badges/60048819973b3d9e7717/maintainability)](https://codeclimate.com/github/Dubby20/iReporter/maintainability)

# iReporter

iReporter enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that needs government intervention

- Hosted Github Page [iReporter247](https://dubby20.github.io/iReporter/UI/index.html)

## Features

- Users can create an account.
- Users can log in.
- Users can create red-flag or intervention records.
- Users can edit their red-flag or intervention records when the record’s status is yet to be marked as either under
  investigation, rejected, or resolved..
- Users can delete their red-flag or intervention records when the record’s status is yet to be marked as either under
  investigation, rejected, or resolved..
- Users can add geolocation (Lat Long Coordinates) to their red-flag or intervention records.
- Users can change the geolocation (Lat Long Coordinates) attached to their red-flag or intervention records when the record’s status is yet to be marked as either under
  investigation, rejected, or resolved.
- Users can add images to their red-flag or intervention records, to support their claims.
- Users can add videos to their red-flag or intervention records, to support their claims.
- Admin can change the status of a record to either under investigation, rejected or resolved.

## Setup

Step by step instructions on how to get the code setup locally. This may include:

- Open the terminal
- cd into directory that you want the project to reside.

```
cd projects
```

- clone the repository into that directory.

```
git clone https://github.com/Dubby20/iReporter.git
```

```
run npm install && npm run start
```

### Dependencies

List of libraries, tools, etc used for this project

- [Nodejs](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express](https://expressjs.com/) - A web framework for [Nodejs](https://nodejs.org/en/)
- [Babel](https://babeljs.io) - Javascript compiler.
- [Eslint](https://eslint.org/) - Javascript linter. [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style [guide](https://github.com/airbnb/javascript)
  <!-- * [Postgresql](https://www.postgresql.org/) -->

### Testing tools

- [Mocha](https://mochajs.org/) - A Javascript test framework.
- [Chai](http://chaijs.com) - A BDD / TDD Assertion library.
- [Istanbul](https://istanbul.js.org) - Javascript code coverage tool.
- [nyc](https://github.com/istanbuljs/nyc) - The Istanbul command line interface.

## :star: Documentation :star:

List of endpoints exposed by the service

## Endpoints

**Routes**

- POST `/api/v1/auth/signup` Use this route to create an account. The following fields are required:

  - `firstname` The user firstname
  - `lastname` The user lastname
  - `othernames` The user othernames
  - `username` The user username
  - `email` The user email address
  - `password` The user password at least 6 characters
  - `phone number` The user phone number

- POST `/api/v1/auth/login` Use this route to login to the application. The folowing fields are required:
  - `email` The user registered email
  - `password` The user registered password

* POST `/api/v1/red-flags` Use this route to create a red-flag record. The following fields are required:

  - `location` Lat Long coordinates
  - `status` The status of a record which is `draft` by default
  - `images` The images attached to support your claims
  - `videos` The videos attached to support your claims
  - `comment` The user's comment

* POST `/api/v1/interventions` Use this route to create an intervention record. The following fields are required:
  - `location` Lat Long coordinates
  - `status` The status of a record which is `draft` by default
  - `images` The images attached to support your claims
  - `videos` The videos attached to support your claims
  - `comment` The user's comment

- GET `api/v1/red-flags` Use this route to get all red-flags records

- GET `api/v1/interventions` Use this route to get all interventions records

- GET `api/v1/red-flags/:id` Use this route to get a specific red-flag record

- GET `api/v1/interventions/:id` Use this route to get a specific intervention record

- PATCH `api/v1/red-flags/:id/location` Use this route to edit a specific red-flag record location

- PATCH `api/v1/interventions/:id/location` Use this route to edit a specific intervention record location

- PATCH `api/v1/red-flags/:id/comment` Use this route to edit a specific red-flag record comment

- PATCH `api/v1/interventions/:id/comment` Use this route to edit a specific intervention record comment

- DELETE `api/v1/red-flags/:id` Use this route to delete a specific red-flag record

- DELETE `api/v1/interventions/:id` Use this route to delete a specific intervention record

- PATCH `api/v1/red-flags/:id/status` An admin can use this route to edit a specific red-flag record status

- PATCH `api/v1/red-flags/:id/status` An admin can use this route to edit a specific intervention record status

## Demo

A fully functional demo of this project hosted on Heroku is available at [iReporter](https://ireport247.herokuapp.com/)

### Testing the application

List of steps to run the service

[Postman](www.getpostman.com)

Running unit tests.

- In a terminal, `cd` to the cloned project file.
- Run `npm test`. This runs tests and displays coverage data generated by [Istanbul's](https://istanbul.js.org) nyc.

## Contributing

**:heart: contributions!**

I will **happily** accept your pull request if it:

- **has tests**
- looks reasonable
- does not break backwards compatibility

## Author

Jacinta Nnadi
