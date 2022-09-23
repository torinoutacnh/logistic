import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, FormControl, Select, MenuItem, Alert, Snackbar } from '@mui/material';
import styles from './styles/createCar.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { env } from '../../Shared/Models/Everything';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { StopPointModel } from '../../Shared/Models/StopPointModel';
import { CityModel } from '../../Shared/Models/CityModel';
import { DistrictModel } from '../../Shared/Models/DistrictModel';
import { WardModel } from '../../Shared/Models/WardModel';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    textAlign: 'center',
};

export function UpdateStopPoint(props: { stateProps: boolean, close: any, reloadPage: any, stopPoint: StopPointModel }) {
    const [isShow, setIsShow] = useState(false)

    const [idCity, setIdCity] = useState<string>();
    const [idDistrict, setIdDistrict] = useState<string>();
    const [idWard, setIdWard] = useState<string>();

    const [cityName, setCityName] = useState<string>();
    const [districtName, setDistrictName] = useState<string>();
    const [wardName, setWardName] = useState<string>();
    const [street, setStreet] = useState<string>();
    const [houseNumber, setHouseNumber] = useState<string>();

    const [listCity, setListCity] = useState<CityModel[]>()
    const [listDistrict, setListDistrict] = useState<DistrictModel[]>()
    const [listWard, setListWard] = useState<WardModel[]>()





    const [openNotify, setOpenNofity] = useState(false);
    const [messageNotify, setMessageNotify] = useState("")

    const handleOpenNotify = (message: string) => {
        setMessageNotify(message)
        setOpenNofity(true)
    }

    const handleCloseNotify = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenNofity(false);
    };

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

        setHouseNumber(props.stopPoint?.houseNumber)
        setStreet(props.stopPoint?.street)

        const res_city = await fetch(env.REACT_APP_API.concat("/cities"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer ".concat(user.token),
            },// body: JSON.stringify(form.getFieldsValue()),
        })
        if (res_city.status > 200) { return }
        const data_res_city = await res_city.json()
        const list_city_tmp: CityModel[] = data_res_city.data
        const city_tmp = list_city_tmp?.find(item => item.name === props.stopPoint?.city)
        setCityName(city_tmp?.name)
        setIdCity(city_tmp?.id)
        setListCity(list_city_tmp)


        const res_district = await fetch(env.REACT_APP_API.concat(`/districts/${city_tmp?.id}`), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer ".concat(user.token),
            },// body: JSON.stringify(form.getFieldsValue()),
        })
        if (res_district.status > 200) { return }
        const data_res_district = await res_district.json()
        const list_district_tmp: DistrictModel[] = data_res_district.data
        const district_tmp = list_district_tmp?.find(item => item.name === props.stopPoint?.district)
        setDistrictName(district_tmp?.name)
        setIdDistrict(district_tmp?.id)
        setListDistrict(list_district_tmp)


        const res_ward = await fetch(env.REACT_APP_API.concat(`/wards/${district_tmp?.id}`), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer ".concat(user.token),
            },// body: JSON.stringify(form.getFieldsValue()),
        })
        if (res_ward.status > 200) { return }
        const data_res_ward = await res_ward.json()
        const list_ward_tmp: WardModel[] = data_res_ward.data
        const ward_tmp = list_ward_tmp?.find(item => item.name === props.stopPoint?.ward)
        setWardName(ward_tmp?.name)
        setIdWard(ward_tmp?.id)
        setListWard(list_ward_tmp)


    }

    useEffect(() => {
        setIsShow(props.stateProps)
        loadData()
    }, [props.stateProps])



    const handleChangeCityName = (data: CityModel) => {
        // console.log(" City click => ", data);
        setCityName(data.name);
        setIdCity(data.id);
        setListWard([])
    };

    //////////////////////////////////////////////////////

    useEffect(() => {
        if (idCity) {
            fetch(env.REACT_APP_API.concat(`/districts/${idCity}`), {
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

    const handleChangeDistrictName = (data: DistrictModel) => {
        // console.log(" District click => ", data);
        setDistrictName(data.name);
        setIdDistrict(data.id);
    };

    /////////////////////////////////////////////////////////////

    useEffect(() => {
        if (idDistrict) {
            fetch(env.REACT_APP_API.concat(`/wards/${idDistrict}`), {
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
                        console.log("get ward status >= 500 ", data);
                        return
                    }
                    else if (res.status >= 400) {
                        console.log("get ward status >= 400 ", data);
                        return
                    }
                    setListWard(data.data)

                })
                .catch((error) => {
                    console.log(" error >>>>>>", error);
                })
        }
    }, [idDistrict])

    const handleChangeWardName = (data: WardModel) => {
        // console.log(" Ward click => ", data);
        setWardName(data.name);
        setIdWard(data.id);
    };

    /////////////////////////////////////////////////////////////

    const handleUpdate = () => {

        const StopPointUpdate = {
            cityId: idCity,
            districtId: idDistrict,
            wardId: idWard,
            street: street,
            houseNumber: houseNumber,
        }

        console.log("handle update stop point => ", StopPointUpdate);
        console.log("id update stop point => ", props.stopPoint.id);
        // console.log("cityName => ", cityName);
        // console.log("districtName => ", districtName);
        // console.log("wardName => ", wardName);

        fetch(env.REACT_APP_API.concat(`/stop-point/update-point-location/${props.stopPoint.id}`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer ".concat(user.token),
            },
            body: JSON.stringify(StopPointUpdate),
        })
            .then(async (res) => {

                const data = await res.json()

                if (res.status >= 500) {
                    console.log("update point location status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log("update point location status >= 400 ", data);
                    return
                }

                console.log("update point location => ", data.data);

                // setCityName(props.stopPoint.city);
                // setDistrictName(props.stopPoint.district);
                // setWardName(props.stopPoint.ward);
                // setStreet(props.stopPoint.street);
                // setHouseNumber(props.stopPoint.houseNumber);

                handleOpenNotify("Cập nhật điểm dừng thành công")
                props.reloadPage()

            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })

        props.close();
    }

    return (
        <>
            {(isShow && listCity && listDistrict && listWard) ?
                <Modal
                    open={isShow}
                    onClose={() => props.close()}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} style={{ color: "black" }}>
                        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mb: 3 }}>
                            Cập nhật điểm dừng
                        </Typography>
                        <div className={styles.container}>

                            <form noValidate autoComplete="off" id={styles.info}>
                                <div className={styles.wrap}>
                                    <p>Tỉnh/TP</p>
                                    <FormControl
                                        size="small"
                                        className={styles.selection}
                                    >
                                        <Select
                                            required={true}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            MenuProps={MenuProps}
                                            value={cityName}
                                            defaultValue={props.stopPoint?.city}
                                        >
                                            {
                                                listCity?.map((item, index) => (
                                                    <MenuItem
                                                        sx={{ width: '220px' }}
                                                        key={index}
                                                        value={item.name}
                                                        onClick={() => { handleChangeCityName(item) }}
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
                                    <p>Quận/Huyện</p>
                                    <FormControl
                                        size="small"
                                        className={styles.selection}
                                    >
                                        <Select
                                            required={true}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={districtName}
                                            MenuProps={MenuProps}
                                            defaultValue={props.stopPoint?.district}
                                        >

                                            {
                                                listDistrict?.map((item, index) => (
                                                    <MenuItem
                                                        sx={{ width: '220px' }}
                                                        key={index}
                                                        value={item.name}
                                                        onClick={() => { handleChangeDistrictName(item) }}
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
                                    <p>Phường/Xã</p>
                                    <FormControl
                                        size="small"
                                        className={styles.selection}
                                    >
                                        <Select
                                            required={true}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={wardName}
                                            MenuProps={MenuProps}
                                            defaultValue={props.stopPoint?.ward}
                                        >

                                            {
                                                listWard?.map((item, index) => (
                                                    <MenuItem
                                                        sx={{ width: '220px' }}
                                                        key={index}
                                                        value={item.name}
                                                        onClick={() => { handleChangeWardName(item) }}
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
                                    <p>Tên đường</p>
                                    <TextField
                                        required={true}
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={street}
                                        defaultValue={props.stopPoint?.street}
                                        onChange={(e) => setStreet(e.target.value)}
                                    />
                                </div>

                                <div className={styles.wrap}>
                                    <p>Số nhà</p>
                                    <TextField
                                        required={true}
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={houseNumber}
                                        defaultValue={props.stopPoint?.houseNumber}
                                        onChange={(e) => setHouseNumber(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className={styles.action}>
                            <Button
                                size='small'
                                variant="outlined"
                                startIcon={<BorderColorIcon />}
                                className={styles.btnCreate}
                                onClick={handleUpdate}

                            >
                                Cập nhật
                            </Button>
                            <Button
                                size='small'
                                variant="outlined"
                                startIcon={<CloseIcon />}
                                className={styles.btnCancel}
                                onClick={() => { props.close() }}
                            >
                                Hủy bỏ
                            </Button>
                        </div>
                    </Box>

                </Modal>
                :
                <></>

            }
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                key={"top right"}
                open={openNotify}
                autoHideDuration={3000}
                onClose={handleCloseNotify}
            >
                <Alert
                    color="info"
                    onClose={handleCloseNotify}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {messageNotify}
                </Alert>
            </Snackbar>
        </>
    );
}