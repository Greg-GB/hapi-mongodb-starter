'use strict';

process.env.NODE_ENV = 'test';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const Server = require('../../src/server');
const DB = require('../../src/db');
const config = require('../../src/config');

lab.experiment('Users @service', () => {
  let server = new Server(config);

  lab.before(() => {
    return server.start()
      .then(startedServer => {
        server = startedServer
      });
  });

  lab.beforeEach(() => {
    return DB.dropDB(config.dbUrl);
  });

  lab.test('GET /users should return 0 users', () => {
    let getUsers = {
      method: "GET",
      url: "/users"
    };

    return server.inject(getUsers)
      .then(response => {
        Code.expect(response.statusCode).to.equal(200);
        Code.expect(response.result.count).to.equal(0);
        Code.expect(response.result.result.length).to.equal(0);
      });
  });

  lab.test('POST /users should add new user', () => {
    let postUserRequest = {
      method: "POST",
      url: "/users",
      payload: {
        username: "Greg",
        password: "1234",
        email: "greg@test.com"
      }
    };

    return server.inject(postUserRequest)
      .then(response => {
        Code.expect(response.statusCode).to.equal(200);
        Code.expect(response.result.result).to.contains(postUserRequest.payload);
      });
  });

  lab.test('GET /users should return 1 user', () => {
    let postUserRequest = {
      method: "POST",
      url: "/users",
      payload: {
        username: "Greg",
        password: "1234",
        email: "greg@test.com"
      }
    };
    let getUsersRequest = {
      method: "GET",
      url: "/users"
    };

    return server.inject(postUserRequest)
      .then(response => {
        Code.expect(response.statusCode).to.equal(200);
        Code.expect(response.result.result).to.contains(postUserRequest.payload);
        return server.inject(getUsersRequest)
      })
      .then(response => {
        Code.expect(response.statusCode).to.equal(200);
        Code.expect(response.result.count).to.equal(1);
        Code.expect(response.result.result[0]).to.contains(postUserRequest.payload);
      });
  });


  lab.test('GET /users/:userId should return user', () => {
    let postUserRequest = {
      method: "POST",
      url: "/users",
      payload: {
        username: "Greg",
        password: "1234",
        email: "greg@test.com"
      }
    };

    return server.inject(postUserRequest)
      .then(response => {
        Code.expect(response.statusCode).to.equal(200);
        Code.expect(response.result.result).to.contains(postUserRequest.payload);

        let getUserRequest = {
          method: "GET",
          url: `/users/${response.result.result._id}`
        };
        return server.inject(getUserRequest)
      })
      .then(response => {
        Code.expect(response.statusCode).to.equal(200);
        Code.expect(response.result.result).to.contains(postUserRequest.payload);
      });
  });

  lab.test('PUT /users/:userId should update user', () => {
    let postUserRequest = {
      method: "POST",
      url: "/users",
      payload: {
        username: "Greg",
        password: "1234",
        email: "greg@test.com"
      }
    };
    let updateUserRequest;

    return server.inject(postUserRequest)
      .then(response => {
        Code.expect(response.statusCode).to.equal(200);
        Code.expect(response.result.result).to.contains(postUserRequest.payload);

        updateUserRequest = {
          method: "PUT",
          url: `/users/${response.result.result._id}`,
          payload: {
            username: 'Greg2'
          }
        };
        return server.inject(updateUserRequest)
      })
      .then(response => {
        Code.expect(response.statusCode).to.equal(200);
        Code.expect(response.result.result.username).to.equal(updateUserRequest.payload.username);
      });
  });

  lab.test('DELETE /users/:userId should remove user', () => {
    let postUserRequest = {
      method: "POST",
      url: "/users",
      payload: {
        username: "Greg",
        password: "1234",
        email: "greg@test.com"
      }
    };

    return server.inject(postUserRequest)
      .then(response => {
        Code.expect(response.statusCode).to.equal(200);
        Code.expect(response.result.result).to.contains(postUserRequest.payload);

        let deleteUserRequest = {
          method: "DELETE",
          url: `/users/${response.result.result._id}`
        };
        return server.inject(deleteUserRequest)
      })
      .then(response => {
        Code.expect(response.statusCode).to.equal(200);
      });
  });
});