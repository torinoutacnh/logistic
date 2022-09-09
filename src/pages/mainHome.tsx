import { Input, InputAdornment, Button } from "@mui/material"
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const MainHome = () => {
    return (
        <>

            <main className={styles.main}>
                <div className={styles.background_booking}>
                </div>
                <div className={styles.booking}>
                    <h3 className={styles.booking_title}>ĐẶT XE</h3>
                    <Input
                        className={styles.booking_input}
                        placeholder={"Điểm đến"}
                        startAdornment={
                            <InputAdornment position="start">
                                <LocationOnIcon />
                            </InputAdornment>
                        }
                    />
                    <Input
                        className={styles.booking_input}
                        placeholder={"Điểm đi"}
                        startAdornment={
                            <InputAdornment position="start">
                                <LocationOnIcon />
                            </InputAdornment>
                        }
                    />
                    <Input
                        className={styles.booking_input}
                        placeholder={"Ngày đi"}
                        startAdornment={
                            <InputAdornment position="start">
                                <CalendarMonthIcon />
                            </InputAdornment>
                        }
                    />
                    <Button
                        className={styles.booking_btn}
                        variant="contained"
                        size="medium"
                        endIcon={<ArrowForwardIcon style={{ fontSize: "30px" }} />}>
                        Tìm xe
                    </Button>
                </div>

                <div className={styles.controller} >
                    <Button
                        className={styles.booking_login}
                        variant="contained"
                        size="medium"
                    >
                        Đăng nhập
                    </Button>
                    <Button
                        className={styles.booking_register}
                        variant="outlined"
                        size="medium" >
                        Đăng ký
                    </Button>
                </div>

            </main>
        </>
    )

}