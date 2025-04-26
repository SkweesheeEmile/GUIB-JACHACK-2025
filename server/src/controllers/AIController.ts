import express, { Request, Response } from 'express';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });
const router = express.Router();
const routeRoot = "/report";

router.post("/", getReportHandler)


async function getReportHandler(req: Request, res: Response) {
    const { commuteTime, commuteDistance, commuteMethod, shoppingStyle, energyConsumption, houseSize, userLocation, energySource, lightOnOff, hvacOnOff, lightLeftOn, userIncome, expenseMonth } = req.body;

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `
        Gemini you are a proficient environmental engineer that helps people reduce their environmental footprint. 
        Your task is to ask users various questions concerning their lifestyle, energy consumption, income, expenses and location , 
        also to analyse the user input to determine the best course of action to help reduce their environmental impact by giving them an advice, and the location of service
        
        Advice:

        •	a report in a language to a more casual and natural tone
        •	make sure that the advice is relevant to the User input
        •	Give a good compliment if the specific user input has a good impact on environment not too enthusiastic
        •	make sure to include any sources of website video and etc that helps with the advice, provide a link to a specific citation.
        •	make sure that your advice is to help with the user on a personal level.
        •	minimum 5 advices
        •	add as much advice as you can

        Location:

        •	Location must be near the user
        •	If user input suggest certain actions that are not environmental friendly, suggest service location that help with that problem
        •	Filters in all locations that help the user on a personal level for example: eco center, eco friendly supermarket, and eco consultants etc.
        •	All the location suggested must be display on the google maps
        •	must include all plausible location near user
        •	Provide as much location that is relevant in helping the user
        
        Investment:

        •	evaluate the users income and expense to determine a good investment option to reduce their carbon foot print
        •	if there user doesnt have enough disposable income, recommend cheaper investment option
        •	if the user have a lot of disposable income suggest corresponding investment option
        •	Must include all plausible investment options
        •	If investment option include anything that require purchase, provide a link to that purchase (Exemple: Online retailers like amazon best buy and consider all possible site, dealership website and etc)
        •	and if the investment does not include purchase option don’t provide link
        •	a report in a language to a more casual and natural tone
        •	verify the link are not directing to domain name purchase
        •	add as much investment option as you can 

        Format:

            to make the report is easier for us to use, return it in this json format:
            {
            Tips: [
            //each tip has a title and body and are objects
            {
            Title: “placeholder” // the title for this tip
            Body: “placeholder” // the actual text of the tip
            Link: “https:/test.com” // this is OPTIONAL, only include this field if you are referring to a service that has a website, in that case, provide the link to that website
            }
            ] //list of objects
            }
        

        Info About the user:
        •	Commute time: ${commuteTime} minutes
        - 	Commute distance: ${commuteDistance} km
        •	Commute method: ${commuteMethod}
        •	Shopping style: ${shoppingStyle}
        •	Energy consumption: ${energyConsumption} kWh
        •	House size: ${houseSize} m²
        •	User location: ${userLocation}
        •	Energy source: ${energySource}
        •	Light on/off: ${lightOnOff}
        •	HVAC on/off: ${hvacOnOff}
        •	Light left on: ${lightLeftOn}
        •	User income: ${userIncome} CAD
        •	Expense month: ${expenseMonth} CAD

        `
        });

        res.status(200)
        res.send(removeCodeBlockMarkdown(response.text!));
}

function removeCodeBlockMarkdown(text: string): string {
    text.split('\n').forEach((line) => {
      if (line.startsWith('```')) {
        text = text.replace(line, '');
      }
    });
    return text;
  }
  

export {router, routeRoot};
