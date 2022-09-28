import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styles from "./pay.module.scss";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Grid, Button, IconButton, Alert, Snackbar, FormControlLabel, Radio, RadioGroup } from '@mui/material'
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
import imgTest from "../../../styles/img/imgTest.jpg"

export const Booking_Pay = () => {

    const options = [
        { image: imgTest, name: "Thẻ quốc Visa/MasterCard/JCB" },
        { image: imgTest, name: "Thẻ ATM nội địa" },
        { image: imgTest, name: "Ví MOMO" },
        { image: imgTest, name: "Ví ZaloPay" },
        { image: imgTest, name: "Ví VNPay" },
        { image: imgTest, name: "Ví ShopeePay" }
    ]


    return (
        <>

            <div className={styles.container_pay}>

                <h1 className={styles.header}>Thông tin vé và thanh toán</h1>

                <div className={styles.info}>

                    <div className={styles.box}>
                        <h3 className={styles.header_box}> Thông tin hành khách </h3>
                        <div className={styles.content_box}>

                            <div className={styles.item}>
                                <span className={styles.label}>
                                    Họ tên:
                                </span>
                                <span className={styles.content}>
                                    Nguyễn Văn A Nguyễn Văn A Nguyễn Văn ANguyễn Văn A
                                </span>
                            </div>

                            <div className={styles.item}>
                                <span className={styles.label}>
                                    SĐT:
                                </span>
                                <span className={styles.content}>
                                    0338786222
                                </span>
                            </div>

                            <div className={styles.item}>
                                <span className={styles.label}>
                                    Email:
                                </span>
                                <span className={styles.content}>
                                    vuquan201120@gmail.com
                                </span>
                            </div>

                        </div>
                    </div>

                    <div className={styles.box}>
                        <h3 className={styles.header_box}> Thông tin tuyến đi </h3>
                        <div className={styles.content_box}>

                            <div className={styles.item}>
                                <span className={styles.label}>
                                    Tuyến xe:
                                </span>
                                <span className={styles.content}>
                                    Thành phố Hồ Chí Minh - Long An
                                </span>
                            </div>

                            <div className={styles.item}>
                                <span className={styles.label}>
                                    Thời gian:
                                </span>
                                <span className={styles.content}>
                                    18:30 27/9/2022
                                </span>
                            </div>

                            <div className={styles.item}>
                                <span className={styles.label}>
                                    Điểm đi:
                                </span>
                                <span className={styles.content}>
                                    182 Cộng Hòa - Tân Bình - Tp.Hồ Chí Minh
                                </span>
                            </div>

                            <div className={styles.item}>
                                <span className={styles.label}>
                                    Điểm đến:
                                </span>
                                <span className={styles.content}>
                                    280 An Dương Vương - Quận 5 - Tp.Hồ Chí Minh
                                </span>
                            </div>


                            <div className={styles.item}>
                                <span className={styles.label}>
                                    Số ghế:
                                </span>
                                <span className={styles.content}>
                                    H1G1, H1G2
                                </span>
                            </div>



                        </div>
                    </div>

                    <h3 className={styles.totalPrice}>
                        Tổng tiền: {Number(1500000).toLocaleString()}đ
                    </h3>

                </div>

                <div className={styles.payment}>
                    <h1 className={styles.header_payment}>Phương thức thanh toán</h1>

                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12} className={styles.box_options}>

                            <RadioGroup
                                className={styles.radioGroup}
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                            >
                                {
                                    options.map((item, index) => {
                                        return (
                                            <>

                                                <FormControlLabel
                                                    className={styles.radioButton}
                                                    key={index}
                                                    value={item.name}
                                                    control={<Radio size='small' />}
                                                    label={
                                                        <div className={styles.label_radioButton}>
                                                            <div className={styles.image}>
                                                                <Image src={item.image}
                                                                    layout="fixed" width={100} height={50}
                                                                    style={{ borderRadius: "3px" }}
                                                                />
                                                            </div>
                                                            <span className={styles.name}>{item.name}</span>
                                                        </div>
                                                    }
                                                />

                                            </>
                                        )
                                    })
                                }

                            </RadioGroup>

                        </Grid>
                    </Grid>

                </div>

            </div>


        </>
    )
}