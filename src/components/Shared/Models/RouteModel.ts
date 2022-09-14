interface RouteModel {
    id?: string;
    fromId?: string,
    toId?: string,
    distanceByKm?: number,
    day?: number,
    hour?: number,
    minute?: number
}

export type { RouteModel }