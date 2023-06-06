import {
  insertDocument,
  connectDatabase,
  getAllDocuments,
} from "../../../helpers/db-util";

//  /comments.some-event-id
async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed" });
  }

  if (req.method === "POST") {
    // add server-side validation
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      client.close();
    }

    const newComment = { email, name, text, eventId };

    let result;
    try {
      result = await insertDocument(client, "comments", newComment);

      newComment._id = result.insertedId;

      res.status(201).json({ message: "Added comment", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed" });
    }

    // const db = client.db();
    // const result = await db.collection("comments").insertOne(newComment);
  }

  if (req.method === "GET") {
    // const db = client.db();

    // const documents = await db
    //   .collection("comments")
    //   .find()
    //   .sort({ _id: -1 }) //descending order - latest comment is the first comment
    //   .toArray();

    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed" });
    }
  }

  client.close();
}

export default handler;
