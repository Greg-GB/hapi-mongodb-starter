const server = require('./src/server');
const config = require('./src/config/index');
const DB = require('./src/db/index');

return DB.connectDB(config)
  .then(db => {
    config.db = db;
    return server(config);
  })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  });

