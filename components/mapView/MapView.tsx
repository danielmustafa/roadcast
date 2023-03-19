import { useEffect, useState } from "react"
import NumberedInstruction from "./NumberedInstruction"
import TravelModeSelector from "./travelModeSelector/TravelModeSelector"

export default function OriginDestinationView() {
    let [showFromField, setShowFromField] = useState(false)

    useEffect(() => {
        window.navigator.permissions.query({ name: 'geolocation' })
            .then(res => {
                if (res.state == "denied")
                    setShowFromField(true)
            })
    }, [])

    return (
        <div className="block">
            <NumberedInstruction
                number={1}
                text="Enter a Destination" />
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