// import bcrypt from 'bcrypt';
console.log("testing");
const bcrypt = require('bcrypt');
const salt = 10;

const text = "kevin";

const password = bcrypt.hashSync(text, salt);


console.log(password);
