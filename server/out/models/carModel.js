// Alot of this code was repurposed from the previous lab we've done on mongodb.
import { MongoError, MongoClient } from "mongodb";
import { InvalidInputError } from "./InvalidInputError.js";
import { DatabaseError } from "./DatabaseError.js";
import { isValid } from "./validation.js";
import logger from "../logger.js";
let dbName = "car_db";
let client;
let carsCollection;
/**
 * Initialize the database connection to the specified database and resets the collection if specified.
 *
 * @param dbname The name of the MongoDB database.
 * @param resetDBFlag Resets the collection if true, keeps it the same if false.
 */
async function initialize(dbname, resetDBFlag, url) {
    try {
        dbName = dbname;
        client = new MongoClient(url);
        await client.connect();
        console.log("Connected successfully to DB!");
        const db = client.db(dbName);
        if (resetDBFlag) {
            await carsCollection?.drop();
        }
        const collectionCursor = db.listCollections({ name: "cars" });
        const collectionArray = await collectionCursor.toArray();
        if (collectionArray.length == 0) {
            const collation = { locale: "en", strength: 1 };
            await db.createCollection("cars", { collation: collation });
        }
        carsCollection = db.collection("cars");
    }
    catch (err) {
        if (err instanceof MongoError) {
            throw new DatabaseError("Connection to DB failed: " + err.message);
        }
        else {
            console.error("An unknown error has occurred: " + err);
        }
    }
}
/**
 * Adds a car document to the MongoDB database.
 * @param model The model of the car to add.
 * @param year The make year of the car to add.
 */
async function addCar(model, year) {
    try {
        if (isValid(model, year)) {
            await carsCollection?.insertOne({ model: model, year: year });
        }
    }
    catch (err) {
        if (err instanceof InvalidInputError) {
            logger.error("InvalidInput error has occured!");
            throw err;
        }
        else if (err instanceof MongoError) {
            logger.error("A database error has occured!");
            throw new DatabaseError("An error occured while adding to the database: " + err.message);
        }
    }
    return { model: model, year: year };
}
/**
 * Gets a single car from the database based on model.
 * @param model The name of the car to search for.
 * @param year The make year of the car to search for.
 */
async function getSingleCar(model, year) {
    try {
        const car = await carsCollection?.findOne({ model: model, year: year });
        if (car === null) {
            throw new InvalidInputError("Car does not exist within database: " + model + " " + year);
        }
        return car;
    }
    catch (err) {
        if (err instanceof InvalidInputError) {
            throw err;
        }
        else if (err instanceof MongoError) {
            throw new DatabaseError("An error occurred while interacting with the database: " + err.message);
        }
        else {
            throw new Error("An unexpected error happened: " + err);
        }
    }
}
/**
 * Gets all the car documents from the database.
 *
 * @returns An array containing all of the car in the database.
 */
async function getAllCars() {
    try {
        const carCursor = carsCollection?.find({});
        const cars = await carCursor?.toArray();
        if (cars?.length === 0) {
            throw new DatabaseError("Database is empty.");
        }
        return cars;
    }
    catch (err) {
        if (err instanceof MongoError) {
            throw new DatabaseError("An error occurred while interacting with the database: " + err.message);
        }
        else {
            throw new Error("An unexpected error happened: " + err);
        }
    }
}
/**
 * Updates the first matching record matching the passed model argument.
 *
 * @param model The model of the car to update.
 * @param year  The mkae year of the car to update.
 * @param newModel The new model of the car.
 * @param newYear The new make year of the car.
 */
async function updateCar(model, year, newModel, newYear) {
    try {
        //check if car is in db before updating
        await getSingleCar(model, year);
        if (isValid(newModel, newYear)) {
            await carsCollection?.updateOne({ model: model, year: year }, { $set: { model: newModel, year: newYear } });
        }
        else {
            throw new InvalidInputError(`newModel or newYear is invalid: ${newModel}, ${newYear}`);
        }
    }
    catch (err) {
        if (err instanceof InvalidInputError) {
            throw err;
        }
        else if (err instanceof MongoError) {
            throw new DatabaseError("An error occured while interacting while interacting with the database: " +
                err.message);
        }
        else {
            throw new Error("An unexpected error happened: " + err);
        }
    }
    return { model: newModel, year: newYear };
}
/**
 * Deletes the matching record made with the passed argument from the database.
 *
 * @param model The model of the car to delete.
 * @param year The make year of the car to delete.
 */
async function deleteCar(model, year) {
    try {
        await getSingleCar(model, year);
        carsCollection?.deleteOne({ model: model, year: year });
    }
    catch (err) {
        if (err instanceof MongoError) {
            throw new DatabaseError("An error occured while interacting while interacting with the database: " +
                err.message);
        }
        else if (err instanceof InvalidInputError) {
            throw new InvalidInputError(err.message);
        }
        else {
            throw new Error("An unexpected error happened: " + err);
        }
    }
    return { model: model, year: year };
}
export { addCar, getSingleCar, getAllCars, updateCar, deleteCar, initialize };
//# sourceMappingURL=carModel.js.map