import { type } from "os"
import { CarModel } from "./CarModel"

interface CarManagerModel {
    id?: string,
    name?: string,
    description?: string,
    logoPath?: string
    cars?: CarModel[],
}

export type { CarManagerModel }