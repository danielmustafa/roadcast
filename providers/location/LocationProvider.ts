import Coords from "@/models/location/Coords"
import TravelTimeRequest from "@/models/location/TravelTimeRequest"
import TravelTimeResponse from "@/models/location/TravelTimeResponse"
import Duration from "@/models/location/Duration"
import { Client } from "@googlemaps/google-maps-services-js"
import _ from "lodash"

export default class LocationProvider {
    constructor(apiKey: string, client: Client) {
        this.apiKey = apiKey
        this.client = client
    }

    apiKey: string
    client: Client

    async getGeolocation(address: string): Promise<Coords> {

        let response = await this.client.geocode({
            params: {
                key: this.apiKey,
                address
            }
        })

        if (response.data.status === "OK") {
            let { results } = response.data

            let coords: Coords = {
                lat: results[0].geometry.location.lat,
                lng: results[0].geometry.location.lng
            }

            return Promise.resolve(coords)
        } else {
            return Promise.reject("No results found from address")
        }
    }

    async getTravelTime(travelTimeReq: TravelTimeRequest): Promise<TravelTimeResponse> {
        console.log(travelTimeReq)
        let { origin, destination } = travelTimeReq

        if (_.isUndefined(origin) || _.isUndefined(destination)) {
            return Promise.reject("Origin or destination not defined")
        }

        if (!isValidCoords(origin.coords) || !isValidCoords(destination.coords)) {
            return Promise.reject("Missing required coordinates")
        }

        let response = await this.client.distancematrix({
            params: {
                origins: [[origin.coords!.lat, origin.coords!.lng]],
                destinations: [[destination.coords!.lat, destination.coords!.lng]],
                key: this.apiKey,
            }
        })

        console.log('response received')

        if (response.data.status === "OK") {

            console.log("response OK")

            let duration: Duration = new Duration(response.data.rows[0].elements[0].duration.value)

            let distanceResponse: TravelTimeResponse = { duration }
            return Promise.resolve(distanceResponse)
        } else {
            console.log(response.status)
        }

        return Promise.reject()
    }

}

const isValidCoords = (coords : Coords|undefined) => coords && coords.lat && coords.lng

// async function getGeolocation(address: string): Promise<Coords> {

//     let response = await client.geocode({
//         params: {
//             key: API_KEY,
//             address
//         }
//     })

//     console.log(response)

//     if (response.data.status === "OK") {

//         let coords: Coords = {
//             lat: response.data.results[0].geometry.location.lat,
//             lng: response.data.results[0].geometry.location.lng
//         }

//         return Promise.resolve(coords)
//     }

//     return Promise.reject()
// }

// export async function getTravelTime(distanceRequest: TravelTimeRequest): Promise<TravelTimeResponse> {
//     let origin = `${distanceRequest.originCoords.lat},${distanceRequest.originCoords.lng}`
//     let destination = `${distanceRequest.destCoords.lat},${distanceRequest.destCoords.lng}`

//     let response = await client.distancematrix({
//         params: {
//             origins: [origin],
//             destinations: [destination],
//             key: API_KEY,
//         }
//     })

//     if (response.data.status === "OK") {

//         let duration: Duration = {
//             text: response.data.rows[0].elements[0].duration.text,
//             value: response.data.rows[0].elements[0].duration.value,
//         }

//         let distanceResponse: TravelTimeResponse = { duration }
//         return Promise.resolve(distanceResponse)
//     }

//     return Promise.reject()
// }
