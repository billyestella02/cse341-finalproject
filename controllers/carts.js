import Cart from '../models/cart.js';
import { ObjectId } from 'mongodb';
import cartSchema from '../helpers/cart-validate-schema.js';

const getCarts = (req, res, next) => {
    Cart.find({})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

const getCart = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);

    Cart.find({ _id: id })
        .then((result) => {
            res.status(200).json(result[0]);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

const postCart = (req, res, next) => {
    const cart = req.body;
    cart.dateCreated = new Date();
    const cartValidator = cartSchema.validate(cart);
    if (!cartValidator.error) {
        const validCart = new Cart(cartValidator.value);
        validCart
            .save()
            .then((cartData) => {
                res.status(201).send(cartData);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    } else {
        res.status(422).json(cartValidator.error);
    }
};

const putCart = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);

    Cart.findOne({ _id: id })
        .then((result) => {
            const validator = cartSchema.validate(req.body);
            if (!validator.error) {
                const cart = result;
                const products = validator.value.products;
                cart.products = products;
                cart
                    .save()
                    .then((updatedCart) => {
                        res.status(204).send(updatedCart);
                    })
                    .catch((err) => {
                        res.status(500).json(err);
                    });
            } else {
                res.status(422).json(validator.error);
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

const deleteCart = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);

    Cart.deleteOne({ _id: id })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

export {
    getCarts,
    getCart,
    postCart,
    putCart,
    deleteCart
}