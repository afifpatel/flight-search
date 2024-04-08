var express = require('express');
const { json } = require('express/lib/response');
var router = express.Router();
var flight = require('./models/flight');
var url = "https://gist.githubusercontent.com/bgdavidx/132a9e3b9c70897bc07cfa5ca25747be/raw/8dbbe1db38087fad4a8c8ade48e741d6fad8c872/gistfile1.txt"

/* GET flights */
router.get('/', function(req, res, next) {
    fetch(url).then((response) => response.json()).then((data) => {
        console.log(data);

        // query a data provider and return a list of matching flights
        const sortedFlights = getSortedFLights(data, req.carrierPreference);

        /* search for a flight based on any combination of the following:
        
        Params: minDate, maxDate, flightDurartion, carrier

        */

        let filteredResults;

        if(req.minDate && req.maxDate) {
            filteredResults = sortedFlights.map((flight) => {
                // req.minDate, req.MaxDate
            });
         }   

        if(req.flightDurartion) {
            filteredResults = sortedFlights.map((flight) => {
                // req.flightDurartion
            });
        }   

        if(req.carrier) {
            filteredResults = sortedFlights.map((flight) => {
                // req.carrier
            });
        }   


        return res.send(filteredResults);
    })
    .catch((err) => {
        return res.send('error');
    });
});

const getSortedFLights = (flights, carrierPreferenceFromRequest) => {
       
    const scoredFlights =  flights.map((flight) => {
        
        // (flight duration in hours) * (carrier preference) + (distance in miles between airports)
        const flightDuration =  getFlightDuration(flight.arrivalTime, flight.departureTime);
        const carrierPreference = flight.carrier === carrierPreferenceFromRequest ? 0.9 : 1.0;
        const distanceInMiles = getDistanceBetweenAirports();

        const score = flightDuration * carrierPreference + distanceInMiles;
        flight.score = score;

        return flight;
       })
    
    const sortedFlights = scoredFlights.sort(compare);
        
    return sortedFlights;
}

function compare( a, b ) {
    if ( a.score < b.score ){
      return -1;
    }
    if ( a.score > b.score ){
      return 1;
    }
    return 0;
  }  

function getDistanceBetweenAirports(){
    // TODO: use airport api for rela distance

    return Math.random();
}

// returns flight duration
function getFlightDuration(end, start) {
    var timestampDiff = new Date(end).getTime() - new Date(start).getTime();
    var diff = new Date(timestampDiff);
    return diff.getHours();
}

module.exports = router;
