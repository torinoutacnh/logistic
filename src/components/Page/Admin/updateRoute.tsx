import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, Alert, Snackbar } from '@mui/material';
import styles from './styles/createCar.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { env, ServiceType } from '../../Shared/Models/Everything';
import { CarModel } from '../../Shared/Models/CarModel';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { RouteModel } from '../../Shared/Models/RouteModel';

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

export function UpdateRoute(props?: { stateProps: boolean, close: any, reloadPage: any, route: RouteModel }) {

    const [isShow, setIsShow] = useState(false)

    const [fromId, setFromId] = useState('');
    const [toId, setToId] = useState('');
    const [distances, setDistances] = useState<number>();
    const [days, setDays] = useState<number>();
    const [hours, setHours] = useState<number>();
    const [minutes, setMinutes] = useState<number>();

    useEffect(() => {
        setIsShow(props.stateProps)
    }, [props.stateProps])

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

    const handleSubmit = () => {

        var Route = {
            fromId: fromId,
            toId: toId,
            distanceByKm: distances,
            day: days,
            hour: hours,
            minute: minutes,
            dailyStartTime: props.route.dailyStartTime
        }

        fetch(env.REACT_APP_API.concat("/route/update-route"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer ".concat(user.token),
            },
            body: JSON.stringify(Route),
        })
            .then(async (res) => {

                const data = await res.json()

                if (res.status >= 500) {
                    console.log("update price status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log("update price status >= 400 ", data);
                    return
                }

                console.log("update price => ", data.data);

                // setShipPrice(priceCar.shipPrice)
                // setTravelPrice(priceCar.travelPrice)
                handleOpenNotify("Cập nhật tuyến thành công")
                props.reloadPage()

            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })
        props.close();
    }

    const onCloseModal = () => {
        props.close()
    }

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

    return (
        <>
            {console.log(props.route)}
            {isShow ?
                <Modal
                    open={isShow}
                    onClose={() => props.close()}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} style={{ color: "black" }}>
                        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mb: 3 }}>
                            Cập nhật tuyến
                        </Typography>
                        <div className={styles.container}>

                            <form noValidate autoComplete="off" id={styles.info}>
                                {/* <div className={styles.wrap}>
                                    <p>Điểm đi</p>
                                    <FormControl
                                        size="small"
                                        className={styles.selection}
                                    >
                                        <Select
                                            required={true}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            MenuProps={MenuProps}
                                            value={fromId}
                                            defaultValue={props.route.fromId}
                                        >
                                            {
                                                cityId?.map((item, index) => (
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
                                </div> */}

                                {/* <div className={styles.wrap}>
                                    <p>Điểm đến</p>
                                    <FormControl
                                        size="small"
                                        className={styles.selection}
                                    >
                                        <Select
                                            required={true}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={to}
                                            MenuProps={MenuProps}
                                            defaultValue={props.route.toId}
                                        >

                                            {
                                                districtId?.map((item, index) => (
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
                                </div> */}

                                <div className={styles.wrap}>
                                    <p>Khoảng cách</p>
                                    <TextField
                                        required={true}
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={distances}
                                        defaultValue={props.route.distanceByKm}
                                        onChange={(e) => setDistances(Number(Number(e.target.value)))}
                                    />
                                </div>

                                <div className={styles.wrap}>
                                    <p>Ngày</p>
                                    <TextField
                                        required={true}
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={days}
                                        defaultValue={props.route.day}
                                        onChange={(e) => setDays(Number(Number(e.target.value)))}
                                    />
                                </div>

                                <div className={styles.wrap}>
                                    <p>Giờ</p>
                                    <TextField
                                        required={true}
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={hours}
                                        defaultValue={props.route.hour}
                                        onChange={(e) => setHours(Number(Number(e.target.value)))}
                                    />
                                </div>

                                <div className={styles.wrap}>
                                    <p>Phút</p>
                                    <TextField
                                        required={true}
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={minutes}
                                        defaultValue={props.route.minute}
                                        onChange={(e) => setMinutes(Number(Number(e.target.value)))}
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
                            // onClick={handleUpdate}

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