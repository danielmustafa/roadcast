import TravelMode from "@/models/enums/TravelMode"
import { useState } from "react"

export default function TravelModeSelector() {
    //driving, walking, biking
    const [selected, setSelected] = useState<TravelMode>(TravelMode.driving)
    const buttonClasses = ["button"]
    const selectedButtonClasses = ["is-selected", "is-primary"]

    const handleStyle = (mode: TravelMode) => {
        let classes = [...buttonClasses]
        if (selected == mode)
            classes = classes.concat(selectedButtonClasses)
        return classes.join(' ')
    }

    return (
        <div className="container buttons has-addons">
        <button className={handleStyle(TravelMode.driving)}
                onClick={() => setSelected(TravelMode.driving)}>
            <span className="icon is-small">
                <i className="fas fa-car"></i>
            </span>
        </button>
        <button className={handleStyle(TravelMode.walking)}
                onClick={() => setSelected(TravelMode.walking)}>
            <i className="fas fa-walking"></i>
        </button>
        <button className={handleStyle(TravelMode.biking)}
                onClick={() => setSelected(TravelMode.biking)}>
            <i className=" fas fa-biking"></i>
        </button>
    </div>
    )
}

