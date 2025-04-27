ENDPOINTS:

POST /cars
JSON:
{
"model":"Ford F-150",
"year":2006
}

GET /cars?model=Ford F-150&year=2006 (get a single car)

GET /cars/all (get all cars)

PUT /cars 
JSON:
{"model":"Ford F-150", "year":2006, "newModel":"Audi A4","newYear": 2024}

DELETE /cars (i use the body for my delete)
JSON:
{"model":"Audi A4", "year":2024}
