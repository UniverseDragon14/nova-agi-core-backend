import fs from 'fs';
import path from 'path';

const logFile = path.resolve('src/data/nova.log');

export function logEvent(event, payload = {}) {
  fs.mkdirSync(path.dirname(logFile), { recursive: true });
  const line = JSON.stringify({ timestamp: new Date().toISOString(), event, payload });
  fs.appendFileSync(logFile, line + '\n');
}
