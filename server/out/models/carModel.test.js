import { MongoMemoryServer } from "mongodb-memory-server";
import { addCar, deleteCar, getAllCars, getSingleCar, initialize, updateCar } from "./carModel.js";
import { beforeEach, vi, beforeAll, test, expect, afterAll } from "vitest";
let mongod;
const db = "car_db";
beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
});
beforeEach(async () => {
    try {
        const uri = mongod.getUri();
        await initialize(db, true, uri);
    }
    catch (err) {
        console.log(err);
    }
    vi.setConfig({ testTimeout: 5_000 });
});
test("adding one valid car to database", async () => {
    const testCar = { model: "Honda Civic", year: 2006 };
    await addCar(testCar.model, testCar.year);
    const cars = await getAllCars();
    expect(cars.length == 1).toBe(true);
    expect(cars[0].model == testCar.model && cars[0].year == testCar.year).toBe(true);
});
test("adding multiple valid cars to database", async () => {
    const testCar = { model: "Honda Civic", year: 2006 };
    const testCar2 = { model: "Ford F-150", year: 2004 };
    await addCar(testCar.model, testCar.year);
    await addCar(testCar2.model, testCar2.year);
    const cars = await getAllCars();
    expect(cars.length == 2).toBe(true);
    expect(cars[0].model == testCar.model && cars[0].year == testCar.year).toBe(true);
    expect(cars[1].model == testCar2.model && cars[1].year == testCar2.year).toBe(true);
});
test("adding car with invalid model", async () => {
    const testCar = { model: "Honda not Civic", year: 2006 };
    expect(async () => {
        await addCar(testCar.model, testCar.year);
    }).rejects.toThrow();
});
test("adding car with invalid year", async () => {
    const testCar = { model: "Honda Civic", year: 1989 }; //this also tests the edge case
    expect(async () => {
        await addCar(testCar.model, testCar.year);
    }).rejects.toThrow();
});
test("reading single car from db", async () => {
    const testCar = { model: "Honda Civic", year: 2006 };
    await addCar(testCar.model, testCar.year);
    const retrivedCar = await getSingleCar(testCar.model, testCar.year);
    expect(testCar.model == retrivedCar?.model && testCar.year == retrivedCar.year).toBe(true);
});
test("reading car that doesn't exist in db", async () => {
    const testCar = { model: "Honda Not Civic", year: 2006 };
    expect(async () => {
        await getSingleCar(testCar.model, testCar.year);
    }).rejects.toThrow();
});
test("read all cars with cars in db", async () => {
    const testCar = { model: "Honda Civic", year: 2006 };
    const testCar2 = { model: "Ford F-150", year: 2004 };
    await addCar(testCar.model, testCar.year);
    await addCar(testCar2.model, testCar2.year);
    const cars = await getAllCars();
    expect(cars.length == 2).toBe(true);
});
test("read all cars with no cars in db", async () => {
    expect(async () => {
        await getAllCars();
    }).rejects.toThrow();
});
test("updating car with valid args", async () => {
    const testCar = { model: "Honda Civic", year: 2006 };
    const updatedCar = { model: "Toyota Camry", year: 2022 };
    await addCar(testCar.model, testCar.year);
    await updateCar(testCar.model, testCar.year, updatedCar.model, updatedCar.year);
    const dbUpdatedCar = await getSingleCar("Toyota Camry", 2022);
    expect(testCar != dbUpdatedCar).toBe(true);
    expect(dbUpdatedCar?.model == updatedCar.model && dbUpdatedCar.year == updatedCar.year).toBe(true);
});
test("trying to update car that doesnt exist in db.", async () => {
    const testCar = { model: "Honda Civic", year: 2006 };
    const updatedCar = { model: "Toyota Camry", year: 2022 };
    expect(async () => {
        await updateCar(testCar.model, testCar.year, updatedCar.model, updatedCar.year);
    }).rejects.toThrow();
});
test("trying to update car with invalid new name", async () => {
    const testCar = { model: "Honda Civic", year: 2006 };
    const updatedCar = { model: "Toyota Not Camry", year: 2022 };
    expect(async () => {
        await updateCar(testCar.model, testCar.year, updatedCar.model, updatedCar.year);
    }).rejects.toThrow();
});
test("trying to update car with invalid new year", async () => {
    const testCar = { model: "Honda Civic", year: 2006 };
    const updatedCar = { model: "Toyota Camry", year: 1989 };
    expect(async () => {
        await updateCar(testCar.model, testCar.year, updatedCar.model, updatedCar.year);
    }).rejects.toThrow();
});
test("deleting from db with valid args", async () => {
    const testCar = { model: "Honda Civic", year: 2006 };
    await addCar(testCar.model, testCar.year);
    await deleteCar(testCar.model, testCar.year);
    // getSingleCar should throw since car doesnt exist anymore
    expect(async () => {
        await getSingleCar(testCar.model, testCar.year);
    }).rejects.toThrow();
});
test("deleting car that doesnt exist in the db", async () => {
    const testCar = { model: "Honda Civic", year: 2006 };
    expect(async () => {
        await deleteCar(testCar.model, testCar.year);
    }).rejects.toThrow();
});
afterAll(async () => {
    await mongod.stop();
});
//# sourceMappingURL=carModel.test.js.map