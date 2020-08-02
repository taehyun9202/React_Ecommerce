const User = require("../models/Users.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");


class UserController {
  register(req, res) {
    const user = new User(req.body);
    user.save()
      .then( () => {
        res
          .cookie("usertoken", jwt.sign({_id: user._id}, secret) ,user.firstName ,user.lastName, user.email, user.address, user.inCart, user.histroy, {httpOnly: true})
          .json({loggedIn: true, user: user});
      })
      .catch(err => res.json(err)); 
  }

  login(req, res) {
    User.findOne({email: req.body.email})
      .then(user => {
        if(user === null) {
          res.json({msg: "invalid login attempt"});
        } else {
          bcrypt.compare(req.body.password, user.password)
            .then(passwordIsValid => {
              if(passwordIsValid) {
                res
                  .cookie("usertoken", user, {httpOnly: true})
                  .json({loggedIn: true, user: user});
              } else {
                res.json({msg: "invalid login attempt"});
              }
            })
            .catch(err => res.json({msg: "invalid login attempt"}));
        }
      })
      .catch(err => res.json(err));
  }
  getAll(req, res){
    User.find({})
        .then(user => res.json(user))
        .catch(err => res.json(err));
  }
  getOne(req, res){
    User.find({_id: req.params._id})
        .then(user => res.json(user))
        .catch(err => res.json(err));
  }
  delete(req, res){
    User.findOneAndDelete({_id: req.params._id})
        .then(() => res.json({msg: "Deleted "}))
        .catch(err => res.json(err));
}
  
  update(req, res){
    User.findOneAndUpdate({_id: req.params._id}, req.body, {runValidators: true, context: 'query'})
        .then( () => res.json({msg: "Updated "}))
        .catch(err => res.json(err));
  }

}

module.exports = new UserController();