import * as dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = dotenv.config();
if (!env) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  server: {
    port: process.env.PORT || 5000,
    botName: process.env.APP_ADMIN_NAME || 'Admin'
  }, 
  client: {
    url: process.env.CLIENT_URL || 'http://localhost:3000'
  }
}