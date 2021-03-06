/* istanbul ignore file */

import mongoose from 'mongoose';
import config from '../config';

const uri = `mongodb://${config.database.host}:${config.database.port}`;

export async function dbConnection(
  url = uri,
  opts = config.databaseOptions
): Promise<mongoose.Mongoose | undefined> {
  const connectionOptions: mongoose.ConnectionOptions = {
    ...opts,
    user: config.database.user,
    pass: config.database.pass,
    dbName: config.database.dbName
  };

  try {
    if (config.env !== 'test' && config.env !== 'testing') {
      return await mongoose.connect(url, connectionOptions);
    }
  } catch (err) {
    console.log('There was an error connecting to the DataBase');
    throw err;
    // Exit the application?
  }
}
