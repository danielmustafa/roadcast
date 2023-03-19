import { useEffect, useState } from "react";
import OriginDestinationView from "../mapView/MapView";
import PodcastView from "../podcastView/PodcastView";
import Coords from "@/models/location/Coords";
import Header from "../header/Header";

export default function Body() {
    const [originCoords, setOriginCoords] = useState<Coords>({ lat: 0.0, lng: 0.0 })

    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition(res => {
            setOriginCoords({
                lat: res.coords.latitude,
                lng: res.coords.longitude
            })
        })
    }, [])

    return (
        <div className="container">
            <Header />
            <div className="box has-background-dark has-text-light ">
                <OriginDestinationView />
                <PodcastView />
            </div>
        </div>
    )
}