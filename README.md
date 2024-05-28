# nodejs-express-mongodb-boilerplate

- the application is a boilertemplate for nodejs, express and mongodb also included features below:
- code formatting using prettierrc
- using nodemon during development
- utility logger using winston
- request and response payload validation using joi
- custom error handling and error payload
- sample healthcheck endpoints
- complete structure sample users CRUD api
- you can implement your own pagination in GET /users

## Table of Contents

- [Getting Started](https://github.com/arisculala/nodejs-express-mongodb-boilerplate#getting-started)
  - [Prerequisites](https://github.com/arisculala/nodejs-express-mongodb-boilerplate#prerequisites)
  - [Installation](https://github.com/arisculala/nodejs-express-mongodb-boilerplate#installation)

[References](https://github.com/arisculala/nodejs-express-mongodb-boilerplate#references)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm or yarn

### Installation

1. Clone the repository

```bash
$ git clone https://github.com/arisculala/nodejs-express-mongodb-boilerplate.git
```

2. Copy .env.example (Configure the service by updating the .env file with your specific details)

```bash
$ cd nodejs-express-mongodb-boilerplate
$ cp .env.example .env
```

3. Install dependencies

```bash
$ npm install
```

4. Run the service

```bash
$ npm run dev
```

5. Open service in the browser

```bash
http://localhost:3000/healthcheck/
```

### Run test

```bash
$ npm run test
```

## References
