import { StopPointModel } from "./StopPointModel";

interface RouteModel {
    id?: string;
    carId?: string,
    from?: StopPointModel,
    to?: StopPointModel,
    distanceByKm?: number,
    day?: number,
    hour?: number,
    minute?: number
}

export type { RouteModel }