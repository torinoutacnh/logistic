import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, IconButton, FormControl, Select, MenuItem, SelectChangeEvent, Alert, Snackbar } from '@mui/material';
import styles from './styles/createCar.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { FloorType, StatusSeat } from '../../Shared/Models/Everything';
import { CarModel } from '../../Shared/Models/CarModel';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddIcon from '@mui/icons-material/Add';
import { SeatModel } from '../../Shared/Models/SeatModel';
import DeleteIcon from '@mui/icons-material/Delete';
import { RouteModel } from '../../Shared/Models/RouteModel';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { MappingModel } from '../../Shared/Models/MappingModel';

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

export function CreateMapping(props?: { stateProps: boolean, close: any, reloadPage: any, id: string }) {

    const [isShow, setIsShow] = useState(false)
    const [listRouter, setlistRouter] = useState<RouteModel>()
    const [routeSelect, setRouteSelect] = useState<RouteModel>()
    const [time, setTime] = useState<Dayjs | null>(dayjs());

    useEffect(() => {
        setIsShow(props.stateProps)
    }, [props.stateProps])

    const handleSubmit = () => {

        // { console.log("time", time.format('YYYY-MM-DDTHH:mm:ss[Z]')) }

        const mapping: MappingModel = {
            carId: props.id,
            routeId: "b348d9d6-8ed2-40e6-a5d0-fefac3522103",
            starttime: time.format('YYYY-MM-DDTHH:mm:ss[Z]')

        }

        fetch(process.env.NEXT_PUBLIC_API.concat(`/carRouteMapping/create-start-time`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer ".concat(user.token),
            },
            body: JSON.stringify(mapping),
        })
            .then(async (res) => {

                const data = await res.json()

                if (res.status >= 500) {
                    console.log("create mapping status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log("create mapping status >= 400 ", data);
                    handleOpenNotify("Thêm tuyến đường cho xe thất bại!", "error")
                    return
                }

                console.log("create mapping => ", data.data);
                handleOpenNotify("Thêm tuyến đường cho xe thành công!", "success")
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
                        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mb: 3 }} style={{ position: "relative" }}>
                            Thêm tuyến xe

                            <IconButton
                                style={{ position: "absolute", right: 0 }}
                                color='error'
                                size='small'
                                className={styles.btnCancel}
                                onClick={() => { onCloseModal() }}
                            >
                                <CloseIcon />
                            </IconButton>

                        </Typography>

                        <div className={styles.container}>

                            <form noValidate autoComplete="off" id={styles.info}>
                                <div className={styles.wrap}>
                                    <p style={{ width: "120px", textAlign: "left" }}>Tuyến đường</p>
                                    <Select
                                        className={styles.selection}
                                        required={true}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // onChange={(e) => setRouteSelect()}
                                        // value={seatUpdate.floor}
                                        size="small"
                                    >
                                        <MenuItem
                                            key={0}
                                            value={FloorType["Tầng một"]}
                                        >
                                            {FloorType[0]}
                                        </MenuItem>
                                        <MenuItem
                                            key={1}
                                            value={FloorType["Tầng hai"]}
                                        >
                                            {FloorType[1]}
                                        </MenuItem>

                                    </Select>
                                </div>

                                <div className={styles.wrap}>
                                    <p style={{ width: "120px", textAlign: "left" }}>Giờ xuất phát</p>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            ampm={false}
                                            openTo="hours"
                                            views={['hours', 'minutes']}
                                            inputFormat="HH:mm"
                                            mask="__:__"
                                            value={time}
                                            onChange={(newValue) => {
                                                setTime(newValue);

                                            }}
                                            renderInput={(params) => <TextField {...params} size="small" className={styles.booking_input} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </form>

                        </div>
                        <div className={styles.action}>
                            <Button
                                size='small'

                                variant="outlined"
                                startIcon={<AddIcon />}
                                className={styles.btnCreate}
                                onClick={() => { handleSubmit() }}

                            >
                                Tạo mới
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