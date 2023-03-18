import { useEffect, useState } from "react"
import TravelModeSelector from "./travelModeSelector/TravelModeSelector"

export default function MapView() {
    let [showFromField, setShowFromField] = useState(false)

    useEffect(() => {
        window.navigator.permissions.query({ name: 'geolocation' })
            .then(res => {
                if (res.state == "denied")
                    setShowFromField(true)
            })
    }, [])

    return (
        <div className="box has-background-dark has-text-light">
            <div className="block is-flex is-align-items-center ">
                <div className="icon is-large has-text-primary fa-layers">
                    <i className="fa fa-circle fa-3x"></i>
                    <strong className="fa-layers-text has-text-light" data-fa-transform="grow-25">1</strong>
                </div>
                <p className="ml-3 has-text-light has-text-weight-medium is-size-3">Enter a destination</p>
            </div>
            {showFromField && <div className="field">
                <label className="label has-text-light">From</label>
                <div className="control">
                    <input className="input" type="text" />
                </div>
            </div>}
            <div className="field">
                {showFromField && <label className="label has-text-light">To</label>}
                <div className="control">
                    <input className="input" type="text" />
                </div>
            </div>
            <TravelModeSelector />
        </div >
    )
}