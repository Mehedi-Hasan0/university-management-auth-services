import mongoose from 'mongoose'
import app from './app'
import config from './config'
import logger from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.normalLogger.info('Database is connected successfully')

    app.listen(config.port, () => {
      logger.normalLogger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    logger.errorLogger.error(error)
  }
}

main()
