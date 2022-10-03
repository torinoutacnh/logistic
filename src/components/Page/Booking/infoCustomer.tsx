import styles from "./infoCustomer.module.scss";
import React, { useEffect, useState } from 'react';
import { Grid, TextField, Box, FormControl, MenuItem, Select, Typography } from '@mui/material'
import { CityModel } from "../../Shared/Models/CityModel";
import { DistrictModel } from "../../Shared/Models/DistrictModel";
import { InfoCustomerModel } from "../../Shared/Models/InfomationCustomer";
import MuiPhoneNumber from "material-ui-phone-number";

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
                                            defaultValue={props.infoCustomer?.name}
                                            onChange={(e) => {props.onChangeName(e.target.value)}}
                                        />
        
                                        <span className={styles.title_input}>Số điện thoại</span>
                                        <MuiPhoneNumber
                                            className={styles.input}
                                            onChange={(e) => {props.onChangeTel(e)}}
                                            variant="outlined"
                                            size="small"
                                            type='tel'
                                            defaultCountry={"vn"}
                                            disableDropdown
                                            disableAreaCodes={true}
                                            countryCodeEditable={false}
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
                                            defaultValue={props.infoCustomer?.email}
                                            onChange={(e) => {props.onChangeEmail(e.target?.value)}}      
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
                                                <p className={styles.district}>Quận/Huyện</p>
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
            }
       </>
    )
}