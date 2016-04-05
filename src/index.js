const Server = require('./server');
const config = require('./config');
const DB = require('./db');

return DB.connectDB(config)
  .then(dbConn => {
    console.log('MongoDB connected at:', config.dbUrl);
    return new Server(dbConn, config).start()
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

