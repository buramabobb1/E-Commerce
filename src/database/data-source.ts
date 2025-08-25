import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  database: 'ecommercedb',
  password: 'postgres1',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
});
