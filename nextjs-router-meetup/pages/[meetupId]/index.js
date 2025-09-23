import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectId } from "mongodb";
import {Fragment} from "react";
import Head from "next/head";

export default function MeetupDetails (props) {
  return (
      <Fragment>
        <Head>
          <title>{props.meetupData.title}</title>
          <meta name="description" content={props.meetupData.description} />
        </Head>
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
      </Fragment>

  )
}

export async function getStaticPaths() {

  const uri = "mongodb+srv://sergiu:Mazda626!!@demodb.gexzt.mongodb.net/?retryWrites=true&w=majority&appName=DemoDB";

  const client = await MongoClient.connect(uri);

  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, { projection: { _id: 1 } }).toArray();

  await client.close();

  return {
    paths: meetups.map(meetup => ({
      params: {
        meetupId: meetup._id.toString()
      }
    })),
    fallback: false
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const uri = "mongodb+srv://sergiu:Mazda626!!@demodb.gexzt.mongodb.net/?retryWrites=true&w=majority&appName=DemoDB";

  const client = await MongoClient.connect(uri);

  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetup = await meetupsCollection.findOne({_id: new ObjectId(meetupId)});

  await client.close();

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
        image: meetup.image,
      }
    }
  }
} {}