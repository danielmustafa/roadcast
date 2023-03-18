import { createContext } from "react";
import Location from '../location/Location'

export const RequestContext = createContext<RequestContextProps>({})

export interface RequestContextProps {
    origin?: Location,
    destination?: Location,
    travelMode?: number
}