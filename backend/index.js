/*
Dependencies
*/

const express = require("express");

/*
Config-express
*/
const app = express();

/*
Endpoint - posts
*/
app.get("/posts", (request, response) => {
  let posts = [
    {
      caption: "Golden Gate Bridge",
      location: "Maputo, Mozambique",
    },
    {
      caption: "London Eye",
      location: "London",
    },
  ];
  response.send(posts);
});

/*
Listen
*/

app.listen(process.env.PORT || 3000);
