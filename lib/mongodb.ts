import mongoose from 'mongoose';

declare global {
    var mongoose: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    };
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://your-connection-string';

if (!MONGODB_URI) {
    throw new Error('MongoDB URI tanımlanmamış');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB; 