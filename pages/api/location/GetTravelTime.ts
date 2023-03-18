import TravelTimeRequest from "@/models/location/TravelTimeRequest";
import { NextApiRequest, NextApiResponse } from "next";
import LocationProvider from '@/providers/location/LocationProvider'
import _ from 'lodash'
import Location from "@/models/location/Location";
import { Client } from '@googlemaps/google-maps-services-js'
import Coords from "@/models/location/Coords";

let API_KEY = "REPLACE ME"
let client = new LocationProvider(API_KEY, new Client({}))

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST': handlePost(req, res); break;
        default: res.status(405).send("Unsupported")
    }
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    let travelTimeReq = req.body as TravelTimeRequest
    if (travelTimeReq) {

        let { origin, destination } = travelTimeReq

        origin = await setLocationCoords(origin)
        destination = await setLocationCoords(destination)

        if (locationHasCoords(origin) && locationHasCoords(destination)) {
            try {
                let ttResp = await client.getTravelTime(travelTimeReq)
                res.status(200).json(ttResp)
            } catch (err) {
                console.error(err)
                res.status(500).send("Failed to get travel time")
            }

        } else {
            console.log(travelTimeReq)
            res.status(500).send("didnt work")
        }

    } else {
        res.status(400).send("Origin required")
    }
}

const locationHasCoords = (location: Location) => location.coords && location.coords.lat && location.coords.lng
const locationHasAddress = (location: Location) => location.address && !_.isEmpty(location.address)

const setLocationCoords = async (location: Location) => {
    if (locationHasCoords(location))
        return location
    else if (locationHasAddress(location)) {
        try {
            location.coords = await client.getGeolocation(location.address)
        } catch (err) {
            console.error(err)
            location.coords = undefined
        }
    }
    return location
}