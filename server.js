/******************************************************************************** * WEB422 – Assignment 1 
*  
* I declare that this assignment is my own work in accordance with Seneca's 
* Academic Integrity Policy: 
*  
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html 
*  
* Name: SIMRANDEEP KAUR Student ID: 164067233 Date: 27 MAY 2025 * 
* Published URL: ___________________________________________________________ * 
********************************************************************************/ 


const express = require("express");
const cors = require("cors");
require("dotenv").config();
const ListingsDB = require("./modules/listingsDB.js");
const db = new ListingsDB();
const app = express();
const HTTP_PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "API Listening" });
});
//POST /api/listings 
app.post("/api/listings", async (req, res) => 
    {
    try 
        {
         const listing = await db.addNewListing(req.body);
         res.status(201).json(listing);
     } 
     catch (err)
  {
    res.status(500).json({ error: err.message });
  }
});
//GET /api/listings 
app.get("/api/listings", async (req, res) => 
{
   const { page, perPage, name } = req.query;
   try {
    const listings = await db.getAllListings(page, perPage, name);
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET /api/listings/(_id value) 
app.get("/api/listings/:id", async (req, res) => 
{
  try 
    {
     const listing = await db.getListingById(req.params.id);
     if (!listing) return res.status(404).json({ message: "Listing not found" });
     res.json(listing);
    } 
    catch (err) 
    {
    res.status(500).json({ error: err.message });
    }
});
// PUT /api/listings/(_id value) 
app.put("/api/listings/:id", async (req, res) => 
{
  try {
     await db.updateListingById(req.body, req.params.id);
     res.status(204).send();
   } catch (err) {
     res.status(500).json({ error: err.message });
   }
});
//DELETE /api/listings/(_id value) 
app.delete("/api/listings/:id", async (req, res) => {
  try {
    await db.deleteListingById(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


db.initialize(process.env.MONGODB_CONN_STRING)
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
