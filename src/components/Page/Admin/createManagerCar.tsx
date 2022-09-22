import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, FormControl, Select, MenuItem, SelectChangeEvent, Alert, Snackbar } from '@mui/material';
import styles from './styles/createCar.module.scss';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
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

export function CreateManagerCar(props?: { stateProps: boolean, close: any }) {
    // const [isShow, setIsShow] = useState(false)
    // const [name, setName] = useState('');
    // const [description, setDescription] = useState('');

    // useEffect(() => {
    //     setIsShow(props.stateProps)
    // }, [props.stateProps])

    // // const [type, setType] = useState('');

    // // const handleChangeType = (event: SelectChangeEvent) => {
    // //     console.log(event.target.value);

    // //     setTypeService(ServiceType[event.target.value as string]);
    // // };

    // // const handleChangeName = (event: SelectChangeEvent) => {
    // //     setCarName(event.target.value as string);
    // // };


    // const handleSubmit = () => {

    //     const Car = {
    //         // shipPrice: typeService === ServiceType["Chở hàng"] ? priceTravel : 0,
    //         // travelPrice: typeService === ServiceType["Chở người"] ? priceTravel : 0,
    //         // carModel: carModel,
    //         // carColor: carColor,
    //         // imagePath: "/image",
    //         // tel: tel,
    //         // carNumber: carNumber,
    //         // serviceType: typeService,
    //         // carsManagerId: "bec05fbd-bfc7-4295-810c-c2038371662e"
    //     }

    //     fetch(env.REACT_APP_API.concat("/car/create-car"), {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             // Authorization: "Bearer ".concat(user.token),
    //         },
    //         body: JSON.stringify(Car),
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

    //             console.log("create car => ", data.data);
    //             handleOpenNotify("Thêm xe thành công")

    //             // setTypeService(ServiceType["Chở người"]);
    //             // setCarName('');
    //             // setCarModel('');
    //             // setCarColor('');
    //             // setCarNumber('');
    //             // setTel('');
    //             // setPriceTravel('');

    //         })
    //         .catch((error) => {
    //             console.log(" error >>>>>>", error);
    //         })

    //     props.close();
    // }

    // const [reRender, setReRender] = useState(0)
    // const [openNotify, setOpenNofity] = useState(false);
    // const [messageNotify, setMessageNotify] = useState("")

    // const handleCloseNotify = (event?: React.SyntheticEvent | Event, reason?: string) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setOpenNofity(false);
    // };

    // const handleOpenNotify = (message: string) => {
    //     setMessageNotify(message)
    //     setOpenNofity(true)
    // }


    // return (
    //     <>
    //         {isShow ?
    //             <Modal
    //                 open={isShow}
    //                 onClose={() => props.close()}
    //                 aria-labelledby="modal-modal-title"
    //                 aria-describedby="modal-modal-description"
    //             >
    //                 <Box sx={style}>
    //                     <Typography 
    //                         id="modal-modal-title" 
    //                         variant="h5" 
    //                         component="h2" 
    //                         sx={{mb: 3}}
    //                     >
    //                         Tạo mới thông tin nhà xe
    //                     </Typography>
    //                     <div className={styles.container}>
    //                         <div className={styles.img}>
    //                             <div className={styles.logo}>logo</div>
    //                             <Button
    //                                 variant="contained"
    //                                 component="label"
    //                                 startIcon={<UploadIcon />}
    //                                 className={styles.btnUpload}
    //                                 size="small"
    //                             >
    //                                 Tải logo lên
    //                                 <input hidden accept="image/*" multiple type="file" />
    //                             </Button>
    //                         </div>

    //                         <form noValidate autoComplete="off" id={styles.info}>
    //                             <div className={styles.wrap}>
    //                                 <p>Tên nhà xe</p>
    //                                 <TextField
    //                                     required={true}
    //                                     className={styles.booking_input}
    //                                     id="outlined-basic"
    //                                     variant="outlined"
    //                                     size="small"
    //                                     value={name}
    //                                     onChange={(e) => setName(e.target.value)}
    //                                 />
    //                             </div>

    //                             <div className={styles.wrap}>
    //                                 <p>Mô tả</p>
    //                                 <TextField
    //                                     required={true}
    //                                     className={styles.booking_input}
    //                                     id="outlined-basic"
    //                                     variant="outlined"
    //                                     size="small"
    //                                     multiline
    //                                     rows={5}
    //                                     sx={{width: "223px"}}
    //                                     value={description}
    //                                     onChange={(e) => setDescription(e.target.value)}
    //                                 />
    //                             </div>
    //                         </form>

    //                     </div>
    //                     <div className={styles.action}>
    //                         <Button
    //                             variant="outlined"
    //                             startIcon={<AddIcon />}
    //                             className={styles.btnCreate}
    //                             type="submit"
    //                             onClick={handleSubmit}
    //                         >
    //                             Thêm mới
    //                         </Button>
    //                         <Button
    //                             variant="outlined"
    //                             startIcon={<CloseIcon />}
    //                             className={styles.btnCancel}
    //                             onClick={() => props.close()}
    //                         >
    //                             Hủy bỏ
    //                         </Button>
    //                     </div>
    //                 </Box>

    //             </Modal>
    //             :
    //             <></>
    //         }
    //         <Snackbar
    //             anchorOrigin={{ vertical: "top", horizontal: "right" }}
    //             key={"top right"}
    //             open={openNotify}
    //             autoHideDuration={3000}
    //             onClose={handleCloseNotify}
    //         >
    //             <Alert
    //                 color="info"
    //                 onClose={handleCloseNotify}
    //                 severity="success"
    //                 sx={{ width: '100%' }}
    //             >
    //                 {messageNotify}
    //             </Alert>
    //         </Snackbar>
    //     </>
    // );




    const handleSubmit = (event) => {
        event.preventDefault();

        const inputFile = document.getElementById("LogoPath") as HTMLInputElement;
        const inputName = document.getElementById("Name") as HTMLInputElement;
        const inputDescription = document.getElementById("Description") as HTMLInputElement;

        const formData = new FormData();

        // formData.append("Name", inputName.value);
        // formData.append("Description", inputDescription.value);
        // formData.append("LogoPath", inputFile.files[0]);

        // console.log("name", inputName.value)
        // console.log("Description", inputDescription.value)
        // console.log("LogoPath", inputFile.files[0])

        // fetch("http://45.119.84.227:5005/cars-manager/create-manager", {
        //     method: "POST",
        //     body: formData
        // }).then(async (res) => {
        //     const data = await res.json()

        //     console.log("data", data)
        // })
        //     .catch((error) => {
        //         console.log("error", error)
        //     })



    };



    return (
        <>

            <form id="form" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <input id="Name" type="text" />
                <input id="Description" type="text" />
                <input id="LogoPath" type="file" />
                <button type="submit">submit</button>
            </form>

        </>
    )
}