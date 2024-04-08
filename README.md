# flight-search
Endpoint to search flights

# some design notes while doing the assessment
Flight search API  

controller:  GET /flights/search?param1&param2…. 
Params: minDate, maxDate, flightDurartion, carrier
 
DS: 	•	https://gist.githubusercontent.com/bgdavidx/132a9e3b9c70897bc07cfa5ca25747be/raw/8dbbe1db38087fad4a8c8ade48e741d6fad8c872/gistfile1.txt

DTO/Models

Flights: Flight[]

Flight 
{
departureTime: string
arrivalTime: string
carrier: string
origin: string
destination: string
}

Sample {
    "departureTime": "2017-06-01T21:21:17.274Z",
    "arrivalTime": "2017-06-01T22:21:17.274Z",
    "carrier": "FR",
    "origin": "SJC",
    "destination": "BUR"
  },


Service: 
FlightSearch:   Algo:     Acceptable departure time range (min/max date+time)   assumption: start and end
    Maximum acceptable flight duration (in hours)			assumption: 14hrs
    Preferred airline carrier								carrier
 
