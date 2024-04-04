import {Client} from 'pg';
const config = {
    user: 'postgres',
    password: 'postgres',
    host: '127.0.0.1',
    db: 'postgres',
    table: 'dag'
};

const client = new Client({
    host: 'localhost',
    port: 30000,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres',
});

export function initPsqlNotify() {
    client.connect();

    client.query('LISTEN tmp_notify');
    client.query('LISTEN dag_insert_notify');
    client.query('LISTEN dag_update_notify');
    
    console.log('============= psql listen ================');
    client.on('notification', async(data) => {
        const payload = JSON.parse(data.payload);
        console.log(`channel : ${data.channel}, processId : ${data.processId}, name : ${data.name}`);
        console.log('payload : \n', payload);
    });
}