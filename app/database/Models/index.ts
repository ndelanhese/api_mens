import { Options, Sequelize } from 'sequelize';

import config from '../config/config';

import 'dotenv/config';

const env = process.env.NODE_ENV || 'development';

// connection
const conn = config[env];

const sequelize = new Sequelize(conn as Options);

export { Sequelize, sequelize };
