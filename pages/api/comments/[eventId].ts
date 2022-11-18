import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {eventId: eId} = req.query;
  console.log("event id: ", eId)
  const dbclient = await MongoClient.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_DATABASE}.pf4uebr.mongodb.net/?retryWrites=true&w=majority`);
  if (req.method === 'GET') {


    if (!dbclient) {
      console.error("Couldn't connect to MongoDB!");
      return;
    }

    console.log("Successfully connected to the Mongo Database")

    const dbResponse = await dbclient.db().collection('comments').find({eventId: eId}).sort({_id: -1}).toArray();  

    res.status(200).json(dbResponse);
    
  } else if (req.method === 'POST' && req.body) {
    const title: string = req.body.title;
    const date: string = new Date().toLocaleDateString();
    const author: string = req.body.author;
    const text: string = req.body.text;
    const eventId: string = req.body.eventId;

    // validation here for email

    console.log("Successfully connected to the Mongo Database")

    const dbResponse = await dbclient.db().collection('comments').insertOne({title, date, author, text, eventId})

    
    if (title && author && text) {
      res.status(201).json(dbResponse);
    }
  }
  dbclient.close();
}

export default handler;