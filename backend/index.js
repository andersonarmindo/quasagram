/*
Dependencies
*/

const express = require("express");
var admin = require("firebase-admin");
let inspect = require("util").inspect;
const Busboy = require("busboy");

/*
Config-express
*/
const app = express();

/*
Config-firebase
*/
const serviceAccount = require("./serviceAccountKey.json");
let busboy = require("busboy");

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
  const busboy = busboy({ headers: request.headers });
  busboy.on("file", (name, file, info) => {
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
  busboy.on("field", (name, val, info) => {
    console.log(`Field [${name}]: value: %j`, val);
  });
  busboy.on("close", () => {
    console.log("Done parsing form!");
    //response.writeHead(303, { Connection: "close", Location: "/" });
    response.send("Done parsing Form!");
  });
  request.pipe(busboy);
});

/*
Listen
*/

app.listen(process.env.PORT || 3000);
