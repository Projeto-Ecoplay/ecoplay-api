const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '..', '.env.test') });

process.env.NODE_ENV = 'test';
process.env.TZ = process.env.TZ || 'UTC';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'ecoplay-test-secret';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
process.env.BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || '4';
process.env.TEST_DATABASE_STORAGE = process.env.TEST_DATABASE_STORAGE || ':memory:';

jest.setTimeout(30000);
