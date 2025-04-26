import express, { Request, Response } from 'express';
const router = express.Router();
const routeRoot = "/";

router.get("/", homeMessage)

function homeMessage(request: Request, response: Response){
    response.status(200)

    response.send("This is a cool homepage wow!")
}

export {router, routeRoot};
