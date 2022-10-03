import { CityModel } from "./CityModel"
import { DistrictModel } from "./DistrictModel"

interface InfoCustomerModel {
    name?: string,
    tel?: string,
    email?: string,
    city?: CityModel,
    district?: DistrictModel
}

export type { InfoCustomerModel }