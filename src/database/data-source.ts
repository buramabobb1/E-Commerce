import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm/browser';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATASOURCE_URL,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/databsee/migrations/*.js'],
  migrationsTableName: 'migrations_typeorm', // //npm migration:generate  src/database/migration/create-user
  synchronize: true,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
