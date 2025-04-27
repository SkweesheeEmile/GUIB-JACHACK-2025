import express from 'express';
const router = express.Router();
const routeRoot = "/";
router.get("/", homeMessage);
function homeMessage(request, response) {
    response.status(200);
    response.send("This is a cool homepage wow!");
}
export { router, routeRoot };
//# sourceMappingURL=homeController.js.map