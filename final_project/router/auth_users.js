const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
    {
        "username": "Paula",
        "password": "paulapassword"
    }
];

  const isValid = (username)=>{
    let userwithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userwithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

const authenticatedUser = (username,password)=>{
    let validusers= users.filter((user) =>{
        return (user.username === username && user.password === password);
    });

    if(validusers.length > 0){
        return true;
    }else{
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    const username = req.body.username;
  const password = req.body.password;

  if(!username || !password){
      return res.status(404).json({message: "Please complete all fields (username,pass)"});
  }

  if(authenticatedUser(username,password)){
      let accessToken= jwt.sign({
          data: password
      }, 'access', {expiresIn: 60*60});

      req.session.authorization = {
          accessToken,username
      }
      return res.status(200).send("User Logged in!!");
  } else{
      return res.status(208).json({message:"Invalid Login: check pass and username"});
  }

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
