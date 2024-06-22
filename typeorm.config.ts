import {config} from 'dotenv';
import { DataSource } from 'typeorm';

const env = process.env.NODE_ENV || 'development'

config({path:`.env.${env}`})

export default new DataSource({
    type:'postgres',
    host:process.env.PG_HOST,
    port:parseInt(process.env.PG_PORT),
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DATABASE,
    entities:['src/**/*.entity.ts'],
    migrations:['src/database/migrations/*.ts']
})