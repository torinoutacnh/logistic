import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, FormControl, Select, MenuItem, SelectChangeEvent, Alert, Snackbar, IconButton } from '@mui/material';
import styles from './styles/createCar.module.scss';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { env, ServiceType } from '../../Shared/Models/Everything';
import { CarManager } from '../../Shared/Models/CarManager';
import { CarModel } from '../../Shared/Models/CarModel';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useForm, useFieldArray } from "react-hook-form";
import ReactDOM from "react-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { SeatModel } from "../../Shared/Models/SeatModel";
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import CancelIcon from '@mui/icons-material/Cancel';
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

export function CreateRoute(props?: { stateProps: boolean, close: any, reloadPage: any, id: string, car: CarModel }) {

    const [isShow, setIsShow] = useState(false)


    useEffect(() => {
        setIsShow(props.stateProps)
    }, [props.stateProps])


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

    ///////////////////////////////////////////////////////////////////////////
    function getCurrentDateTime() {
        const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
        const localISOTime = new Date(Date.now() - tzoffset).toISOString();
        const mySqlDT = localISOTime;
        return mySqlDT;
    }
    ///////////////////////////////////////////////////////////////////////////
    const defaultValues: RouteModel = { fromId: "", toId: "", distanceByKm: 0, day: 0, hour: 0, minute: 0, dailyStartTime: "" }

    const { register, control, handleSubmit, reset, } = useForm({
        defaultValues: {
            listRoute: [defaultValues]
        }
    });

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "listRoute"
    });

    const onSubmit = (data) => {

        const list: RouteModel[] = data.listRoute
        list.map(i => i.dailyStartTime = getCurrentDateTime())

        fetch(env.REACT_APP_API.concat(`/route/create-routes/${props.id}`), {
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
                    console.log(" create route status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log(" create route status >= 400 ", data);
                    return
                }

                console.log(" create route => ", data.data);

                reset({ listRoute: [defaultValues] })
                handleOpenNotify("Tạo tuyến đường thành công")
                onCloseModal()
                props.reloadPage()

            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })

    }
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
                            Tạo tuyến đường
                        </Typography>


                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ul className={styles.container_create_list}>
                                {fields.map((item, index) => {
                                    return (
                                        <li key={item.id} className={styles.item_form}>

                                            <div className={styles.item}>

                                                <div className={styles.box_input}>
                                                    <span className={styles.title} style={{ width: "100px" }} >Điểm đi</span>
                                                    <select
                                                        required={true}
                                                        className={styles.input}
                                                        {...register(`listRoute.${index}.fromId`)}
                                                    // style={{ width: "230px", background: "white" }}
                                                    >
                                                        {
                                                            props.car?.stopPoints.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <option value={item.id} key={index} >
                                                                            {item.houseNumber} {item.street}  {item.ward} - {item.district} - {item.city}
                                                                        </option>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className={styles.box_input}>
                                                    <span className={styles.title} style={{ width: "100px" }} >Điểm đến</span>
                                                    <select
                                                        required={true}
                                                        className={styles.input}
                                                        {...register(`listRoute.${index}.toId`)}
                                                    >
                                                        {
                                                            props.car?.stopPoints.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <option value={item.id} key={index} >
                                                                            {item.houseNumber} {item.street} - {item.ward} - {item.district} - {item.city}
                                                                        </option>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>

                                                <div className={styles.box_input}>
                                                    <span className={styles.title} style={{ width: "100px" }}>Khoảng cách</span>
                                                    <input
                                                        required={true}
                                                        className={styles.input}
                                                        {...register(`listRoute.${index}.distanceByKm`, { value: Number() })} type="number"
                                                    />
                                                </div>
                                                <div className={styles.box_input}>
                                                    <span className={styles.title} style={{ width: "100px" }}>Ngày</span>
                                                    <input
                                                        required={true}
                                                        className={styles.input}
                                                        {...register(`listRoute.${index}.day`, { value: Number() })} type="number"
                                                    />
                                                </div>
                                                <div className={styles.box_input}>
                                                    <span className={styles.title} style={{ width: "100px" }}>Giờ</span>
                                                    <input
                                                        required={true}
                                                        className={styles.input}
                                                        {...register(`listRoute.${index}.hour`, { value: Number() })} type="number"
                                                    />
                                                </div>
                                                <div className={styles.box_input}>
                                                    <span className={styles.title} style={{ width: "100px" }}>Phút</span>
                                                    <input
                                                        required={true}
                                                        className={styles.input}
                                                        {...register(`listRoute.${index}.minute`, { value: Number() })} type="number"
                                                    />
                                                </div>



                                                {/* <div className={styles.box_input}>
                                                    <span className={styles.title}>Số ghế</span>
                                                    <input
                                                        type="number"
                                                        required={true}
                                                        className={styles.input}
                                                        {...register(`listRoute.${index}.row`)}
                                                    />
                                                </div> */}

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

                                    Thêm tuyến đường
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













