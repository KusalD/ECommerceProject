
const { MongoClient } = require("mongodb");


class AuthService{
    db;
    constructor() {
        this.connect()
    }

    async connect(){
        const connect = await MongoClient.connect(process.env.MONGODB_URL)
        this.db = connect.db(process.env.MONGODB_NAME)
    } 

    async storeUser(data) {
        try {
            let response = await this.db.collection('users').insertOne(data);
            return response;
        } catch(exception) {
            throw exception
        }
    }
}

const authSvc = new AuthService();
module.exports = authSvc