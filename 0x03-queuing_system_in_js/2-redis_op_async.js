import { createClient } from 'redis';
import { promisify } from 'util';

const client = createClient();

client.on('error', (err) => console.log(`Redis client not connected to the server: ${err}`));
client.on('connect', () => console.log('Redis client connected to the server'));

function setNewSchool(schoolName, value) {
  client.SET(schoolName, value, print);
}

const get = promisify(client.get).bind(client);
async function displaySchoolValue(schoolName) {
  const res = await client.get(schoolName).catch((err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
  console.log(res);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
