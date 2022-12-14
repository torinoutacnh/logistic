import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, FormControl, Select, MenuItem, SelectChangeEvent, Alert, Snackbar } from '@mui/material';
import styles from './styles/createCar.module.scss';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { ServiceType } from '../../Shared/Models/Everything';
import { CarManagerModel } from '../../Shared/Models/CarManager';

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

export function CreateCar(props: { stateProps: boolean, close: any, reloadPage: any, carManagers: CarManagerModel[] }) {
    const [isShow, setIsShow] = useState(false)

    const [typeService, setTypeService] = useState<ServiceType>();
    const [carManagerSelect, setCarManagerSelect] = useState<CarManagerModel>();
    const [carModel, setCarModel] = useState('');
    const [carColor, setCarColor] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [imagePath, setImagePath] = useState('');
    const [tel, setTel] = useState('');
    const [priceTravel, setPriceTravel] = useState('');

    useEffect(() => {
        setIsShow(props.stateProps)
    }, [props.stateProps])
    // console.log("car", props.car);

    const handleChangeType = (event: SelectChangeEvent) => {
        // console.log(event.target.value);

        setTypeService(ServiceType[event.target.value as string]);
    };

    const handleChangeCarManager = (data: CarManagerModel) => {
        // console.log(" carmanger click => ", data);

        setCarManagerSelect(data);
    };

    const handleSubmit = () => {

        const inputFile = document.getElementById("inputFile") as HTMLInputElement;

        const Car = {
            shipPrice: typeService === ServiceType["Ch??? h??ng"] ? priceTravel : 0,
            travelPrice: typeService === ServiceType["Ch??? ng?????i"] ? priceTravel : 0,
            carModel: carModel,
            carColor: carColor,
            imagePath: inputFile.files[0],
            tel: tel,
            carNumber: carNumber,
            serviceType: typeService,
            carsManagerId: carManagerSelect?.id
        }
        // console.log("handle submit create car => ", Car);

        const formData = new FormData();
        formData.append("ShipPrice", `${typeService === ServiceType["Ch??? h??ng"] ? priceTravel : 0}`)
        formData.append("TravelPrice", `${typeService === ServiceType["Ch??? ng?????i"] ? priceTravel : 0}`)
        formData.append("CarModel", carModel)
        formData.append("CarColor", carColor)
        formData.append("ImagePath", inputFile.files[0])
        formData.append("Tel", tel)
        formData.append("CarNumber", carNumber)
        formData.append("ServiceType", `${typeService}`)
        formData.append("CarsManagerId", carManagerSelect?.id)

        fetch(process.env.NEXT_PUBLIC_API.concat("/car/create-car"), {
            method: "POST",
            body: formData,
        })
            .then(async (res) => {

                const data = await res.json()

                if (res.status >= 500) {
                    console.log("create car status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log("create car status >= 400 ", data);
                    handleOpenNotify("Vui l??ng nh???p ?????y ????? th??ng tin!", "error")
                    return
                }

                console.log("create car => ", data.data);
                handleOpenNotify("T???o xe th??nh c??ng!", "success")

                setTypeService(ServiceType["Ch??? ng?????i"]);
                setCarModel('');
                setCarColor('');
                setCarNumber('');
                setImagePath('');
                setTel('');
                setPriceTravel('');

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
                            {"T???o m???i th??ng tin xe"}
                        </Typography>
                        <div className={styles.container}>
                            <div className={styles.img}>
                                <div className={styles.image}>
                                    <img id={"output"}></img>
                                </div>
                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<UploadIcon />}
                                    className={styles.btnUpload}
                                    size="small"
                                >
                                    T???i ???nh l??n
                                    <input hidden id={"inputFile"} accept="image/*" type="file" onChange={loadFile} />
                                </Button>
                            </div>

                            <form noValidate autoComplete="off" id={styles.info} encType="multipart/form-data">
                                <div className={styles.wrap}>
                                    <p>D???ch v???</p>
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
                                    <p>T??n nh?? xe</p>
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

                                <div className={styles.wrap}>
                                    <p>H??ng xe</p>
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
                                    <p>M??u xe</p>
                                    <TextField
                                        required={true}
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={carColor}
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
                                        onChange={(e) => setCarNumber(e.target.value)}
                                    />
                                </div>

                                <div className={styles.wrap}>
                                    <p>S??T</p>
                                    <TextField
                                        required={true}
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={tel}
                                        onChange={(e) => setTel(e.target.value)}
                                    />
                                </div>

                                <div className={styles.wrap}>
                                    <p>Gi?? v??</p>
                                    <TextField
                                        type="number"
                                        required={true}
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={priceTravel}
                                        onChange={(e) => setPriceTravel(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>

                        <div className={styles.action}>

                            <Button
                                size='small'
                                variant="outlined"
                                startIcon={<AddIcon />}
                                className={styles.btnCreate}
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Th??m m???i
                            </Button>
                            <Button
                                size='small'
                                variant="outlined"
                                startIcon={<CloseIcon />}
                                className={styles.btnCancel}
                                onClick={() => { onCloseModal() }}
                            >
                                H???y b???
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