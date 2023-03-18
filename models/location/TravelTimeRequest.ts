import Coords from "./Coords";
import Location from "./Location"

export default interface TravelTimeRequest {
    origin: Location,
    destination: Location
}
