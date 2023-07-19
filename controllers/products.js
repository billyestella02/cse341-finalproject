import Product from '../models/product.js';
import { ObjectId } from 'mongodb';
import productSchema from '../helpers/product-validate-schema.js';

const getProducts = (req, res, next) => {
    Product.find({})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

const getProduct = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);
    Product.find({ _id: id })
        .then((result) => {
            res.status(255).json(result[0]);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
}

const postProduct = (req, res, next) => {
    const validator = productSchema.validate(req.body);
    if (!validator.error) {
        const product = new Product(validator.value);
        product
            .save()
            .then((productData) => {
                res.status(201).send(productData);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    } else {
        res.status(422).json(validator.error);
    }
}

const putProduct = (req, res, next) => {
    const id = new ObjectId(req.params.id);

    Product.findOne({ _id: id })
        .then((result) => {
            const validator = productSchema.validate(req.body);
            if (!validator.error) {
                const product = result;
                const validProduct = new Product(validator.value);
                product.product = validProduct.product;
                product.name = validProduct.name;
                product.description = validProduct.description;
                product.type = validProduct.type;
                product.size = validProduct.size;
                product.color = validProduct.color;
                product.price = validProduct.price;
                product.stock = validProduct.stock;
                
                product
                    .save()
                    .then((updatedProduct) => {
                        res.status(204).send(updatedProduct);
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
}

const deleteProduct = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);

    Product.deleteOne({ _id: id })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
}

export { 
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
};