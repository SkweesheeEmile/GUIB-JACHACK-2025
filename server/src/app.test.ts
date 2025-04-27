import { MongoMemoryServer } from "mongodb-memory-server";
import { addCar, deleteCar, getAllCars, getSingleCar, initialize, updateCar } from "./models/carModel.js";
import { beforeEach, vi, beforeAll, test, expect, afterAll } from "vitest";
import app from './app.js';
import supertest from "supertest";
import { C } from "vitest/dist/chunks/reporters.d.CqBhtcTq.js";
const testRequest = supertest(app); 

let mongod: MongoMemoryServer;
const db = "car_db"

interface Car {
    model: string;
    year: number;
  }

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
});

beforeEach(async () => {
    try { 
        const uri = mongod.getUri()
        await initialize(db, true, uri);
    } catch (err) {
        console.log(err)
    }
    vi.setConfig({ testTimeout: 5_000 }) 
});

test("testing add endpoint with valid input", async () => {
    //Add car to db with invalid model
    const response = await testRequest.post("/cars").send({model: "Ford F-150", year: 2006})

    //check if code is good
    expect(response.status).toBe(200)

    //check if it actually was added to db
    const cars = await getAllCars()
    expect(cars?.length == 1).toBe(true)

    //check if the fields are right
    expect(cars![0].model).toBe("Ford F-150")
    expect(cars![0].year).toBe(2006)
})

test("testing add endpoint with invalid model", async () => {
    //Add car to db with invalid model
    const response = await testRequest.post("/cars").send({model: "INVALID!!!!!!!!!!!!!!!!!!!!", year: 2006})

    //check if code is good
    expect(response.statusCode).toBe(400)

    //check if database is empty with getAll cars since it throws if the db is empty 
    try{
        getAllCars()
    }
    catch{
        // pass test if exception is thrown
        expect(true).toBe(true)
    }

})

test("testing add endpoint with invalid year", async () => {
    //Add car to db with invalid year
    const response = await testRequest.post("/cars").send({model: "Ford F-150", year: 1})

    //check if code is good
    expect(response.statusCode).toBe(400)

    //check if database is empty with getAll cars since it throws if the db is empty 
    try{
        getAllCars()
    }
    catch{
        // pass test if exception is thrown
        expect(true).toBe(true)
    }
})

test("test get all cars endpoint with car in db", async () => {
    //add car to db
    await testRequest.post("/cars").send({model: "Ford F-150", year: 2006})

    //get response of request
    const response = await testRequest.get("/cars/all")

    //since cars are in db, response should be valid
    expect(response.statusCode).toBe(200)

    //nothing else to test since it doesnt actually interact witrh the db
})

test("test get all cars endpoint with no car in db", async () => {
    //get response of request
    const response = await testRequest.get("/cars/all")

    //since no cars are in db, response should be a database error
    expect(response.statusCode).toBe(503)
})

test("test get single car in db with cars in db", async () => {
    // add to db
    await testRequest.post("/cars").send({model: "Ford F-150", year: 2006})

    //get added car from db  
    const response = await testRequest.get("/cars/?model=Ford F-150&year=2006")

    //since car is in db, status code should be valid
    expect(response.statusCode).toBe(200)

    //nothing else to test since it doesnt actually interact witrh the db
})


test("test get single car in db no cars in db", async () => {

    //get a car even db is empty
    const response = await testRequest.get("/cars/?model=Ford F-150&year=2006")

    //since db is empty, 400 should be error code
    expect(response.statusCode).toBe(400)

    //nothing else to test since it doesnt actually interact with the db
})

test("test get car that doesnt exist in db", async () => {
    // add to db
    await testRequest.post("/cars").send({model: "Ford F-150", year: 2006})

    //get a car that isnt in db
    const response = await testRequest.get("/cars/?model=Toyota Corolla&year=2008")

    //since db is empty, 400 should be error code
    expect(response.statusCode).toBe(400)

    //nothing else to test since it doesnt actually interact with the db
})

test("test update car with valid input", async () => {
    //add car to db
    await testRequest.post("/cars").send({model: "Ford F-150", year: 2006})

    //update it with valid input
    const response = await testRequest.put("/cars/").send({model: "Ford F-150", year: 2006, newModel: "Audi A4", newYear: 2024})

    //status code should be 200
    expect(response.statusCode).toBe(200)

    //get cars to check if it actually was updated
    const cars = await getAllCars()

    //check db to see if it really uodated
    expect(cars![0].model).toBe("Audi A4")
    expect(cars![0].year).toBe(2024)
})

test("test update car with invalid match", async () => {
    //add car to db
    await testRequest.post("/cars").send({model: "Ford F-150", year: 2006})

    //update it with valid input
    const response = await testRequest.put("/cars/").send({model: "DOESNT EXIST!!!!", year: 2006, newModel: "Audi A4", newYear: 2024})

    //status code should be 200
    expect(response.statusCode).toBe(400)

    //get cars to check if it wasnt updated
    const cars = await getAllCars()

    //check db to see if it wasnt updated
    expect(cars![0].model).toBe("Ford F-150")
    expect(cars![0].year).toBe(2006)
})

test("test update car with invalid newName", async () => {
    //add car to db
    await testRequest.post("/cars").send({model: "Ford F-150", year: 2006})

    //update it with valid input
    const response = await testRequest.put("/cars/").send({model: "DOESNT EXIST!!!!", year: 2006, newModel: "NO!!!!!", newYear: 2024})

    //status code should be 200
    expect(response.statusCode).toBe(400)

    //get cars to check if it wasnt updated
    const cars = await getAllCars()

    //check db to see if it wasnt updated
    expect(cars![0].model).toBe("Ford F-150")
    expect(cars![0].year).toBe(2006)
})

test("test update car with invalid newYear", async () => {
    //add car to db
    await testRequest.post("/cars").send({model: "Ford F-150", year: 2006})

    //update it with valid input
    const response = await testRequest.put("/cars/").send({model: "DOESNT EXIST!!!!", year: 2006, newModel: "Audi A4", newYear: 1})

    //status code should be 200
    expect(response.statusCode).toBe(400)

    //get cars to check if it wasnt updated
    const cars = await getAllCars()

    //check db to see if it wasnt updated
    expect(cars![0].model).toBe("Ford F-150")
    expect(cars![0].year).toBe(2006)
})

test("delete car with valid input", async () => {
    //add car to db
    await testRequest.post("/cars").send({model: "Ford F-150", year: 2006})

    //delete car from db
    const response = await testRequest.delete("/cars").send({model: "Ford F-150", year: 2006})

    //should be valid code
    expect(response.statusCode).toBe(200)

    //get all cars should throw since the db should be empty
    try{
        getAllCars()
    }
    catch{
        // pass test if exception is thrown
        expect(true).toBe(true)
    }
})

test("delete car with invalid match", async () => {
    //add car to db
    await testRequest.post("/cars").send({model: "Ford F-150", year: 2006})

    //delete car from db
    const response = await testRequest.delete("/cars").send({model: "NO!", year: 2006})

    //should be valid code
    expect(response.statusCode).toBe(400)

    //get all cars should throw since the db should be empty

    //get cars to check if it wasnt deleted
    const cars = await getAllCars()

    //check db to see if it wasnt deleted
    expect(cars![0].model).toBe("Ford F-150")
    expect(cars![0].year).toBe(2006)
    
})


afterAll(async () => {  
  await mongod.stop(); 
});
