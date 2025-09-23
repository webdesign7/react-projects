import {MongoClient} from "mongodb";

async function handler(req, res) {

    const uri = "mongodb+srv://sergiu:Mazda626!!@demodb.gexzt.mongodb.net/?retryWrites=true&w=majority&appName=DemoDB";

    if (req.method !== 'POST') {
        const data = req.body;
        const {title, image, address, description} = data;
    }

    const client = await MongoClient.connect(uri);

    const db = client.db();
    const meetups = db.collection('meetups');
    const result = await meetups.insertOne(req.body);

    //res.status(200).json(result);

    await client.close();

    res.status(200).json({message: 'New Meetup Added'})

}
export default handler;