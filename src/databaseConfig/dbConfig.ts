import knexfile from '../../knexfile';
import knex from 'knex';
import knexConfig from './../../knexfile';

export default knex(knexConfig.development);
