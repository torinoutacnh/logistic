import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, FormControl, Select, MenuItem, SelectChangeEvent, Alert, Snackbar, IconButton } from '@mui/material';
import styles from './styles/createCar.module.scss';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { env, ServiceType } from '../../Shared/Models/Everything';
import { CarModel } from '../../Shared/Models/CarModel';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useForm, useFieldArray } from "react-hook-form";
import ReactDOM from "react-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { SeatModel } from "../../Shared/Models/SeatModel";
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import CancelIcon from '@mui/icons-material/Cancel';

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

export function CreateSeat(props?: { stateProps: boolean, close: any, reloadPage: any, id: string }) {

    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        setIsShow(props.stateProps)
    }, [props.stateProps])

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

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    const defaultValues: SeatModel = { floor: 0, col: "", row: "", status: 0 }

    const { register, control, handleSubmit, reset, } = useForm({
        defaultValues: {
            listSeat: [defaultValues]
        }
    });
    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "listSeat"
    });

    const onSubmit = (data) => {
        const list: SeatModel[] = data.listSeat
        list.map(item => item.floor = Number(item.floor))

        fetch(env.REACT_APP_API.concat(`/seat/create-seat-list/${props.id}`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer ".concat(user.token),
            },
            body: JSON.stringify(list),
        })
            .then(async (res) => {

                const data = await res.json()

                if (res.status >= 500) {
                    console.log(" create seat status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log(" create seat status >= 400 ", data);
                    handleOpenNotify("Vui lòng nhập đầy đủ thông tin!", "error")
                    return
                }

                console.log(" create seat => ", data.data);

                reset({ listSeat: [defaultValues] })
                handleOpenNotify("Tạo ghế thành công!", "success")
                onCloseModal()
                props.reloadPage()
            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })

    }
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    // Hàng -> col               số ghế -> row
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

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
                        <Typography id="modal-modal-title" variant="h5" component="h3" sx={{ mb: 3 }}>
                            Tạo ghế ngồi
                        </Typography>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ul className={styles.container_create_list}>
                                {fields.map((item, index) => {
                                    return (
                                        <li key={item.id} className={styles.item_form}>

                                            <div className={styles.item}>

                                                <div className={styles.box_input}>
                                                    <span className={styles.title}>Tầng</span>
                                                    <input
                                                        required={true}
                                                        className={styles.input}
                                                        {...register(`listSeat.${index}.floor`, { value: Number() })} type="number"
                                                    />
                                                </div>

                                                <div className={styles.box_input}>
                                                    <span className={styles.title}>Hàng</span>
                                                    <input
                                                        type="number"
                                                        required={true}
                                                        className={styles.input}
                                                        {...register(`listSeat.${index}.col`)}
                                                    />
                                                </div>

                                                <div className={styles.box_input}>
                                                    <span className={styles.title}>Số ghế</span>
                                                    <input
                                                        type="number"
                                                        required={true}
                                                        className={styles.input}
                                                        {...register(`listSeat.${index}.row`)}
                                                    />
                                                </div>

                                            </div>

                                            <IconButton className={styles.btnDelete} color="error" size='small' onClick={() => remove(index)}>
                                                <DeleteIcon fontSize='small' />
                                            </IconButton>

                                        </li>
                                    );
                                })}
                            </ul>
                            <section>

                                <Button
                                    // startIcon={<AddIcon fontSize='small' />}
                                    // sx={{ fontSize: "10px", height: "30px" }}
                                    color="primary" size='small'
                                    onClick={() => {
                                        append(defaultValues);
                                    }}>

                                    Thêm ghế
                                </Button>

                            </section>

                            <div style={{ display: "flex", justifyContent: "space-evenly" }}>

                                <Button
                                    // startIcon={<AddIcon fontSize='small' />}
                                    // sx={{ fontSize: "10px", height: "30px" }}
                                    color="primary" size='small'
                                    type="submit">
                                    <DownloadDoneIcon fontSize='inherit' /> &nbsp; Tạo mới
                                </Button>

                                <Button
                                    onClick={() => { onCloseModal() }}
                                    color="error" size='small'>
                                    <CancelIcon fontSize='inherit' /> &nbsp; Hủy bỏ
                                </Button>
                            </div>
                        </form>
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













