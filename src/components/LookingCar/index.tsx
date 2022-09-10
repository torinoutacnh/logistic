import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import styles from './lookingCar.module.scss'
import { Backdrop, Button, Grid, makeStyles, TextField } from '@mui/material'
import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { ClockPicker, MobileTimePicker } from '@mui/x-date-pickers';

export const LookingCar = () => {


    const [filterChair, setFilterChair] = useState<string>()
    const [filterPrice, setFilterPrice] = useState<string>()
    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs('2018-01-01T00:00:00.000Z'),
    );


    const dataSortPrice = ["Tăng dần", "Giảm dần"]
    const dataChair = ["Ghế ngồi", "Ghế nằm"]

    const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
    const open1 = Boolean(anchorEl1);
    const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClose1 = (item: string) => {
        setAnchorEl1(null);
        if (dataChair.findIndex(i => i === item) >= 0) {
            setFilterChair(item)
        }
        else {
            setFilterChair("")
        }
    };
    //////////////////////////////////////////////////////////////////////
    const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
    const open2 = Boolean(anchorEl2);
    const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = (item: string) => {
        setAnchorEl2(null);
        if (dataSortPrice.findIndex(i => i === item) >= 0) {
            setFilterPrice(item)
        }
        else {
            setFilterPrice("")
        }
    };
    //////////////////////////////////////////////////////////////////////




    const MyText = props => {
        return (
            <>
                {console.log("props", props.inputProps.value)}
                <input
                    {...props.inputProps}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    onClick={props.onClick}
                    value={props.value}
                    className="input"
                    type="text"
                />
            </>
        );
    };

    return (
        <>
            <Grid container>

                <Grid item xs={0.5} sm={0.5} md={1} xl={1}></Grid>
                <Grid item xs={11} sm={11} md={10} xl={10}>

                    <ul className={styles.filter_list}>
                        <li className={`${styles.filter_item} ${styles.background_filter}`} style={{ paddingLeft: "20px" }}>
                            Sắp xếp theo
                        </li>

                        <li className={`${styles.filter_item}`}>
                            <span className={`${styles.filter_item_title}`}>Ghế</span>
                            <div className={`${styles.filter_item_content}`} onClick={handleClick1}>
                                <span className={styles.filter_item_content_text}>
                                    {filterChair}
                                </span>
                                <KeyboardArrowDownIcon className={`${styles.filter_item_content_icon}`} />
                            </div>
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl1}
                                open={open1}
                                onClose={handleClose1}
                                TransitionComponent={Fade}
                            >
                                {
                                    dataChair.map((item, index) => {
                                        return (
                                            <MenuItem
                                                key={index}
                                                onClick={() => { handleClose1(item) }}
                                                sx={{ fontSize: "calc(1vw + 1px)" }}>
                                                {item}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Menu>

                        </li>

                        <li className={`${styles.filter_item}`}>
                            <span className={`${styles.filter_item_title}`}>Thời gian</span>
                            <span className={`${styles.filter_item_content} ${styles.background_filter}`}>
                                {/* <span className={styles.filter_item_content_text}>

                                </span> */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileTimePicker
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}

                                        renderInput={props => <MyText {...props} />}
                                    />
                                </LocalizationProvider>

                            </span>
                        </li>

                        <li className={`${styles.filter_item}`}>
                            <span className={`${styles.filter_item_title}`}>Giá</span>
                            <div className={`${styles.filter_item_content}`} onClick={handleClick2}>
                                <span className={styles.filter_item_content_text}>
                                    {filterPrice}
                                </span>
                                <KeyboardArrowDownIcon className={`${styles.filter_item_content_icon}`} />
                            </div>
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl2}
                                open={open2}
                                onClose={handleClose2}
                                TransitionComponent={Fade}
                            >
                                {
                                    dataSortPrice.map((item, index) => {
                                        return (
                                            <MenuItem
                                                key={index}
                                                onClick={() => { handleClose2(item) }}
                                                sx={{ fontSize: "calc(1vw + 1px)" }}

                                            >
                                                {item}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Menu>
                        </li>

                    </ul>




                </Grid>
                <Grid item xs={0.5} sm={0.5} md={1} xl={1}></Grid>
            </Grid>
        </>
    )
}