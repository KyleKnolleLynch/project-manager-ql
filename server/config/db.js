import mongoose from 'mongoose'
import chalk from 'chalk'


const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI)

  console.log(
    chalk.bgCyanBright.bold(`MongoDB connected: ${connect.connection.host}`)
  )
}

export default connectDB
