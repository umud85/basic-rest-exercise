# Basic Rest Exercise

This app is simulating a REST API for the pattern GET /api/v1/distance/:from/:to

It takes a semicolon seperated csv file and returns a JSON with the format

{\
&nbsp;&nbsp;&nbsp;&nbsp;"from": "Name of the departure station",\
&nbsp;&nbsp;&nbsp;&nbsp;"to": "Name of the destination station",\
&nbsp;&nbsp;&nbsp;&nbsp;"distance": rounded_integer_distance,\
&nbsp;&nbsp;&nbsp;&nbsp;"unit": "km"\
}


The (linear) distance is calculated from the geolocation of both stations.

Use "npm install" and "npm start" please.
