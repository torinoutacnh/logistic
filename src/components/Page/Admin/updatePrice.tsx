import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, FormControl, Select, MenuItem, SelectChangeEvent, Alert, Snackbar } from '@mui/material';
import styles from './styles/createCar.module.scss';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { env, ServiceType } from '../../Shared/Models/Everything';
import { CarModel } from '../../Shared/Models/CarModel';
import BorderColorIcon from '@mui/icons-material/BorderColor';

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

export function UpdatePrice(props?: { stateProps: boolean, close: any, reloadPage: any, car: CarModel, id: string }) {

    const [isShow, setIsShow] = useState(false)
    const [travelPrice, setTravelPrice] = useState(props.car?.travelPrice)
    const [shipPrice, setShipPrice] = useState(props.car?.shipPrice)

    useEffect(() => {
        setIsShow(props.stateProps)
    }, [props.stateProps])


    const handleSubmit = () => {


        var priceCar = {
            id: props.id,
            shipPrice: shipPrice,
            travelPrice: travelPrice
        }


        fetch(env.REACT_APP_API.concat("/car/update-car-price"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer ".concat(user.token),
            },
            body: JSON.stringify(priceCar),
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

                setShipPrice(priceCar.shipPrice)
                setTravelPrice(priceCar.travelPrice)
                handleOpenNotify("Cập nhật giá thành công")
                props.reloadPage()

            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })


        props.close();
    }

    const onCloseModal = () => {
        setShipPrice(props.car.shipPrice)
        setTravelPrice(props.car.travelPrice)
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
            {isShow ?
                <Modal
                    open={isShow}
                    onClose={() => props.close()}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} style={{ color: "black" }}>
                        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mb: 3 }}>
                            Cập nhật giá dịch vụ
                        </Typography>
                        <div className={styles.container}>


                            <form noValidate autoComplete="off" id={styles.info}>

                                <div className={styles.wrap}>
                                    <p style={{ width: "120px", textAlign: "left" }}>Giá chở hàng</p>
                                    <TextField
                                        required={true}
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={shipPrice}
                                        onChange={(e) => setShipPrice(Number(e.target.value))}
                                    />
                                </div>


                                <div className={styles.wrap}>
                                    <p style={{ width: "120px", textAlign: "left" }}>Giá chở người</p>
                                    <TextField
                                        required={true}
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={travelPrice}
                                        onChange={(e) => setTravelPrice(Number(e.target.value))}
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
                                onClick={() => { handleSubmit() }}

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