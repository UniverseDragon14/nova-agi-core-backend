import readline from 'readline';
import dotenv from 'dotenv';
import { novaBoot } from './novaCore.js';

dotenv.config();

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Enter command for NOVA: ', async (command) => {
  const result = await novaBoot(command, 'UniversalDragon');
  console.log(JSON.stringify(result, null, 2));
  rl.close();
});
