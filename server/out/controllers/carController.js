import express from 'express';
import * as model from "../models/carModel.js";
import { DatabaseError } from '../models/DatabaseError.js';
import { InvalidInputError } from '../models/InvalidInputError.js';
const router = express.Router();
const routeRoot = "/cars";
router.post("/", addCarHandler);
router.get("/", readSingleCarHandler);
router.get("/all", readAllCarHandler);
router.put("/", updateCarHandler);
router.delete("/", deleteCarHandler);
/**
 * Handles adding a single car to the database.
 * Will return a 200 code if succesful, a 400 code if inputs are invalid, a 500 code if there is a db error and a 503 if an unknown error occurs.
 *
 * @param request The HTTP request.
 * @param response The HTTP response object.
 */
async function addCarHandler(request, response) {
    try {
        const car = await model.addCar(request.body.model, request.body.year);
        response.status(200);
        response.send(car);
    }
    catch (err) {
        if (err instanceof InvalidInputError) {
            response.status(400);
            response.send(`Inputs are invalid: ${err.message}`);
        }
        else if (err instanceof DatabaseError) {
            response.status(500);
            response.send(`An error occured while interacting with the database: ${err.message}`);
        }
        else {
            response.status(503);
            response.send(`An unknown error occured: ${err}`);
        }
    }
}
/**
 * Handles reading all cars from the database and displays cars in console and response.
 * Will return a 200 code if succesful, a 500 code if there is a db error and a 503 if an unknown error occurs.
 *
 * @param request The HTTP request.
 * @param response The HTTP response object.
 */
async function readAllCarHandler(request, response) {
    try {
        const cars = await model.getAllCars();
        response.status(200);
        //diplay array to console
        console.table(cars);
        response.json(cars);
    }
    catch (err) {
        if (err instanceof DatabaseError) {
            response.status(500);
            response.send(`An error occured while interacting with the database: ${err.message}`);
        }
        else {
            response.status(503);
            response.send(`An unknown error occured: ${err}`);
        }
    }
}
/**
 * Handles reading a single car from the database. The found car is the first match in the database.
 * Will return a 200 code if succesful, a 400 code if inputs are invalid, a 500 code if there is a db error and a 503 if an unknown error occurs.
 *
 * @param request The HTTP request.
 * @param response The HTTP response object.
 */
async function readSingleCarHandler(request, response) {
    try {
        const car = await model.getSingleCar(request.query.model?.toString(), parseInt(request.query.year?.toString()));
        response.status(200);
        response.send(car);
    }
    catch (err) {
        if (err instanceof InvalidInputError) {
            response.status(400);
            response.send(`Inputs are invalid: ${err.message}`);
        }
        else if (err instanceof DatabaseError) {
            response.status(500);
            response.send(`An error occured while interacting with the database: ${err.message}`);
        }
        else {
            response.status(503);
            response.send(`An unknown error occured: ${err}`);
        }
    }
}
/**
 * Handles updating a single car from the database. The updated car is the first match in the database.
 * Will return a 200 code if succesful, a 400 code if inputs are invalid, a 500 code if there is a db error and a 503 if an unknown error occurs.
 *
 * @param request The HTTP request.
 * @param response The HTTP response object.
 */
async function updateCarHandler(request, response) {
    try {
        const car = await model.updateCar(request.body.model, request.body.year, request.body.newModel, request.body.newYear);
        response.status(200);
        response.send(car);
    }
    catch (err) {
        if (err instanceof InvalidInputError) {
            response.status(400);
            response.send(`Inputs are invalid: ${err.message}`);
        }
        else if (err instanceof DatabaseError) {
            response.status(500);
            response.send(`An error occured while interacting with the database: ${err.message}`);
        }
        else {
            response.status(503);
            response.send(`An unknown error occured: ${err}`);
        }
    }
}
/**
 * Handles deleting a single car from the database. The deleted car is the first match in the database.
 * Will return a 200 code if succesful, a 400 code if inputs are invalid, a 500 code if there is a db error and a 503 if an unknown error occurs.
 *
 * @param request The HTTP request.
 * @param response The HTTP response object.
 */
async function deleteCarHandler(request, response) {
    try {
        const car = await model.deleteCar(request.body.model, request.body.year);
        response.status(200);
        response.send(car);
    }
    catch (err) {
        if (err instanceof InvalidInputError) {
            response.status(400);
            response.send(`Inputs are invalid: ${err.message}`);
        }
        else if (err instanceof DatabaseError) {
            response.status(500);
            response.send(`An error occured while interacting with the database: ${err.message}`);
        }
        else {
            response.status(503);
            response.send(`An unknown error occured: ${err}`);
        }
    }
}
export { router, routeRoot };
//# sourceMappingURL=carController.js.map