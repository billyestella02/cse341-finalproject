import User from "../models/user.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import userSchema from "../helpers/user-validate-schema.js";

const saltRounds = 10;

const getUsers = (req, res, next) => {
    User.find({})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

const getUser = (req, res, next) => {
    const id = new ObjectId(req.params.id);
    User.find({ _id: id })
        .then((result) => {
            res.status(200).json(result[0]);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

const postUser = (req, res, next) => {
    const validator = userSchema.validate(req.body);
    if (!validator.error) {
        const user = new User(validator.value);
        bcrypt
            .hash(req.body.password, saltRounds)
            .then((hashedPassword) => {
                user.password = hashedPassword;
                user
                    .save()
                    .then((userData) => {
                        res.status(201).send(userData);
                    })
                    .catch((err) => {
                        res.status(500).json(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        console.log(validator.error);
        res.status(422).json(validator.error);
    }
};

// add cart
// add notifications

const putUser = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);

    User.findOne({ _id: id })
        .then((result) => {
            const validator = userSchema.validate(req.body);
            if (!validator.error) {
                const user = result;
                const validUser = new User(validator.value);
                user.firstName = validUser.firstName;
                user.lastName = validUser.lastName;
                user.mobile = validUser.mobile;
                user.email = validUser.email;
                bcrypt
                    .hash(validUser.password, saltRounds)
                    .then((hashedPassword) => {
                        user.password = hashedPassword;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                if (validUser.cart) { user.cart = validUser.cart; }
                if (validUser.notifications) { user.notifications = validUser.notifications; }
                
                user
                    .save()
                    .then((updatedUser) => {
                        res.status(204).send(updatedUser);
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

const deleteUser = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);

    User.deleteOne({ _id: id })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
}

export {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser
}