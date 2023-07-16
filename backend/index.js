const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 9000;

app.use(express.json());
app.use(cors());

app.put("/", async (request, response) => {
  const update = request.body;
  console.log(update);
  fs.writeFile("tasks.json", JSON.stringify(update), (e) => {
    if (e) {
      console.log(e);
    }
  });
});

// اخد من السيرفر
app.get("/", async (request, response) => {
  let data = fs.readFileSync("tasks.json").toString();
  let taskss = JSON.parse(data);
  response.json({ output: taskss });
});


// ارسل للسيرفر
app.post("/", async (request, response) => {
  const tasks = request.body;
  console.log(tasks);

  fs.writeFile("tasks.json", JSON.stringify(tasks), (e) => {
    if (e) {
      console.log(e);
    }
  });

  response.json({data});
});

app.delete("/", async (request, response) => {
  const update = request.body;
  console.log(update);
  fs.writeFile("tasks.json",JSON.stringify(update), (e) => {
    if (e) {
      console.log(e);
    
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
