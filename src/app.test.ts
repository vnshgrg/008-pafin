import omit from 'lodash.omit';
import pick from 'lodash.pick';
import supertest from 'supertest';

import app, { server } from './app';
import { createDbClient } from './utils';

const mockUserData = {
  name: 'Avinash Ghale',
  email: 'ghale.avinash@gmail.com',
  password: '123456',
};

afterAll(async () => {
  await createDbClient().user.delete({ where: { email: mockUserData.email } });
  await server.close();
});

describe('Express app', () => {
  describe('Routing', () => {
    it('should return `Hello` when GET hello', async () => {
      const response = await supertest(app).get('/hello');

      expect(response.statusCode).toEqual(200);
      expect(response.body.result).toEqual(true);
    });

    it('should return `NOT FOUND` when GET a not found route', async () => {
      const response = await supertest(app).get('/random-page');
      expect(response.statusCode).toEqual(404);
      expect(response.body.error).toEqual('NOT FOUND');
    });
  });

  describe('Registration', () => {
    it('should register user', async () => {
      const response = await supertest(app)
        .post('/user')
        .send(mockUserData)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(201);
      expect(response.body.result).toEqual(true);
    });

    it('should return error when existing email is registered', async () => {
      const response = await supertest(app)
        .post('/user')
        .send(mockUserData)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(400);
      expect(response.body.result).toEqual(false);
      expect(response.body.message).toEqual('Email already registered');
    });

    it('should return error when email is not in correct format', async () => {
      const response = await supertest(app)
        .post('/user')
        .send({ ...mockUserData, email: 'mail.com' })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(400);
      expect(response.body.result).toEqual(false);
      expect(response.body.errors[0].code).toEqual('invalid_string');
      expect(response.body.errors[0].path).toEqual('body.email');
      expect(response.body.errors[0].message).toEqual('Invalid email');
    });
  });

  describe('Login', () => {
    it('should be able to login', async () => {
      const response = await supertest(app)
        .post('/user/login')
        .send(omit(mockUserData, ['name']))
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(200);
      expect(response.body.result).toEqual(true);
      expect(typeof response.body.token).toBe('string');
    });

    it('should return error when email is incorrect', async () => {
      const response = await supertest(app)
        .post('/user/login')
        .send({
          ...pick(mockUserData, ['password']),
          email: 'mail@mail.com',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(400);
      expect(response.body.result).toEqual(false);
      expect(response.body.message).toBe('Incorrect email or password');
    });

    it('should return error when email is in wrong format', async () => {
      const response = await supertest(app)
        .post('/user/login')
        .send({
          ...pick(mockUserData, ['password']),
          email: 'mailmail.com',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(400);
      expect(response.body.result).toEqual(false);
      expect(response.body.errors[0].code).toEqual('invalid_string');
      expect(response.body.errors[0].path).toEqual('body.email');
      expect(response.body.errors[0].message).toEqual('Invalid email');
    });

    it('should return error when password is incorrect', async () => {
      const response = await supertest(app)
        .post('/user/login')
        .send({ ...pick(mockUserData, ['email']), password: 'abcdef' })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(400);
      expect(response.body.result).toEqual(false);
      expect(response.body.message).toBe('Incorrect email or password');
    });
  });
});
