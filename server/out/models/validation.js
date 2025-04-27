import { InvalidInputError } from './InvalidInputError.js';
/**
 * Validates the model and year for a car object.
 *
 * @param {string} model The model of the car to verify.
 * @param {string} year The make year to verify.
 * @returns True if the car object is valid.
 */
function isValid(model, year) {
    const minYear = 1990;
    if (!model) {
        throw new InvalidInputError("Model canno't be empty.");
    }
    if (year < minYear) {
        throw new InvalidInputError("Make year of the car canno't be lower than 1990.");
    }
    // at first i wanted to validate the model with an api, but i couldn't find a free car model api, so i asked chatgpt to generate me an array of brands instead.
    const carModels = [
        "Toyota Camry",
        "Ford F-150",
        "Honda Civic",
        "BMW X5",
        "Mercedes-Benz A-Class",
        "Audi A4",
        "Chevrolet Silverado",
        "Tesla Model S",
        "Volkswagen Golf",
        "Nissan Altima",
        "Hyundai Elantra",
        "Kia Soul",
        "Porsche 911",
        "Lexus RX",
        "Jaguar F-Type",
        "Mazda CX-5",
        "Subaru Outback",
        "Land Rover Range Rover",
        "Chrysler Pacifica",
        "Jeep Grand Cherokee"
    ];
    if (carModels.includes(model)) {
        return true;
    }
    throw new InvalidInputError("Model is invalid.");
}
export { isValid };
//# sourceMappingURL=validation.js.map