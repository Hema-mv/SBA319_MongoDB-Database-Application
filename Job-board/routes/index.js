//const express = require("express");
import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

//module.exports = router;

export default router;
