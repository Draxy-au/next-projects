import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

const DUMMY_RESPONSE = [
  {
    "title": "First Comment",
    "date": "15/11/2022",
    "author": "Frank Walker",
    "text": "This is my first comment. How awesome!",
    "eventId": "e2"
  },
  {
    "title": "Second Comment",
    "date": "16/11/2022",
    "author": "Harley Chuckles",
    "text": "I think I mis-read the description lol",
    "eventId": "e2"
  },
  {
    "title": "Third Comment",
    "date": "16/11/2022",
    "author": "Kit Kat",
    "text": "I did as well!",
    "eventId": "e2"
  },
  {
    "title": "Fourth Comment",
    "date": "17/11/2022",
    "author": "Sally Pall",
    "text": "I like trains!",
    "eventId": "e1"
  },
  {
    "title": "Fifth Comment",
    "date": "17/11/2022",
    "author": "Paul Rand",
    "text": "I like busses!",
    "eventId": "e3"
  },
]

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dbclient = await MongoClient.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_DATABASE}.pf4uebr.mongodb.net/?retryWrites=true&w=majority`);
  if (req.method === 'GET') {


    if (!dbclient) {
      console.error("Couldn't connect to MongoDB!");
      return;
    }

    console.log("Successfully connected to the Mongo Database")

    const dbResponse = await dbclient.db().collection('comments').find({}).sort({_id: -1}).toArray();  

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