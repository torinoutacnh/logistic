import { Button } from "@mui/material"
import styles from '../../../styles/Home.module.scss'
import * as React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export const MainHome = () => {
    const [date, setDate] = React.useState<Dayjs | null>(null);
    const [from, setFrom] = React.useState('');
    const [to, setTo] = React.useState('');

    const handleChange = (newValue: Dayjs | null) => {
        setDate(newValue);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (from && to && date) {
            console.log("Điểm đi >>", from);
            console.log("Điểm đến >>", to);
            console.log("Ngày đi >>", date.format('DD/MM/YYYY'));
        }
        setFrom('');
        setTo('');
        setDate(null);
    }

    // const { register, errors, control } = React.useForm({
    //     mode: 'all',
    //     });        

    return (
        <>

            <main className={styles.main}>
                <div className={styles.booking}>
                    <h3 className={styles.booking_title}>ĐẶT XE</h3>
                    <form noValidate autoComplete="off" id={styles.form}>
                        <p>
                            <LocationOnIcon className={styles.booking_icon} />
                            Điểm đi
                        </p>
                        <TextField
                            className={styles.booking_input}
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            required
                        // inputRef={register}
                        />

                        <p>
                            <LocationOnIcon className={styles.booking_icon} />
                            Điểm đến
                        </p>
                        <TextField
                            className={styles.booking_input}
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />

                        <p>
                            <CalendarMonthIcon className={styles.booking_icon} />
                            Ngày đi
                        </p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                className={styles.booking_input}
                                inputFormat="DD/MM/YYYY"
                                value={date}
                                onChange={handleChange}
                                renderInput={(props) => <TextField {...props} size="small" />}
                            />
                        </LocalizationProvider>

                        <Button
                            className={styles.booking_btn}
                            variant="contained"
                            size="medium"
                            endIcon={<ArrowForwardIcon style={{ fontSize: "30px" }} />}
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Tìm xe
                        </Button>
                    </form>
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