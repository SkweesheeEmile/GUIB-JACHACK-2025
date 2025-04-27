import express, { Request, Response } from 'express';
const router = express.Router();
const routeRoot = "/";

router.get("*", errorMessage)

function errorMessage(request: Request, response: Response){
    response.status(404)

    response.send("Page not found. Please try again.")
}

export {router, routeRoot};
