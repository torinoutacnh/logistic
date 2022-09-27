import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, FormControl, Select, MenuItem, SelectChangeEvent, Alert, Snackbar } from '@mui/material';
import styles from './styles/createCar.module.scss';
import UploadIcon from '@mui/icons-material/Upload';
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

export function UpdateCar(props: { stateProps: boolean, close: any, reloadPage: any, car: CarModel, id?: string }) {
    const [isShow, setIsShow] = useState(false)

    const [typeService, setTypeService] = useState<ServiceType>(props.car?.serviceType);
    const [carModel, setCarModel] = useState(props.car?.carModel);
    const [carColor, setCarColor] = useState(props.car?.carColor);
    const [carNumber, setCarNumber] = useState(props.car?.carNumber);
    const [tel, setTel] = useState(props.car?.tel);

    useEffect(() => {
        setIsShow(props.stateProps)
    }, [props.stateProps])

    const handleChangeType = (event: SelectChangeEvent) => {
        // console.log(event.target.value);
        setTypeService(ServiceType[event.target.value as string]);
    };

    const handleUpdate = () => {

        const inputFile = document.getElementById("inputFile") as HTMLInputElement;

        const formData = new FormData();
        formData.append("Id", `${props.id}`)
        formData.append("CarModel", carModel)
        formData.append("CarColor", carColor)
        formData.append("ImagePath", inputFile.files[0])
        formData.append("Tel", tel)
        formData.append("CarNumber", carNumber)
        formData.append("ServiceType", `${typeService}`)

        fetch(env.REACT_APP_API.concat("/car/update-car-detail"), {
            method: "POST",

            body: formData,
        }).then(async (res) => {

            const data = await res.json()

            if (res.status >= 500) {
                console.log("update car status >= 500 ", data);
                return
            }
            else if (res.status >= 400) {
                console.log("update car status >= 400 ", data);
                handleOpenNotify("Cập nhật xe thất bại!", "error")
                return
            }

            console.log("update car => ", data.data);

            setTypeService(typeService);
            setCarModel(carModel);
            setCarColor(carColor);
            setCarNumber(carNumber);
            setTel(tel);

            handleOpenNotify("Cập nhật xe thành công!", "success")
            props.reloadPage()
        })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })
        props.close();
    }

    const onCloseModal = () => {

        if (props.car !== null) {
            setTypeService(props.car.serviceType);
            setCarModel(props.car.carModel);
            setCarColor(props.car.carColor);
            setCarNumber(props.car.carNumber);
            setTel(props.car.tel);
        }
        props.close()
    }

    const [typeNotifi, setTypeNotifi] = useState("success")
    const [openNotify, setOpenNofity] = useState(false);
    const [messageNotify, setMessageNotify] = useState("")

    const handleOpenNotify = (message: string, type: string) => {
        setTypeNotifi(type)
        setMessageNotify(message)
        setOpenNofity(true)
    }

    const handleCloseNotify = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenNofity(false);
    };

    const loadFile = (event) => {
        var output = document.getElementById('output') as HTMLImageElement;
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src) // free memory
        }
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
                            {"Cập nhật thông tin xe"}
                        </Typography>

                        <div className={styles.container}>
                            <div className={styles.img}>
                                <div className={styles.image}>
                                    <img src={env.REACT_APP_API.concat(props.car.imagePath)} id={"output"}></img>
                                </div>
                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<UploadIcon />}
                                    className={styles.btnUpload}
                                    size="small"
                                >
                                    Tải ảnh lên
                                    <input hidden id={"inputFile"} accept="image/*" type="file" onChange={loadFile} />
                                </Button>
                            </div>

                            <form noValidate autoComplete="off" id={styles.info}>
                                <div className={styles.wrap}>
                                    <p>Dịch vụ</p>
                                    <FormControl
                                        size="small"
                                        className={styles.selection}
                                    >
                                        <Select
                                            required={true}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={handleChangeType}
                                            value={ServiceType[typeService]}
                                            defaultValue={ServiceType[props.car?.serviceType]}
                                        >
                                            <MenuItem
                                                key={1}
                                                value={ServiceType[1]}
                                            >
                                                {ServiceType[1]}
                                            </MenuItem>
                                            <MenuItem
                                                key={0}
                                                value={ServiceType[0]}
                                            >
                                                {ServiceType[0]}
                                            </MenuItem>

                                        </Select>
                                    </FormControl>
                                </div>

                                <div className={styles.wrap}>
                                    <p>Hãng xe</p>
                                    <TextField
                                        required={true}
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={carModel}
                                        onChange={(e) => setCarModel(e.target.value)}
                                    />
                                </div>

                                <div className={styles.wrap}>
                                    <p>Màu xe</p>
                                    <TextField
                                        required={true}
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={carColor}
                                        defaultValue={props.car?.carColor}
                                        onChange={(e) => setCarColor(e.target.value)}
                                    />
                                </div>

                                <div className={styles.wrap}>
                                    <p>BKS</p>
                                    <TextField
                                        required={true}
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={carNumber}
                                        defaultValue={props.car?.carNumber}
                                        onChange={(e) => setCarNumber(e.target.value)}
                                    />
                                </div>

                                <div className={styles.wrap}>
                                    <p>SĐT</p>
                                    <TextField
                                        defaultValue={props.car?.tel}
                                        required={true}
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={tel}
                                        onChange={(e) => setTel(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>

                        <div className={styles.action}>

                            <Button
                                size='small'
                                // type="submit"
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
                {
                    typeNotifi === "success"
                        ?
                        <Alert
                            color={"info"}
                            onClose={handleCloseNotify}
                            severity={"success"}
                            sx={{ width: '100%' }}
                        >
                            {messageNotify}
                        </Alert>
                        :
                        <Alert
                            color={"error"}
                            onClose={handleCloseNotify}
                            severity={"error"}
                            sx={{ width: '100%' }}
                        >
                            {messageNotify}
                        </Alert>
                }
            </Snackbar>
        </>
    );
}