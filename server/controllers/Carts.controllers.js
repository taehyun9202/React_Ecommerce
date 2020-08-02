const Cart = require('../models/Carts.models');

class CartController{
    getAll(req, res){
        Cart.find({})
            .then(carts => res.json(carts))
            .catch(err => res.json(err));
    }
    getCart(req, res){
        Cart.find({itemid: req.params._id})
            .then(carts => res.json(carts))
            .catch(err => res.json(err));
    }
    addtoCart(req, res){
        const newCart = new Cart(req.body);
        newCart.save()
        .then(()=> res.json({msg: "Cart added"}))
        .catch(err => res.json(err));
    }
    getList(req, res){
        Cart.find({getuserID: req.params.userid})
            .then(cart => res.json(cart))
            .catch(err => res.json(err));
    }
    getOne(req, res){
        Cart.findOne({_id: req.params._id})
            .then(cart => res.json(cart))
            .catch(err => res.json(err));
    }
    delete(req, res){
        Cart.findOneAndDelete({_id: req.params._id})
            .then(() => res.json({msg: "Deleted "}))
            .catch(err => res.json(err));
    }
    update(req, res){
        Cart.findOneAndUpdate({_id: req.params._id}, req.body)
            .then(() => res.json({msg: "Updated "}))
            .catch(err => res.json(err));
    }
}

module.exports = new CartController()