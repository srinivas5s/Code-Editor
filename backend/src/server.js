import app from './app.js';
import config from './config/index.js';
import { connectDB } from './config/db.js';

async function startServer() {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`Server running in ${config.env} mode on port ${config.port}`);
  });
}

startServer();