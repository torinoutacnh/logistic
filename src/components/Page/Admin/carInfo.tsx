import styles from './carInfo.module.scss'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Grid, TextField, Box, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Collapse, FormControl, MenuItem, Select, SelectChangeEvent, Button, IconButton, Stack, Tooltip, Menu, Divider, Badge, Dialog, DialogContent, DialogActions, Popover } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddIcon from '@mui/icons-material/Add';
import { ListiItemAdmin } from './ListItemAdmin';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupsIcon from '@mui/icons-material/Groups';
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BadgeIcon from '@mui/icons-material/Badge';
import { env, ServiceType } from '../../Shared/Models/Everything';
import { HeaderAdmin } from './headerAdmin';
import { CreateCar } from './createCar';
import imageTest from "../../../styles/img/imgTest.jpg"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { CarModel } from '../../Shared/Models/CarModel';
import { StopPointModel } from '../../Shared/Models/StopPointModel';

export const CarInfo = () => {


    const router = useRouter()
    const { id } = router.query

    const [car, setCar] = useState<CarModel>()

    useEffect(() => {
        fetch(env.REACT_APP_API.concat("/car/").concat(id as string), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer ".concat(user.token),
            },
            // body: JSON.stringify(form.getFieldsValue()),
        })
            .then(async (res) => {

                const data = await res.json()

                if (res.status >= 500) {
                    console.log("get car status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log("get car status >= 400 ", data);
                    return
                }

                console.log("get car info=> ", data.data);

                setCar(data.data)


            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })

    }, [])

    return (
        <>
            {
                car ?

                    <>
                        < Grid container className={styles.container} >

                            <Grid className={styles.left} container xs={11} sm={6.5} md={7.5} lg={7.5}>

                                <Grid item className={styles.item_left1} xs={12} sm={12} md={5.5} lg={5.5} >

                                    <Image src={imageTest} style={{ borderRadius: "5px" }} />

                                </Grid>

                                <Grid item className={styles.item_left2} xs={12} sm={12} md={5.5} lg={5.5}>
                                    <div className={styles.box_info_left2}>

                                        {car.serviceType === ServiceType["Chở hàng"] ?
                                            <>
                                                <span className={styles.text2}>
                                                    <span className={styles.title}>Tên nhà xe:</span>

                                                </span>
                                            </>
                                            :
                                            <></>
                                        }

                                        <span className={styles.text2}>
                                            <span className={styles.title}>Hãng xe:</span>
                                            {car.carModel}
                                        </span>
                                        <span className={styles.text}>
                                            <span className={styles.title}>Màu xe:</span>
                                            {car.carColor}
                                        </span>
                                        <span className={styles.text}>
                                            <span className={styles.title}>BKS:</span>
                                            {car.carNumber}
                                        </span>
                                        <span className={styles.text}>
                                            <span className={styles.title}>SĐT:</span>
                                            {car.tel}
                                        </span>
                                        <span className={styles.text}>
                                            <span className={styles.title}>Giá vé:</span>
                                            <span style={{ color: "red", fontWeight: "500" }}>
                                                {car.shipPrice > 0 ? car.shipPrice : car.travelPrice}
                                            </span>
                                        </span>
                                    </div>
                                </Grid>

                                <Grid item className={styles.item_left3} xs={12} sm={12} md={5.5} lg={5.5}>

                                    <h3 className={styles.header_left}>Tuyến</h3>
                                    <div className={styles.box_info_left_3_4}>

                                        {
                                            car.routes.map((item, index) => {

                                                const RouterFrom: StopPointModel = car.stopPoints.filter(i => i.id === item.fromId)[0]
                                                const RouterTo: StopPointModel = car.stopPoints.filter(i => i.id === item.toId)[0]

                                                return (
                                                    <>
                                                        <div className={styles.item} key={index}>

                                                            <div className={styles.item_left}>
                                                                <span className={styles.text}>
                                                                    <span className={styles.title}>Từ:</span>
                                                                    {RouterFrom.houseNumber} {RouterFrom.street} -
                                                                    {RouterFrom.ward} - {RouterFrom.district} - {RouterFrom.city}
                                                                </span>

                                                                <span className={styles.text}>
                                                                    <span className={styles.title}>Đến:</span>
                                                                    {RouterTo.houseNumber} {RouterTo.street} -
                                                                    {RouterTo.ward} - {RouterTo.district} - {RouterTo.city}
                                                                </span>
                                                            </div>
                                                            <div className={styles.item_right}>
                                                                <IconButton color="primary" size='small'>
                                                                    <BorderColorIcon fontSize='inherit' />
                                                                </IconButton>

                                                                <IconButton color="error" size='small'>
                                                                    <DeleteIcon fontSize='inherit' />
                                                                </IconButton>

                                                            </div>

                                                        </div>
                                                    </>
                                                )
                                            })
                                        }

                                    </div>

                                    <Button variant="outlined" startIcon={<AddIcon />} size="small" style={{ marginTop: "10px", marginBottom: "10px" }}>
                                        Tạo mới
                                    </Button>
                                </Grid>

                                <Grid item className={styles.item_left4} xs={12} sm={12} md={5.5} lg={5.5}>
                                    <h3 className={styles.header_left}>Điểm dừng</h3>
                                    <div className={styles.box_info_left_3_4}>

                                        {
                                            car.stopPoints.map((item, index) => {
                                                return (
                                                    <>
                                                        <div className={styles.item} key={index}>

                                                            <div className={styles.item_left}>
                                                                <span className={styles.text}>
                                                                    {item.houseNumber} {item.street} -
                                                                    {item.ward} - {item.district} - {item.city}
                                                                </span>
                                                            </div>
                                                            <div className={styles.item_right}>
                                                                <IconButton color="primary" size='small'>
                                                                    <BorderColorIcon fontSize='inherit' />
                                                                </IconButton>

                                                                <IconButton color="error" size='small'>
                                                                    <DeleteIcon fontSize='inherit' />
                                                                </IconButton>
                                                            </div>

                                                        </div>
                                                    </>
                                                )
                                            })
                                        }


                                    </div>
                                    <Button variant="outlined" startIcon={<AddIcon />} size="small" style={{ marginTop: "10px", marginBottom: "10px" }}>
                                        Tạo mới
                                    </Button>
                                </Grid>


                            </Grid>

                            <Grid className={styles.right} container xs={9} sm={3.5} md={2.5} lg={2.5} style={{ background: "orange" }}>
                                a
                            </Grid>

                        </Grid >

                    </>
                    :
                    <><h1>Loading</h1></>

            }
        </>
    )

}