// UNCUGHT-EXCEPTION

process.on('uncaughtException', (err) => {
  console.log('Unhandle exception, Server shutting down 💥');

  console.log(err.name, err.message);
  process.exit(1);
});

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose.connect(DB).then(() => console.log('DB connection successfull ✅'));

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} 🛜`);
});

// UNHANDLED-REJCTED PROMISESS

process.on('unhandledRejection', (err) => {
  console.log('Unhandle rejection, Server shutting down 💥');

  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
