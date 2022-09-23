import { CarModel } from "./CarModel"

export interface CarManagerModel {
    id?: string,
    name?: string,
    description?: string,
    logoPath?: string
    cars?: CarModel[],
}