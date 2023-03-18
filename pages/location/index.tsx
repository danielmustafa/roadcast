import { ChangeEvent, useEffect, useState } from "react"
import { Client } from "@googlemaps/google-maps-services-js"
import Coords from "@/models/location/Coords"
import TravelTimeRequest from "@/models/location/TravelTimeRequest"
import { json } from "stream/consumers"
import Duration from "@/models/location/Duration"
let client = new Client({})

export default function Location() {
    const [originCoords, setOriginCoords] = useState<Coords>({ lat: 0.0, lng: 0.0 })
    const [destAddress, setDestAddress] = useState<string>("")
    const [destCoords, setDestCoords] = useState<Coords>({ lat: 0.0, lng: 0.0 })
    const [duration, setDuration] = useState<Duration>(new Duration(0))
    //AIzaSyBlBfPW0vfI8T8SDk_yXiWPK7own538edc

    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition(res => {
            setOriginCoords({
                lat: res.coords.latitude,
                lng: res.coords.longitude
            })
        })



    }, [])

    function handleAddressChange(e: ChangeEvent<HTMLInputElement>) {
        setDestAddress(e.currentTarget.value)
        console.log(destAddress)
    }

    function handleSubmit() {

        let travelTimeReq: TravelTimeRequest = {
            origin: {
                coords: originCoords,
                address: undefined
            },
            destination: {
                address: destAddress,
                coords: undefined
            }
        }

        fetch("/api/location/GetTravelTime", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(travelTimeReq)
        }).then(response => {
            if (response.status == 200 && response.body) {
                response.json().then(data => {
                    duration.seconds = data.duration?.value ? data.duration.value : -1
                    setDuration(duration)
                    console.log(duration)
                })
            }
        })
    }

    return (
        <section className="section">
            <label className="label">Current coords:</label>
            <p>latitude: {originCoords.lat}</p>
            <p>longitude: {originCoords.lng}</p>
            <br />
            <label className="label">Destination coords:</label>
            <p>latitude: {destCoords.lat}</p>
            <p>longitude: {destCoords.lng}</p>
            <br />
            <label className="label">Duration:</label>
            <p>duration: {duration.toHms()}</p>


            <div className="field">
                <br />
                <label className="label">Destination</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="123 Sesame Street"
                        onChange={handleAddressChange}
                        value={destAddress} />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button
                        className="button is-primary"
                        type="button"
                        onClick={handleSubmit}>Get Duration</button>
                </div>
            </div>
        </section>
    )
}

