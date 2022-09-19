import { type } from "os"

interface SeatModel {
    id?: string,
    row?: string,
    col?: string,
    status?: number,
    floor?: number,
}

export type { SeatModel }