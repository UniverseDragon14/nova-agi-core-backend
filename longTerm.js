import fs from 'fs';
import path from 'path';

const DB_FILE = path.resolve('src/data/memoryStore.json');

function ensureDb() {
  fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
  }
}

export function saveLongTerm(entry) {
  ensureDb();
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  data.push({ id: Date.now(), timestamp: new Date().toISOString(), ...entry });
  fs.writeFileSync(DB_FILE, JSON.stringify(data.slice(-200), null, 2));
}

export function readLongTerm() {
  ensureDb();
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}
