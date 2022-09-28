import { Button, FormControl, MenuItem, Select } from "@mui/material"
import styles from '../../../styles/Home.module.scss'
import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CityModel } from "../../Shared/Models/CityModel";
import { TimePicker } from "@mui/x-date-pickers";

export const MainHome = () => {

    const [cityFrom, setCityFrom] = useState<string>();
    const [cityTo, setCityTo] = useState<string>();
    const [time, setTime] = useState<Dayjs | null>(dayjs());

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 220,
            },
        },
    };

    const handleSubmit = e => {
        e.preventDefault();
        const lookingCar = {
            idFrom: cityFrom,
            idTo: cityTo,
            starttime: time
        }

        console.log(lookingCar);

        // if (cityFrom && cityTo && time) {
        //     console.log("Điểm đi >>", cityFrom);
        //     console.log("Điểm đến >>", cityTo);
        //     console.log("Giờ đi >>", time.format('HH:mm:ss'));
        // }
        setCityFrom('');
        setCityTo('');
        setTime(null);
    }

    const [listCity, setListCity] = useState<CityModel[]>()
    
    const loadData = async () => {

        const res_city = await fetch(process.env.NEXT_PUBLIC_API.concat("/cities"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer ".concat(user.token),
            },// body: JSON.stringify(form.getFieldsValue()),
        })
        if (res_city.status > 200) { return }
        const data_res_city = await res_city.json()
        setListCity(data_res_city.data)
    }

    useEffect(() => {
        loadData()
    })

    return (
        <>
            {listCity ?
                <main className={styles.main}>
                <div className={styles.booking}>
                    <h3 className={styles.booking_title}>ĐẶT XE</h3>
                    <form noValidate autoComplete="off" id={styles.form}>
                        <p>
                            <LocationOnIcon className={styles.booking_icon} />
                            Điểm đi
                        </p>
                        <FormControl
                            size="small"
                            className={styles.booking_input}
                        >
                            <Select
                                required={true}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={cityFrom}
                                MenuProps={MenuProps}
                            >

                                {
                                    listCity?.map((item, index) => (
                                        <MenuItem
                                            sx={{ width: '220px' }}
                                            key={index}
                                            value={item.name}
                                            onClick={() => {
                                                setCityFrom(item.id)
                                            }}
                                        >
                                            <span style={{color: "black"}}>{item.name}</span>
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>

                        <p>
                            <LocationOnIcon className={styles.booking_icon} />
                            Điểm đến
                        </p>
                        <FormControl
                            size="small"
                            className={styles.booking_input}
                        >
                            <Select
                                required={true}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={cityTo}
                                MenuProps={MenuProps}
                            >

                                {
                                    listCity?.map((item, index) => (
                                        <MenuItem
                                            sx={{ width: '220px' }}
                                            key={index}
                                            value={item.name}
                                            onClick={() => {
                                                setCityTo(item.id)
                                            }}
                                        >
                                            <span style={{color: "black"}}>{item.name}</span>
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>

                        <p>
                            <AccessTimeFilledIcon className={styles.booking_icon} />
                            Giờ đi
                        </p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                ampm={false}
                                openTo="hours"
                                views={['hours', 'minutes']}
                                inputFormat="HH:mm"
                                mask="__:__"
                                value={time}
                                onChange={(newValue) => {
                                    setTime(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} size="small" className={styles.booking_input} />}
                            />
                        </LocalizationProvider>

                        <Button
                            className={styles.booking_btn}
                            variant="contained"
                            size="medium"
                            endIcon={<ArrowForwardIcon style={{ fontSize: "20px" }} />}
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
            : <></>
            }
            
        </>
    )
}