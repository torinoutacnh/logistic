import { type } from "os"
import { RouteModel } from "./RouteModel"
import { SeatModel } from "./SeatModel"
import { StopPointModel } from "./StopPointModel"

interface CarModel {
    id?: string,
    carsManagerId?: string,
    shipPrice?: number,
    travelPrice?: number,
    carModel?: string,
    carColor?: string,
    imagePath?: string,
    tel?: string,
    carNumber?: string,
    carsManagerName?: string,
    serviceType?: number,
    manager?: any,
    seats?: SeatModel[],
    routes?: RouteModel[],

}

export type { CarModel }