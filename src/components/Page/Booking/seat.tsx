import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styles from "./booking.module.scss";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Grid, Button, IconButton, Alert, Snackbar } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { ServiceType } from '../../Shared/Models/Everything';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { CarModel } from '../../Shared/Models/CarModel';
import { StopPointModel } from '../../Shared/Models/StopPointModel';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import { SeatModel } from '../../Shared/Models/SeatModel';
import { RouteModel } from '../../Shared/Models/RouteModel';


export const Booking_Seat = (props: { car: CarModel }) => {

    const [floor1, setFloor1] = useState<SeatModel[]>()
    const [floor2, setFloor2] = useState<SeatModel[]>()
    const [load, setReload] = useState(0)
    const [seatSelect, setSeatSelect] = useState<SeatModel[]>([])

    useEffect(() => {

        const tmp1 = props.car?.seats?.filter(i => i.floor === 0)
        const tmp2 = props.car?.seats?.filter(i => i.floor === 1)
        setFloor1(tmp1)
        setFloor2(tmp2)

    }, [props.car])



    const onClickSeat = (e, seat: SeatModel) => {

        const tmp = e.target as HTMLElement

        if (seatSelect?.find(i => i.id === seat.id)) {
            tmp.classList.remove(`${styles.active}`);
            setSeatSelect(seatSelect?.filter(i => i.id !== seat.id))
        }
        else {
            tmp.classList.add(`${styles.active}`);
            setSeatSelect([...seatSelect, seat])
        }
    }

    return (
        <>

            <div className={styles.container_booking_seat}>

                <div className={styles.info}>
                    <span className={styles.time}>Bắt đầu: 19:00 &nbsp; &nbsp; &nbsp; Đến: 03:30</span>

                    <div className={styles.box_direction}>
                        <div className={styles.direction_right}>
                            <div className={styles.direction_right_from}>
                                <MyLocationIcon className={styles.direction_MyAllocate} />
                                <span className={styles.from_location}>Cổng 3 bến xe Miền Đông </span>
                            </div>



                            <div className={styles.direction_right_to}>
                                <LocationOnIcon className={styles.direction_locationOn} />
                                <span className={styles.to_location}>Công 3 Bến xe Miền Đông</span>
                            </div>
                        </div>
                    </div>

                    <span className={styles.distance}>Khoảng cách: 310km - 8 tiếng</span>

                </div>

                <Grid container className={styles.seat}>
                    <Grid item xs={12} sm={10} md={8} lg={8} className={styles.box}>


                        <div className={styles.floor}>
                            <span className={styles.title}>Tầng dưới</span>
                            <div className={styles.list}>
                                {
                                    floor1?.map((item, index) => {
                                        return (
                                            <div className={styles.item} key={index}
                                                onClick={(e) => { onClickSeat(e, item) }}
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
                                <span className={styles.title}>Tầng Trên</span>
                                <div className={styles.list}>
                                    {
                                        floor2?.map((item, index) => {
                                            return (
                                                <div className={styles.item} key={index}
                                                    onClick={(e) => { onClickSeat(e, item) }}
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

                    {
                        seatSelect?.length > 0 &&
                        <span className={styles.count}>
                            <span className={styles.count1}>
                                {seatSelect?.length} ghế:   &nbsp;
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
                    }



                    <div className={styles.status}>
                        <div className={styles.status_item}>
                            <div className={styles.blue}></div>
                            <span className={styles.status_name}>Trống</span>
                        </div>

                        <div className={styles.status_item}>
                            <div className={styles.disable}></div>
                            <span className={styles.status_name}>Đã đặt</span>
                        </div>

                        <div className={styles.status_item}>
                            <div className={styles.select}></div>
                            <span className={styles.status_name}>Đã chọn</span>
                        </div>

                    </div>


                </Grid>



            </div>
        </>
    )
}