import mongooes from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
    mongooes.set('strictQuery', true)

    if(isConnected) {
        console.log('MongoDB is already  connect')
        return;
    }

    try {
        await mongooes.connect(process.env.MONGODB_URI||'', {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as any)

        isConnected= true;

        console.log('MongoDB connected')

    } catch (error) {
        console.log(error)
        
    }
}