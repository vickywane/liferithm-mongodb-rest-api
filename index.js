const express = require("express");
const mongoose = require("mongoose");
const Activity = require("./model/activity");

const app = express();
const PORT = 5050;

app.get("/activities", async (req, res) => {
  Activity.find({}, (error, documents) => {
    if (error) {
      res.sendStatus(422);
      return console.error(`Could'nt retrieve activities. Error ${error}`);
    }

    res.status(200).send(documents);
  });
});

app.post("/create-activity", async (req, res) => {
  if (req.query.length < 3) {
    res.send("Expected 4 items in request body");
    res.sendStatus(422); //  TODO:  check for a better res code
  }
  const { id, title, description, isCompleted, time } = req.query;

  const Data = new Activity({
    id: id,
    title: title,
    description: description,
    date: Date(),
    isCompleted: isCompleted,
    time: time,
  });

  Data.save((error) => {
    if (error) {
      res.send(422); // TODO: check for a better res code
      return console.error(`An error occured while saving. Error :${error}`);
    }
  });

  res.status(200).send("Activity has been inserted");
});

app.post("/update-activity", async (req, res) => {
  const {
    title,
    newTitle,
    newDescription,
    newTime,
    newIsCompleted,
  } = req.query;

  if (title === undefined || "") {
    return res
      .status(422)
      .send("title of acitvity to be updated hasnt been specified");
  }

  const activites = await Activity.updateOne(
    { title: title },
    {
      title: newTitle,
      description: newDescription,
      time: newTitle,
      isCompleted: newIsCompleted,
      time: newTime,
    },
    (err) => {
      if (err) {
        return res.status(422).send(`couldnt update your activity ${err}`);
      }
    }
  );

  //code to update the gotten activity

  res.status(200).send(activites);
  res.sendStatus(200);
});

app.post("/delete-activity", async (req, res) => {
  const { title } = req.query;

  if (title === undefined || "") {
    return res
      .status(422)
      .send("title of acitvity to be deleted hasnt been specified");
  }

  await Activity.deleteMany({ title: title }, (err) => {
    return res.status(422).send("activity couldnt be deleted");
  });

  res.status(200).send("delete supposed activity");
  res.sendStatus(200);
});

app.post("/delete-activities", async (req, res) => {
  // Todo: check for how to delete all
  const activities = await Activity.delete();

  res.status(200).send("delete supposed activity");
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.status(422).send("You havent specified an endpoint");
});

mongoose
  .connect("mongodb://localhost:27017/liferithm", { useNewUrlParser: true })
  .then(() => {
    console.log("-> conected to mongodb");
    app.listen(PORT, (error) => {
      if (error) {
        console.error(`-> couldnt start server at port ${PORT}`);
      }

      console.log(`-> server started on port ${PORT}`);
    });
  })
  .catch((e) =>
    console.error(`->  could'nt connect to mongoogse \n Error : ${e}`)
  );
