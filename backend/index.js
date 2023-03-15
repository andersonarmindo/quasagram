/*
Dependencies
*/

const express = require("express");
const admin = require("firebase-admin");

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
  setTimeout;
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
    });

  response.send(posts);
});

/*
Listen
*/

app.listen(process.env.PORT || 3000);
