import styles from "./infoCustomer.module.scss";
import React, { useEffect, useState } from 'react';
import { Grid, TextField, Box, FormControl, MenuItem, Select, Typography } from '@mui/material'
import { CityModel } from "../../Shared/Models/CityModel";
import { DistrictModel } from "../../Shared/Models/DistrictModel";

export const Booking_Info_Customer = () => {

    const [listCity, setListCity] = useState<CityModel[]>()
    const [city, setCity] = useState<CityModel>();
    const [listDistrict, setListDistrict] = useState<DistrictModel[]>()
    const [district, setDistrict] = useState<DistrictModel>();

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
        loadData();
    })

    useEffect(() => {
        if (city) {
            fetch(process.env.NEXT_PUBLIC_API.concat(`/districts/${city.id}`), {
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
                        console.log("get district status >= 500 ", data);
                        return
                    }
                    else if (res.status >= 400) {
                        console.log("get district status >= 400 ", data);
                        return
                    }
                    setListDistrict(data.data)

                })
                .catch((error) => {
                    console.log(" error >>>>>>", error);
                })
        }
    }, [city])

    return (
        <>

            <Grid container>
                <Grid item xs={12} sm={10} md={12} lg={12} className={styles.container}>
                   
                    <Grid container>
                        <Grid item xs={12} sm={10} md={12} lg={12} className={styles.info}>
                            <span className={styles.title} >Thông tin khách hàng</span>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                                style={{ display: 'flex', flexDirection: 'column', margin: '5px 10px' }}
                                >
                                <span className={styles.title_input}>Họ và tên khách hàng</span>
                                <TextField 
                                    id="outlined-basic"
                                    className={styles.input}
                                    variant="outlined"
                                    required
                                    placeholder='Họ và tên khách hàng'
                                    size='small'
                                    type='text'
                                />

                                <span className={styles.title_input}>Số điện thoại</span>
                                <TextField 
                                    id="outlined-basic"
                                    className={styles.input}
                                    variant="outlined"
                                    required
                                    placeholder='Số điện thoại'
                                    size='small'
                                    type='text'
                                />

                                <span className={styles.title_input}>Email</span>
                                <TextField 
                                    id="outlined-basic"
                                    className={styles.input}
                                    variant="outlined"
                                    required
                                    placeholder='Nhập email'
                                    size='small'
                                    type='email'
                                />

                                <div className={styles.area}>
                                    <div className={styles.wrap}>
                                        <p className={styles.city}>Tỉnh/TP</p>
                                        <FormControl
                                            size="small"
                                            className={styles.selection}
                                        >
                                            <Select
                                                required={true}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={city}
                                                MenuProps={MenuProps}
                                                style={{background: "white"}}
                                            >

                                                {
                                                    listCity?.map((item, index) => (
                                                        <MenuItem
                                                            sx={{ width: '220px' }}
                                                            key={index}
                                                            value={item.name}
                                                            onClick={() => {
                                                                setCity(item)
                                                            }}
                                                        >
                                                            <Typography noWrap>
                                                                {item.name}
                                                            </Typography>
                                                        </MenuItem>
                                                    ))
                                                }

                                            </Select>
                                        </FormControl>
                                    </div>

                                    <div className={styles.wrap}>
                                        <p className={styles.district}>Quận/Huyện</p>
                                        <FormControl
                                            size="small"
                                            className={styles.selection}
                                        >
                                            <Select
                                                required={true}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={district}
                                                MenuProps={MenuProps}
                                                style={{background: "white"}}
                                            >

                                                {
                                                    listDistrict?.map((item, index) => (
                                                        <MenuItem
                                                            sx={{ width: '220px' }}
                                                            key={index}
                                                            value={item.name}
                                                            onClick={() => {
                                                                setDistrict(item)
                                                            }}
                                                        >
                                                            <Typography noWrap>
                                                                {item.name}
                                                            </Typography>
                                                        </MenuItem>
                                                    ))
                                                }

                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                
                            </Box>

                        </Grid>
                    </Grid>
                    
                    <Grid container>
                        <Grid item xs={12} sm={10} md={12} lg={12} className={styles.rules}>
                            <span className={styles.title}>Điều khoản và lưu ý</span>
                            <Typography component="p" className={styles.text} paragraph={true}>
                            (*) Quý khách vui lòng mang email có chứa mã vé đến văn
                            phòng để đổi vé lên xe trước giờ xuất bến ít nhất 60 phút
                            để chúng tôi trung chuyển.<br/>
                            (*) Thông tin hành khách phải chính xác, nếu không sẽ
                            không thể lên xe hoặc hủy/đổi vé.<br/>
                            (*) Quý khách không được đổi/trả vé vào các ngày Lễ Tết
                            (ngày thường quý khách được quyền chuyển đổi hoặc hủy
                            vé một lần duy nhất trước giờ xe chạy 24 giờ), phí hủy vé
                            10%.<br/>
                            (*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên
                            hệ số điện thoại 1900 6067 (tel:1900 6067) trước khi đặt
                            vé. Chúng tôi không đón/trung chuyển tại những điểm xe
                            trung chuyển không thể tới được.
                            </Typography>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>

        </>
    )
}