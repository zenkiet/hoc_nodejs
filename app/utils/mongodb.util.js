import { MongoClient } from 'mongodb';

class MongoDB {
    static client;

    static async connect(uri) {
        if (this.client) {
            return this.client;
        }
        this.client = await MongoClient.connect(uri, {
            useUnifiedTopology: true, 
            useNewUrlParser: true,
        });
        return this.client;
    }

    static async disconnect() {
        if (!this.client) {
            return;
        }
        await this.client.close();
        this.client = null;
    }

    static async getDatabase(database) {
        if (!this.client) {
            throw new Error('MongoDB client is not connected');
        }
        return this.client.db(database);
    }

    static async getCollection(database, collection) {
        if (!this.client) {
            throw new Error('MongoDB client is not connected');
        }
        return this.client.db(database).collection(collection);
    }
}


export default MongoDB;