import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, Alert, Snackbar } from '@mui/material';
import styles from './styles/createCar.module.scss';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { ServiceType } from '../../Shared/Models/Everything';
import { CarModel } from '../../Shared/Models/CarModel';
import BorderColorIcon from '@mui/icons-material/BorderColor';
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

export function UpdateCarManager(props: { stateProps: boolean, close: any, reloadPage: any, manage: CarManagerModel, id: string }) {
    const [isShow, setIsShow] = useState(false)

    const [name, setName] = useState(props.manage.name);
    const [description, setDescription] = useState(props.manage.description);

    useEffect(() => {
        setName(props.manage.name)
        setDescription(props.manage.description)
        setIsShow(props.stateProps)
    }, [props.stateProps])
    // console.log("car", props.car);

    const handleSubmit = () => {

        const inputFile = document.getElementById("inputFile") as HTMLInputElement;
        // console.log("handle submit create car => ", Car);

        const formData = new FormData();

        formData.append("Id", props.id)
        formData.append("LogoPath", inputFile.files[0])
        formData.append("Name", name)
        formData.append("Description", description)

        fetch(process.env.NEXT_PUBLIC_API.concat("/cars-manager/update-manager"), {
            method: "POST",
            body: formData,
        })
            .then(async (res) => {

                const data = await res.json()

                if (res.status >= 500) {
                    console.log("update carManager status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log("update carManager status >= 400 ", data);
                    handleOpenNotify("Cập nhật nhà xe thất bại!", "error")
                    return
                }

                console.log("update manager => ", data.data);

                handleOpenNotify("Cập nhật nhà xe thành công!", "success")

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
                            {"Cập nhật thông tin nhà xe"}
                        </Typography>
                        <div className={styles.container}>

                            <div className={styles.img}>
                                <div className={styles.image}>
                                    <img src={process.env.NEXT_PUBLIC_API.concat(props.manage.logoPath)} id={"output"}></img>
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

                            <form noValidate autoComplete="off" id={styles.info} encType="multipart/form-data">

                                <div className={styles.wrap}>
                                    <p >Tên nhà xe</p>
                                    <TextField
                                        style={{ width: "240px" }}
                                        required={true}
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={name}
                                        defaultValue={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className={styles.wrap}>
                                    <p>Mô tả</p>
                                    <TextField
                                        style={{ width: "240px" }}
                                        maxRows={8}
                                        minRows={5}
                                        multiline={true}
                                        required={true}
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={description}
                                        defaultValue={description}
                                        onChange={(e) => setDescription(e.target.value)}
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
                                type="submit"
                                onClick={handleSubmit}
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