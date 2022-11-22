# Basic Rest Exercise

This app is simulating a REST API for the pattern GET /api/v1/distance/:from/:to

It takes a semicolon seperated csv file and returns a JSON with the format

  {
    "from": "Name of the departure station",
    "to": "Name of the destination station",
    "distance": rounded_integer_distance,
    "unit": "km"
  }

The (linear) distance is calculated from the geolocation of both stations.
