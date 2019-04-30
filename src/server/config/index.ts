import merge from 'lodash.merge';
import devConfig from './development.js';
import prodConfig from './production.js';
import testConfig from './test.js';
import { GlobalConfig, EnvironnementConfig, ServerConfig } from './config.js';

/**
 * Config values common across all environments environments
 *
 * Application configuration belongs in this file and associated
 * environment files. The appropriate environment file is merged based on the
 * NODE_ENV variable: development, production, and test.
 *
 */
const config: GlobalConfig = {
  /**
   * The port the server will listen on
   */
  port:
    process.env.PORT && !Number.isNaN(parseInt(process.env.PORT, 10))
      ? parseInt(process.env.PORT, 10)
      : 3000,

  /**
   * Global database options for sequelize
   */
  databaseOptions: {
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    quoteIdentifiers: false,
    /**
     * Default options for each model definition
     */
    define: {
      underscored: true,
      /**
       * Exclude created_at and updated_at fields by default
       */
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
    }
  }
};

/**
 * Assign values based on current execution environment
 */
let environmentSettings: EnvironnementConfig;
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    environmentSettings = prodConfig;
    break;
  case 'test':
  case 'testing':
    environmentSettings = testConfig;
    break;
  case 'development':
  case 'dev':
    environmentSettings = devConfig;
    break;
  default:
    environmentSettings = prodConfig;
    break;
}

/**
 * Merge overrides the global settings with the appropriate environment settings
 */
merge(config, environmentSettings);

export default config as ServerConfig;
