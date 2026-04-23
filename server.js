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

// Jobb-Schema med inbyggd validering, fiktion är per default false
const jobSchema = new mongoose.Schema({
  companyname: { type: String, required: true },
  jobtitle: { type: String, required: [true, "Jobbtitel saknas"] },
  location: { type: String, required: [true, "Plats saknas"] },
  fictive: {
    type: Boolean,
    required: [true, "Fiktionsstatus saknas"],
    default: false,
  },
});

const Job = mongoose.model("Job", jobSchema); // Skapa modell baserat på schema

// -- ROUTES --
app.get("/jobs/", async (req, res) => {
  try {
    let result = await Job.find({}); // Hitta alla jobb i kollektionen

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

// Hämta ett specifikt jobb med ID
app.get("/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Jobbet hittades inte" }); // Om inget jobb hittas returnera 404 Not Found och meddelande
    }

    return res.json(job);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Uppdatera ett jobb
app.put("/jobs/:id", async (req, res) => {
  try {
    // Uppdatera jobb med id och data från request body
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Returnera det uppdaterade dokumentet istället för det gamla
    });

    if (!job) {
      return res.status(404).json({ message: "Jobbet hittades inte" });
    }

    return res.json(job);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// Deleterutt
app.delete("/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Jobbet hittades inte" });
    }

    return res.json({ message: "Jobbet raderat" });
  } catch (error) {
    return res.status(500).json(error); // 500 Internal Server Error
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ` + port);
});
