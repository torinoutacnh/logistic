import styles from "./infoCustomer.module.scss";
import React, { useEffect, useState } from 'react';
import { Grid, TextField, Box, FormControl, MenuItem, Select, Typography } from '@mui/material'
import { CityModel } from "../../Shared/Models/CityModel";
import { DistrictModel } from "../../Shared/Models/DistrictModel";
import { InfoCustomerModel } from "../../Shared/Models/InfomationCustomer";

export const Booking_Info_Customer = (props: {onChangeName: any, onChangeTel: any, onChangeEmail: any, onChangeCity: any, onChangeDistrict: any, infoCustomer: InfoCustomerModel }) => {

    const [idCity, setIdCity] = useState('');
    const [listCity, setListCity] = useState<CityModel[]>();
    const [listDistrict, setListDistrict] = useState<DistrictModel[]>();

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

        const res_district = await fetch(process.env.NEXT_PUBLIC_API.concat(`/districts/${props.infoCustomer?.city?.id}`), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer ".concat(user.token),
            },// body: JSON.stringify(form.getFieldsValue()),
        })
        if (res_district.status <= 200)
        {
            const data_res_district = await res_district.json()
            setListDistrict(data_res_district.data)
        }

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
    },[])

    useEffect(() => {
        if (idCity) {
            fetch(process.env.NEXT_PUBLIC_API.concat(`/districts/${idCity}`), {
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
    }, [idCity])

    return (
       <>
            {listCity &&
                <>
                    <Grid container>
                        <Grid item xs={12} sm={10} md={12} lg={12} className={styles.container}>
                            
                            <Grid container>
                                <Grid item xs={12} sm={10} md={12} lg={12} className={styles.info}>
                                    <span className={styles.title} >Th??ng tin kh??ch h??ng</span>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                        style={{ display: 'flex', flexDirection: 'column', margin: '5px 10px' }}
                                        >
                                        <span className={styles.title_input}>H??? v?? t??n kh??ch h??ng</span>
                                        <TextField 
                                            id="outlined-basic"
                                            className={styles.input}
                                            variant="outlined"
                                            required
                                            placeholder='H??? v?? t??n kh??ch h??ng'
                                            size='small'
                                            type='text'
                                            defaultValue={props.infoCustomer.name}
                                            onChange={(e) => {props.onChangeName(e.target.value)}}
                                        />
        
                                        <span className={styles.title_input}>S??? ??i???n tho???i</span>
                                        <TextField 
                                            id="outlined-basic"
                                            className={styles.input}
                                            variant="outlined"
                                            required
                                            placeholder='S??? ??i???n tho???i'
                                            size='small'
                                            type='text'
                                            defaultValue={props.infoCustomer.tel}
                                            onChange={(e) => {props.onChangeTel(e.target.value)}}
                                        />
        
                                        <span className={styles.title_input}>Email</span>
                                        <TextField 
                                            id="outlined-basic"
                                            className={styles.input}
                                            variant="outlined"
                                            required
                                            placeholder='Nh???p email'
                                            size='small'
                                            type='email'
                                            defaultValue={props.infoCustomer.email}
                                            onChange={(e) => {props.onChangeEmail(e.target.value)}}      
                                        />
        
                                        <div className={styles.area}>
                                            <div className={styles.wrap}>
                                                <p className={styles.city}>T???nh/TP</p>
                                                <FormControl
                                                    size="small"
                                                    className={styles.selection}
                                                >
                                                    <Select
                                                        required={true}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        MenuProps={MenuProps}
                                                        style={{background: "white"}}
                                                        defaultValue={props.infoCustomer?.city?.name}
                                                    >
        
                                                        {
                                                            listCity?.map((item, index) => (
                                                                <MenuItem
                                                                    sx={{ width: '220px' }}
                                                                    key={index}
                                                                    value={item.name}
                                                                    onClick={() => {
                                                                        props.onChangeCity(item);
                                                                        setIdCity(item.id)
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
                                                <p className={styles.district}>Qu???n/Huy???n</p>
                                                <FormControl
                                                    size="small"
                                                    className={styles.selection}
                                                >
                                                    <Select
                                                        required={true}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        MenuProps={MenuProps}
                                                        style={{background: "white"}}
                                                        defaultValue={props.infoCustomer?.district?.name}
                                                    >
        
                                                        {
                                                            listDistrict?.map((item, index) => (
                                                                <MenuItem
                                                                    sx={{ width: '220px' }}
                                                                    key={index}
                                                                    value={item.name}
                                                                    onClick={() => {props.onChangeDistrict(item)}}
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
                                    <span className={styles.title}>??i???u kho???n v?? l??u ??</span>
                                    <Typography component="p" className={styles.text} paragraph={true}>
                                    (*) Qu?? kh??ch vui l??ng mang email c?? ch???a m?? v?? ?????n v??n
                                    ph??ng ????? ?????i v?? l??n xe tr?????c gi??? xu???t b???n ??t nh???t 60 ph??t
                                    ????? ch??ng t??i trung chuy???n.<br/>
                                    (*) Th??ng tin h??nh kh??ch ph???i ch??nh x??c, n???u kh??ng s???
                                    kh??ng th??? l??n xe ho???c h???y/?????i v??.<br/>
                                    (*) Qu?? kh??ch kh??ng ???????c ?????i/tr??? v?? v??o c??c ng??y L??? T???t
                                    (ng??y th?????ng qu?? kh??ch ???????c quy???n chuy???n ?????i ho???c h???y
                                    v?? m???t l???n duy nh???t tr?????c gi??? xe ch???y 24 gi???), ph?? h???y v??
                                    10%.<br/>
                                    (*) N???u qu?? kh??ch c?? nhu c???u trung chuy???n, vui l??ng li??n
                                    h??? s??? ??i???n tho???i 1900 6067 (tel:1900 6067) tr?????c khi ?????t
                                    v??. Ch??ng t??i kh??ng ????n/trung chuy???n t???i nh???ng ??i???m xe
                                    trung chuy???n kh??ng th??? t???i ???????c.
                                    </Typography>
                                </Grid>
                            </Grid>
        
                        </Grid>
                    </Grid>
        
                </>
            }
       </>
    )
}