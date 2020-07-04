const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

async function hash(input) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(input, salt);

    console.log(passwordHash);
}

hash('123123');