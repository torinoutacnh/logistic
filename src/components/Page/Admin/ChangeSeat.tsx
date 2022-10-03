import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, IconButton, FormControl, Select, MenuItem, SelectChangeEvent, Alert, Snackbar } from '@mui/material';
import styles from './styles/createCar.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { FloorType, StatusSeat } from '../../Shared/Models/Everything';
import { CarModel } from '../../Shared/Models/CarModel';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { SeatModel } from '../../Shared/Models/SeatModel';
import DeleteIcon from '@mui/icons-material/Delete';

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

export function ChangeSeat(props?: { stateProps: boolean, close: any, reloadPage: any, seat: SeatModel, id: string }) {

    const [isShow, setIsShow] = useState(false)
    const [seatUpdate, setSeatUpdate] = useState<SeatModel>()
    const [status, setStatus] = useState<number>()

    useEffect(() => {
        setSeatUpdate(props.seat)
        setIsShow(props.stateProps)
        setStatus(props.seat?.status)
    }, [props.stateProps])

    const handleSubmit = () => {

        fetch(process.env.NEXT_PUBLIC_API.concat(`/seat/update-seat-info/${props.id}`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer ".concat(user.token),
            },
            body: JSON.stringify(seatUpdate),
        })
            .then(async (res) => {

                const data = await res.json()

                if (res.status >= 500) {
                    console.log("update seat status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log("update seat status >= 400 ", data);
                    handleOpenNotify("Cập nhật ghế thất bại!", "error")
                    return
                }

                console.log("update seat => ", data.data);
                handleOpenNotify("Cập nhật ghế thành công!", "success")
                props.reloadPage()

            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })
        props.close();
    }
    const handleDelete = () => {

        fetch(process.env.NEXT_PUBLIC_API.concat(`/seat/delete-seat/${seatUpdate.id}`), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer ".concat(user.token),
            },
            // body: JSON.stringify(seatUpdate),
        })
            .then(async (res) => {

                const data = await res.json()

                if (res.status >= 500) {
                    console.log("delete seat status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log("delete seat status >= 400 ", data);
                    handleOpenNotify("Xoá ghế thất bại!", "error")
                    return
                }
                console.log("delete seat => ", data.data);
                handleOpenNotify("Xóa ghế thành công!", "success")
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

    const handleUpdateStatus = () => {
        const SeatUpdateStatus: SeatModel = { id: seatUpdate.id, status: status }
        // console.log("SeatUpdateStatus", SeatUpdateStatus);

        fetch(process.env.NEXT_PUBLIC_API.concat(`/seat/update-seat-status`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer ".concat(user.token),
            },
            body: JSON.stringify(SeatUpdateStatus),
        })
            .then(async (res) => {

                const data = await res.json()

                if (res.status >= 500) {
                    console.log("update status seat  >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log("update status seat  >= 400 ", data);
                    handleOpenNotify("Cập nhật trạng thái ghế thất bại!", "error")
                    return
                }

                console.log("update status seat => ", data.data);
                handleOpenNotify("Cập nhật trạng thái ghế thành công!", "success")
                props.reloadPage()
            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })
        props.close();
    }

    return (
        <>
            {isShow && seatUpdate ?
                <Modal
                    open={isShow}
                    onClose={() => props.close()}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} style={{ color: "black" }}>
                        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mb: 3 }} style={{ position: "relative" }}>
                            Thông tin ghế

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
                                    <p style={{ width: "120px", textAlign: "left" }}>Tầng</p>
                                    {/* <TextField
                                        type="number"
                                        required
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={seatUpdate.floor}
                                        onChange={(e) => setSeatUpdate({ ...seatUpdate, floor: Number(e.target.value) })}
                                    /> */}
                                    <Select
                                        className={styles.selection}
                                        required={true}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={(e) => setSeatUpdate({ ...seatUpdate, floor: Number(e.target.value) })}
                                        value={seatUpdate.floor}
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
                                    <p style={{ width: "120px", textAlign: "left" }}>Hàng</p>
                                    <TextField
                                        type="number"
                                        required
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={seatUpdate.col}
                                        onChange={(e) => setSeatUpdate({ ...seatUpdate, col: String(Number(e.target.value)) })}
                                    />
                                </div>

                                <div className={styles.wrap}>
                                    <p style={{ width: "120px", textAlign: "left" }}>Ghế</p>
                                    <TextField
                                        type="number"
                                        required
                                        className={styles.booking_input}
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        value={seatUpdate.row}
                                        onChange={(e) => setSeatUpdate({ ...seatUpdate, row: String(Number(e.target.value)) })}
                                    />
                                </div>
                                <div className={styles.wrap}>
                                    <p style={{ width: "120px", textAlign: "left" }}>Trạng thái ghế</p>
                                    <Select
                                        required={true}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={(event) => { setStatus(Number(event.target.value)) }}
                                        value={status}
                                        defaultValue={status}
                                        size="small"
                                    >
                                        <MenuItem
                                            key={0}
                                            value={StatusSeat["Trống"]}
                                        >
                                            {StatusSeat[0]}
                                        </MenuItem>
                                        <MenuItem
                                            key={1}
                                            value={StatusSeat["Đã đặt"]}
                                        >
                                            {StatusSeat[1]}
                                        </MenuItem>

                                    </Select>

                                    <Button onClick={() => { handleUpdateStatus() }}>
                                        Lưu
                                    </Button>
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
                                startIcon={<DeleteIcon />}
                                className={styles.btnCancel}
                                onClick={() => { handleDelete() }}
                            >
                                Xóa ghế
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