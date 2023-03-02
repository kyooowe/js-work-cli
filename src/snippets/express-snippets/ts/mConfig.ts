//#region Import
import mongoose, { ConnectOptions } from 'mongoose';
//#endregion

//#region Config

// Exit application when error occurs
mongoose.connection.on('error', () => {
    // TODO: Logger Here
    process.exit(-1)
})

export const Connect = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_DB}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true
        } as ConnectOptions);

        console.log('MongoDB Connected')
    } catch (err) {
        console.log('Failed to connect to MongoDB', err)
    }

}
//#endregion