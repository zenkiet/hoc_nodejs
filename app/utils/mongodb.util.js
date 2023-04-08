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
}


export default MongoDB;