import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, FormControl, Select, MenuItem, SelectChangeEvent, Alert, Snackbar } from '@mui/material';
import styles from './createCar.module.scss';
import UploadIcon from '@mui/icons-material/Upload';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CloseIcon from '@mui/icons-material/Close';
import { env, ServiceType } from '../../Shared/Models/Everything';

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

export function UpdateCar( props:{stateProps: boolean, close:any}) {
    const [isShow, setIsShow] = useState(false)

    useEffect(()=>{
    setIsShow(props.stateProps)
    }, [props.stateProps])

    const dataCar = [
        "Phương Trang",
        "Hùng Cường",
        "Hoa Mai",
        "Hồng Hoa",
        "Vương Lệnh",
    ]

    const [type, setType] = useState('');

    const handleChangeType = (event: SelectChangeEvent) => {
        setTypeService(event.target.value as string);
    };

    const handleChangeName = (event: SelectChangeEvent) => {
        setCarName(event.target.value as string);
    };

    const [typeService, setTypeService] = useState('');
    const [carName, setCarName] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carColor, setCarColor] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [tel, setTel] = useState('');
    const [priceTravel, setPriceTravel] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        console.log("Dịch vụ >>", typeService);
        console.log("Tên nhà xe >>", carName);
        console.log("Hãng xe >>", carModel);
        console.log("Màu xe >>", carColor);
        console.log("BKS >>", carNumber);
        console.log("SĐT >>", tel);
        console.log("Giá vé >>", priceTravel);

        const Car = {
            serviceType: typeService,
            carModel: carModel,
            carColor: carColor,
            carNumber: carNumber,
            imagePath: '/gnhghjg',
            tel: tel,
            shipPrice: 0,
            travelPrice: priceTravel
        }

        const tmp = {
            shipPrice: 0,
            travelPrice: 200000,
            carModel: 'bwmffffffffffffffffffff',
            carColor: 'red',
            imagePath: 'image',
            tel: '543543545',
            carNumber: '62f111111',
            serviceType: 0,
            carsManagerId: 'bec05fbd-bfc7-4295-810c-c2038371662e'
          }

        fetch(env.REACT_APP_API.concat("/car/create-car"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer ".concat(user.token),
            },
            body: JSON.stringify(tmp),
        })
            .then(async (res) => {

                const data = await res.json()

                if (res.status >= 500) {
                    console.log("create car status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log("create car status >= 400 ", data);
                    return
                }

                console.log("create car => ", data.data);

                // setCar(data.data)

            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })

        console.log(JSON.stringify(tmp));
        
        setTypeService(ServiceType[1]);
        setCarName('');
        setCarModel('');
        setCarColor('');
        setCarNumber('');
        setTel('');
        setPriceTravel('');

        props.close();
    }

    const [reRender, setReRender] = useState(0)
    const [openNotify, setOpenNofity] = useState(false);
    const [messageNotify, setMessageNotify] = useState("")

    const handleCloseNotify = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenNofity(false);
    };

    const handleOpenNotify = (message: string) => {
        setMessageNotify(message)
        setOpenNofity(true)
    }

    // const onClickCreateCar = (idCar: string) => {
    //     fetch(env.REACT_APP_API.concat(`/car/create-car/`), {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             // Authorization: "Bearer ".concat(user.token),
    //         },
    //         // body: JSON.stringify(form.getFieldsValue()),
    //     })
    //         .then(async (res) => {

    //             const data = await res.json()

    //             if (res.status >= 500) {
    //                 console.log("create car status >= 500 ", data);
    //                 return
    //             }
    //             else if (res.status >= 400) {
    //                 console.log("create car status >= 400 ", data);
    //                 return
    //             }

    //             console.log("create car => ", data);
    //             handleOpenNotify("Thêm xe thành công")
    //             setReRender(pre => pre + 1)

    //         })
    //         .catch((error) => {
    //             console.log(" error >>>>>>", error);
    //         })

    // }

return (
    <>
        {isShow ? 
            <Modal
                open={isShow}
                onClose={()=>props.close()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Cập nhật thông tin xe
                    </Typography>
                    <div className={styles.container}>
                        <div className={styles.img}>
                            <div className={styles.image}>ảnh</div>
                            <Button 
                                variant="contained" 
                                component="label"
                                startIcon={<UploadIcon/>}
                                className={styles.btnUpload}
                                size="small"
                            >
                                Tải ảnh mới lên
                                <input hidden accept="image/*" multiple type="file" />
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
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={handleChangeType}
                                        value={typeService}
                                        defaultValue={ServiceType[1]}
                                    >
                                         <MenuItem
                                            key={1}
                                            value={ServiceType[1]}
                                        >
                                            Chở người
                                        </MenuItem>
                                        <MenuItem
                                            key={0}
                                            value={ServiceType[0]}
                                        >
                                            Chở hàng
                                        </MenuItem>
                                        
                                    </Select>
                                </FormControl>
                            </div>

                            <div className={styles.wrap}>
                                <p>Tên nhà xe</p>
                                <FormControl 
                                    size="small"
                                    className={styles.selection}
                                >
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={handleChangeName}
                                        value={carName}
                                        defaultValue={''}
                                    >

                                        {
                                            dataCar.map((item, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={item}
                                                >
                                                    {item}
                                                </MenuItem>
                                            )
                                            )
                                        }

                                    </Select>
                                </FormControl>
                            </div>

                            <div className={styles.wrap}>
                                <p>Hãng xe</p>
                                <TextField
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
                                    className={styles.booking_input}
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    value={carNumber}
                                    onChange={(e) => setCarNumber(e.target.value)}
                                />
                            </div>
                            
                            <div className={styles.wrap}>
                                <p>SĐT</p>
                                <TextField
                                    className={styles.booking_input}
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    value={tel}
                                    onChange={(e) => setTel(e.target.value)}
                                />
                            </div>

                            <div className={styles.wrap}>
                                <p>Giá vé</p>
                                <TextField
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
                        variant="outlined" 
                        startIcon={<BorderColorIcon />} 
                        className={styles.btnCreate}
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Cập nhật
                    </Button>
                    {/* <Button variant="outlined" startIcon={<BorderColorIcon />}>
                        Cập nhật
                    </Button> */}
                    <Button 
                        variant="outlined" 
                        startIcon={<CloseIcon />} 
                        className={styles.btnCancel}
                        onClick={()=>props.close()}
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