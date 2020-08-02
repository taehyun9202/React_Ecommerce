const Option = require('../models/Options.models');

class OptionController{
    getAll(req, res){
        Option.find({})
            .then(options => res.json(options))
            .catch(err => res.json(err));
    }
    create(req, res){
        const newOption = new Option(req.body);
        newOption.save()
        .then(()=> res.json({msg: "Option added"}))
        .catch(err => res.json(err));
    }
    getList(req, res){
        Option.find({itemid: req.params._id}).sort("extra").exec()
            .then(option => res.json(option))
            .catch(err => res.json(err));
    }
    getOne(req, res){
        Option.findOne({_id: req.params._id})
            .then(option => res.json(option))
            .catch(err => res.json(err));
    }
    delete(req, res){
        Option.findOneAndDelete({_id: req.params._id})
            .then(() => res.json({msg: "Deleted "}))
            .catch(err => res.json(err));
    }
}

module.exports = new OptionController()