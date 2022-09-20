import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, FormControl, Select, MenuItem, SelectChangeEvent, Alert, Snackbar } from '@mui/material';
import styles from './styles/createCar.module.scss';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { env, ServiceType } from '../../Shared/Models/Everything';
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

export function Create_Update_Stop_Point (props: { stateProps: boolean, close: any, reloadPage: any, stopPoint: StopPointModel, city: CityModel, district: DistrictModel, ward: WardModel, id?: string }) {
    const [isShow, setIsShow] = useState(false)

    const [cityId, setCityId] = useState<CityModel>();
    const [districtId, setDistrictId] = useState<DistrictModel>();
    const [wardId, setWardId] = useState<WardModel>();
    const [street, setStreet] = useState(props.stopPoint?.street);
    const [houseNumber, setHouseNumber] = useState(props.stopPoint?.houseNumber);

    useEffect(() => {
        setIsShow(props.stateProps)
    }, [props.stateProps])

    // const handleChangeType = (event: SelectChangeEvent) => {
    //     console.log(event.target.value);

    //     setTypeService(ServiceType[event.target.value as string]);
    // };

    // const handleChangeCarManager = (data: CarManager) => {
    //     console.log(" carmanger click => ", data);

    //     setCarManagerSelect(data);
    // };

    const handleUpdate = () => {

        const StopPoint = {
            id: props.id,
            cityId: cityId,
            districtId: districtId,
            wardId: wardId,
            street: street,
            houseNumber: houseNumber,
        }


        // console.log("handle submit create car => ", Car);


        fetch(env.REACT_APP_API.concat("/stop-point/update-stop-location"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer ".concat(user.token),
            },
            body: JSON.stringify(StopPoint),
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

                setCityId(StopPoint.cityId);
                setDistrictId(StopPoint.districtId);
                setWardId(StopPoint.wardId);
                setStreet(StopPoint.street);
                setHouseNumber(StopPoint.houseNumber);

                props.reloadPage()

            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })


        props.close();
    }

    const onCloseModal = () => {

        if (props.stopPoint !== null) {
            // setCityId(props.stopPoint.cityId);
            // setDistrictId(props.stopPoint.districtId);
            // setWardId(props.stopPoint.wardId);
            setStreet(props.stopPoint.street);
            setHouseNumber(props.stopPoint.houseNumber);
        }

        props.close()
    }

    const [openNotify, setOpenNofity] = useState(false);
    const [messageNotify, setMessageNotify] = useState("")

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

    return (
        <>
            {isShow ?
                <Modal
                    open={isShow}
                    onClose={() => props.close()}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mb: 3 }}>
                            Cập nhật điểm dừng
                        </Typography>
                        <div className={styles.container}>

                            <form noValidate autoComplete="off" id={styles.info}>
                                <div className={styles.wrap}>
                                    <p>Tỉnh/Thành phố</p>
                                    <FormControl
                                        size="small"
                                        className={styles.selection}
                                    >
                                        <Select
                                            required={true}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={handleChangeCity}
                                            value={cityId[cityId]}
                                            defaultValue={cityId[props.stopPoint?.cityId]}
                                        >
                                            {
                                                props.cityId?.map((item, index) => (
                                                    <MenuItem
                                                        sx={{ width: '220px' }}
                                                        key={index}
                                                        value={item.name}
                                                        onClick={() => { handleChangeCarManager(item) }}
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

                                {
                                    !props.stopPoint &&
                                    <>
                                        <div className={styles.wrap}>
                                            <p>Quận/huyện</p>
                                            <FormControl
                                                size="small"
                                                className={styles.selection}
                                            >
                                                <Select
                                                    required={true}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={carManagerSelect?.name}
                                                    MenuProps={MenuProps}
                                                >

                                                    {
                                                        props.carManagers?.map((item, index) => (
                                                            <MenuItem
                                                                sx={{ width: '220px' }}
                                                                key={index}
                                                                value={item.name}
                                                                onClick={() => { handleChangeCarManager(item) }}
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
                                    </>
                                }

                                <div className={styles.wrap}>
                                    <p>Tên đường</p>
                                    <TextField
                                        required={true}
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={street}
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
                                        // defaultValue={props.car?.carColor}
                                        onChange={(e) => setHouseNumber(e.target.value)}
                                    />
                                </div>                              
                                }
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
                                onClick={() => { onCloseModal() }}
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