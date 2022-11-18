import { MongoClient } from 'mongodb';

import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).send("Newsletter")
    
  } else if (req.method === 'POST' && req.body) {
    const userEmail = await req.body.email;
    
    // validation here for email

    const dbclient = await MongoClient.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_DATABASE}.pf4uebr.mongodb.net/?retryWrites=true&w=majority`);

    if (!dbclient) {
      console.error("Couldn't connect to MongoDB!");
      return;
    }

    console.log("Successfully connected to the Mongo Database")

    const dbResponse = await dbclient.db().collection('emails').insertOne({email: userEmail})

    dbclient.close();
    

    if (userEmail) {
      res.status(201).json(dbResponse);
    }
  }
}

export default handler;