import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () => {
    try {
        passport.serializeUser((user, done) => {
            console.log("Serializing User");
            done(null, user.id);
        });

        passport.deserializeUser(async (id, done) => {
            console.log("Deserializing User");
            try {
                const user = await User.findById(id);
                done(null, user);
            } catch (err) {
                done(err);
                console.log(err);
            }
        });

        passport.use(
            new GraphQLLocalStrategy(async (username, passport, done) => {
                try {
                    const user = User.findOne({ username });
                    if (!user) {
                        throw new Error("Invalid username and password");
                    }
                    const validPassword = await bcrypt.compare(passport, user.password);

                    if (!validPassword) {
                        throw new Error("Invalid username and password");
                    }

                    return done(null, user);
                } catch (err) {
                    return done(err)
                }
            })
        )
    } catch (error) {
        console.log("Error in passport.config.js file ", error.message);
    }
}

