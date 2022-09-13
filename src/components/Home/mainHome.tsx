import { Button } from "@mui/material"
import styles from '../../styles/Home.module.scss'
import * as React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export const MainHome = () => {
    const [value, setValue] = React.useState<Dayjs | null>(null);

    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
    };

    return (
        <>

            <main className={styles.main}>
                <div className={styles.booking}>
                    <h3 className={styles.booking_title}>ĐẶT XE</h3>

                    <p>
                        <LocationOnIcon className={styles.booking_icon} />
                        Điểm đi
                    </p>
                    <TextField
                        className={styles.booking_input}
                        id="outlined-basic"
                        variant="outlined"
                    />

                    <p>
                        <LocationOnIcon className={styles.booking_icon} />
                        Điểm đến
                    </p>
                    <TextField
                        className={styles.booking_input}
                        id="outlined-basic"
                        variant="outlined"
                    />

                    <p>
                        <CalendarMonthIcon className={styles.booking_icon} />
                        Ngày đi
                    </p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            className={styles.booking_input}
                            inputFormat="DD/MM/YYYY"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                    <Button
                        className={styles.booking_btn}
                        variant="contained"
                        size="medium"
                        endIcon={<ArrowForwardIcon style={{ fontSize: "30px" }} />}>
                        Tìm xe
                    </Button>

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
                </div>

            </main>
        </>
    )

}