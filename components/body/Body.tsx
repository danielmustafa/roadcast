import { useEffect, useState } from "react";
import MapView from "../mapView/MapView";
import PodcastView from "../podcastView/PodcastView";
import Coords from "@/models/location/Coords";
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
        <div className="columns">
            <div className="column">
                <MapView />
            </div>
            <div className="column">
                <PodcastView />
            </div>
        </div>
    )
}