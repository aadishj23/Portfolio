import mongoose from 'mongoose';

// Cache the connection across hot reloads in dev and across invocations in
// serverless environments, so we don't open a new pool on every request.
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global._mongoose ?? { conn: null, promise: null };
global._mongoose = cached;

export const connectDB = async (): Promise<typeof mongoose> => {
  if (cached.conn) return cached.conn;

  const mongoURI = process.env.DATABASE_URL;
  if (!mongoURI) {
    throw new Error('DATABASE_URL is not defined in environment variables');
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoURI).then((m) => {
      console.log('MongoDB connected successfully');
      return m;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
