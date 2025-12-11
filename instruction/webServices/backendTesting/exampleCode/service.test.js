const request = require('supertest');
const app = require('./service');

function getRandomName(prefix) {
  return `${prefix}_${Math.random().toString(36).substring(2, 15)}`;
}

async function registerUser() {
  const email = getRandomName('email');
  const password = 'toomanysecrets';
  const response = await request(app).post('/api/auth').send({ email, password });

  return [response, email, password];
}

function validateAuth(response) {
  expect(response).toBeDefined();
  expect(response.status).toBe(200);
  const cookie = response.headers['set-cookie'];
  expect(cookie).toBeDefined();
  const uuidRegex = /^token=[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}.*$/i;
  const token = cookie.find((c) => c.match(uuidRegex));
  expect(token).toBeDefined();
}

test('register', async () => {
  const [register, email] = await registerUser();
  validateAuth(register);

  expect(register.headers['content-type']).toMatch('application/json; charset=utf-8');
  expect(register.body).toMatchObject({ email });
});

test('register existing', async () => {
  const [, email, password] = await registerUser();

  const response = await request(app).post('/api/auth').send({ email, password });
  expect(response.status).toBe(409);
});

test('login', async () => {
  const [, email, password] = await registerUser();

  const login = await request(app).put('/api/auth').send({ email, password });
  validateAuth(login);

  expect(login.headers['content-type']).toMatch('application/json; charset=utf-8');
  expect(login.body).toMatchObject({ email });
});

test('login bad password', async () => {
  const [, email] = await registerUser();

  const login = await request(app).put('/api/auth').send({ email, password: 'wrong' });
  expect(login.status).toBe(401);
});

test('logout', async () => {
  const [register] = await registerUser();

  const cookie = register.headers['set-cookie'];
  const logout = await request(app).delete('/api/auth').set('Cookie', cookie);
  expect(logout.status).toBe(200);

  const getMe = await request(app).get('/api/user/me').set('Cookie', cookie);
  expect(getMe.status).toBe(401);
});

test('get me', async () => {
  const [register, email] = await registerUser();

  const cookie = register.headers['set-cookie'];
  const getMe = await request(app).get('/api/user/me').set('Cookie', cookie);
  expect(getMe.status).toBe(200);
  expect(getMe.headers['content-type']).toMatch('application/json; charset=utf-8');
  expect(getMe.body).toMatchObject({ email });
});

test('get me no auth', async () => {
  const getMe = await request(app).get('/api/user/me');
  expect(getMe.status).toBe(401);
  expect(getMe.headers['content-type']).toMatch('application/json; charset=utf-8');
  expect(getMe.body).toMatchObject({ msg: 'Unauthorized' });
});
