import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import { fileURLToPath, pathToFileURL } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const configPath = path.join(__dirname, '../config/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Load and register all model files dynamically
const modelFiles = fs
  .readdirSync(__dirname)
  .filter(file =>
    file.endsWith('.js') &&
    file !== basename &&
    !file.endsWith('.test.js')
  );

for (const file of modelFiles) {
  const fullPath = path.join(__dirname, file);
  const fileUrl = pathToFileURL(fullPath).href;

  const modelModule = await import(fileUrl);

  if (typeof modelModule.default !== 'function') {
    console.warn(`Skipping ${file}: default export is not a function`);
    continue;
  }

  const model = modelModule.default(sequelize, DataTypes);
  db[model.name] = model;
}

// Set up associations if defined
Object.keys(db).forEach(modelName => {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;