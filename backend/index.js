/*
Dependencies
*/

const express = require("express");
var admin = require("firebase-admin");
let inspect = require("util").inspect;
const busboy = require("busboy");

/*
Config-express
*/
const app = express();

/*
Config-firebase
*/
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

/*
Endpoint - posts
*/
app.get("/posts", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  let posts = [];
  loadingPosts: false;
  db.collection("posts")
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      response.send(posts);
    });
});

/*
Endpoint - createPosts
*/
app.post("/createPost", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  const bb = busboy({ headers: request.headers });

  let fields = {};
  bb.on("file", (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );
    file
      .on("data", (data) => {
        console.log(`File [${name}] got ${data.length} bytes`);
      })
      .on("close", () => {
        console.log(`File [${name}] done`);
      });
  });
  bb.on("field", (name, val, info) => {
    console.log(`Field [${name}]: value: %j`, val);

    fields[name] = val;
  });
  bb.on("close", () => {
    console.log("fields: ", fields);
    console.log("Done parsing form!");
    //response.writeHead(303, { Connection: "close", Location: "/" });
    response.send("Done parsing form!");
  });
  request.pipe(bb);
});

/*
Listen
*/

app.listen(process.env.PORT || 3000);
