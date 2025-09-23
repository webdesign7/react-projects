import MeetupList from '../components/meetups/MeetupList';
import {MongoClient} from "mongodb";

function HomePage(props) {
    return <MeetupList meetups={props.meetups}  />
}

export async function getStaticProps() {

    const uri = "mongodb+srv://sergiu:Mazda626!!@demodb.gexzt.mongodb.net/?retryWrites=true&w=majority&appName=DemoDB";

    const client = await MongoClient.connect(uri);

    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await  meetupsCollection.find().toArray();

    await client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                id: meetup._id.toString(),
                title: meetup.title,
                address: meetup.address,
                description: meetup.description,
                image: meetup.image,
            }))
        }
    }
}

export default HomePage;