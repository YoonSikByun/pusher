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

const notify_list = ['tmp_notify', 'dag_insert_notify', 'dag_update_notify'];

export function initPsqlNotify() {
    client.connect();

    console.log('Subscribe notify ====================');
    for(const index in notify_list) {
        console.log(`LISTEN ${notify_list[index]}`);
        client.query(`LISTEN ${notify_list[index]}`);
    }

    console.log('Postgres listen =====================');
    client.on('notification', async(data) => {
        const payload = JSON.parse(data.payload);
        switch(data.channel) {
            case 'dag_insert_notify':
            case 'dag_update_notify':
                return;
        }
        console.log(`channel : ${data.channel}, processId : ${data.processId}, name : ${data.name}`);
        console.log('payload : \n', payload);
    });
}