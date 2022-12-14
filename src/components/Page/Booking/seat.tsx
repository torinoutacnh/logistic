import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styles from "./booking.module.scss";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Grid, Button, IconButton, Alert, Snackbar } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { ServiceType, StatusSeat } from '../../Shared/Models/Everything';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { CarModel } from '../../Shared/Models/CarModel';
import { StopPointModel } from '../../Shared/Models/StopPointModel';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import { SeatModel } from '../../Shared/Models/SeatModel';
import { RouteModel } from '../../Shared/Models/RouteModel';


export const Booking_Seat = (props: { car: CarModel, add: any, remove: any, seatDefault: SeatModel[] }) => {

    const [floor1, setFloor1] = useState<SeatModel[]>()
    const [floor2, setFloor2] = useState<SeatModel[]>()
    const [load, setReload] = useState(0)
    const [seatSelect, setSeatSelect] = useState<SeatModel[]>([])

    useEffect(() => {

        const tmp1 = props.car?.seats?.filter(i => i.floor === 0)
        const tmp2 = props.car?.seats?.filter(i => i.floor === 1)
        setFloor1(tmp1)
        setFloor2(tmp2)
        setSeatSelect(props.seatDefault)


    }, [props.car])



    const onClickSeat = (e, seat: SeatModel) => {

        const tmp = e.target as HTMLElement

        if (seatSelect?.find(i => i.id === seat.id)) {
            tmp.classList.remove(`${styles.active}`);
            setSeatSelect(seatSelect?.filter(i => i.id !== seat.id))
            props.remove(seat)
        }
        else {
            tmp.classList.add(`${styles.active}`);
            setSeatSelect([...seatSelect, seat])
            props.add(seat)
        }

    }

    return (
        <>
            {
                seatSelect &&


                <div className={styles.container_booking_seat}>

                    <div className={styles.info}>
                        <span className={styles.time}>B???t ?????u: 19:00 &nbsp; &nbsp; &nbsp; ?????n: 03:30</span>

                        <div className={styles.box_direction}>
                            <div className={styles.direction_right}>
                                <div className={styles.direction_right_from}>
                                    <MyLocationIcon className={styles.direction_MyAllocate} />
                                    <span className={styles.from_location}>C???ng 3 b???n xe Mi???n ????ng C???ng 3 b???n xe Mi???n ????ng </span>
                                </div>


                                <span className={styles.distance}>Kho???ng c??ch: 310km - 8 ti???ng</span>

                                <div className={styles.direction_right_to}>
                                    <LocationOnIcon className={styles.direction_locationOn} />
                                    <span className={styles.to_location}>C??ng 3 B???n xe Mi???n ????ng</span>
                                </div>
                            </div>
                        </div>


                    </div>

                    <Grid container className={styles.seat}>
                        <Grid item xs={12} sm={10} md={8} lg={8} className={styles.box}>


                            <div className={styles.floor}>
                                <span className={styles.title}>T???ng m???t</span>
                                <div className={styles.list}>
                                    {
                                        floor1?.map((item, index) => {
                                            const active = (seatSelect.findIndex(i => i.id === item.id) !== -1) ? true : false
                                            return (

                                                <div
                                                    className={`${styles.item} ${active ? styles.active : ""} ${item.status === StatusSeat["???? ?????t"] ? styles.disable : ""}`}
                                                    key={index}
                                                    onClick={(e) => { item.status === StatusSeat["Tr???ng"] && onClickSeat(e, item) }}
                                                >
                                                    H:{item.col}<br />G:{item.row}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            {
                                floor2?.length > 0 &&
                                <div className={styles.floor}>
                                    <span className={styles.title}>T???ng hai</span>
                                    <div className={styles.list}>
                                        {
                                            floor2?.map((item, index) => {
                                                const active = (seatSelect.findIndex(i => i.id === item.id) !== -1) ? true : false
                                                return (

                                                    <div
                                                        className={`${styles.item} ${active ? styles.active : ""} ${item.status === StatusSeat["???? ?????t"] ? styles.disable : ""}`}
                                                        key={index}
                                                        onClick={(e) => { item.status === StatusSeat["Tr???ng"] && onClickSeat(e, item) }}
                                                    >
                                                        H:{item.col}<br />G:{item.row}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            }

                        </Grid>





                        <div className={styles.status}>
                            <div className={styles.status_item}>
                                <div className={styles.blue}></div>
                                <span className={styles.status_name}>Tr???ng</span>
                            </div>

                            <div className={styles.status_item}>
                                <div className={styles.disable}></div>
                                <span className={styles.status_name}>???? ?????t</span>
                            </div>

                            <div className={styles.status_item}>
                                <div className={styles.select}></div>
                                <span className={styles.status_name}>???? ch???n</span>
                            </div>

                        </div>

                        {
                            seatSelect?.length > 0 &&
                            <>
                                <span className={styles.count}>
                                    <span className={styles.count1}>
                                        {seatSelect?.length} gh???:   &nbsp;
                                    </span>
                                    <span className={styles.count2}>
                                        {seatSelect?.map((item, index) => {
                                            return (
                                                <>
                                                    {`H${item.col}G${item.row}`}{index < seatSelect.length - 1 ? ", " : ""}
                                                </>
                                            )
                                        })}
                                    </span>
                                </span>
                                <span className={styles.totalPrice}>
                                    T???ng ti???n: {Number(1000000).toLocaleString()}??
                                </span>
                            </>
                        }


                    </Grid>



                </div>}
        </>
    )
}