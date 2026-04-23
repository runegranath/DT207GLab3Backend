/*
Webbtjänst med MongoDB och Express
*/

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//Init Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

//Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/lab3")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });

// Jobb-Schema med validering, fiktion är per default false 
const jobSchema = new mongoose.Schema({
  companyname: { type: String, required: true },
  jobtitle: { type: String, required: [true, "Jobbtitel saknas"] },
  location: { type: String, required: [true, "Plats saknas"] },
  fictive: { type: Boolean, required: [true, "Fiktionsstatus saknas" ], default: false },
});

const Job = mongoose.model("Job", jobSchema);

// -- ROUTES --
app.get("/jobs", (req, res) => {
  Job.find()
    .then((jobs) => {
      res.json(jobs);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error fetching jobs" });
    });
});

app.get("/jobs/", async (req, res) => {
  try {
    let result = await Job.find({});

    return res.json(result);
  } catch (error) {
    return res.status(500).json(error); // klientfel mest troligt
  }
});

app.post("/jobs", async (req, res) => {
  try {
    let result = await Job.create(req.body);

    return res.json(result);
  } catch (error) {
    return res.status(400).json(error); // klientdatafel
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ` + port);
});
