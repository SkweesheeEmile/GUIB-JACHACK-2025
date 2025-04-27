import express from 'express';
const router = express.Router();
const routeRoot = "/";
router.get("*", errorMessage);
function errorMessage(request, response) {
    response.status(404);
    response.send("Page not found. Please try again.");
}
export { router, routeRoot };
//# sourceMappingURL=errorController.js.map