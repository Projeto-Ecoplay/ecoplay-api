const { Sequelize } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL;

function useSsl() {
  if (process.env.DATABASE_SSL === 'false') {
    return false;
  }
  if (process.env.DATABASE_SSL === 'true') {
    return true;
  }
  if (databaseUrl && /supabase\.(co|com)/i.test(databaseUrl)) {
    return true;
  }
  return process.env.NODE_ENV === 'production';
}

function createSequelize() {
  if (!databaseUrl) {
    return null;
  }

  const ssl = useSsl();

  return new Sequelize(databaseUrl, {
    dialect: 'postgres',
    dialectOptions: ssl
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
    logging: process.env.SEQUELIZE_LOGGING === 'true' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
}

const sequelize = createSequelize();

module.exports = { sequelize, createSequelize };
