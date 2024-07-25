import { envs } from 'src/config';
import { DataSource } from 'typeorm';

export default new DataSource({
    type:'postgres',
    host:envs.pgHost,
    port:envs.pgPort,
    username: envs.pgUser,
    password: envs.pgPass,
    database: envs.pgDatabase,
    entities:['src/**/*.entity.ts'],
    migrations:['src/database/migrations/*.ts']
})