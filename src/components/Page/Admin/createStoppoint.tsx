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
import { StopPointModel } from '../../Shared/Models/StopPointModel';
import { CityModel } from '../../Shared/Models/CityModel';
import { DistrictModel } from '../../Shared/Models/DistrictModel';
import { WardModel } from '../../Shared/Models/WardModel';

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

export function CreateStoppoint(props?: { stateProps: boolean, close: any, reloadPage: any, id: string }) {

    const [isShow, setIsShow] = useState(false)


    const [idCity, setIdCity] = useState<string>();
    const [idDistrict, setIdDistrict] = useState<string>();
    const [idWard, setIdWard] = useState<string>();

    const [listCity, setListCity] = useState<CityModel[]>()
    const [listDistrict, setListDistrict] = useState<DistrictModel[]>()
    const [listWard, setListWard] = useState<WardModel[]>()

    const loadData = async () => {


        const res_city = await fetch(env.REACT_APP_API.concat("/cities"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer ".concat(user.token),
            },// body: JSON.stringify(form.getFieldsValue()),
        })
        if (res_city.status > 200) { return }
        const data_res_city = await res_city.json()
        setListCity(data_res_city.data)
    }

    useEffect(() => {
        setIsShow(props.stateProps)
        loadData()
    }, [props.stateProps])

    /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
    const handleChangeCityName = (data: string) => {
        setIdCity(data);
        setListWard([])
        setListDistrict([])
    };

    //////////////////////////////////////////////////////

    useEffect(() => {
        if (idCity) {
            fetch(env.REACT_APP_API.concat(`/districts/${idCity}`), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "Bearer ".concat(user.token),
                },
                // body: JSON.stringify(form.getFieldsValue()),
            })
                .then(async (res) => {

                    const data = await res.json()

                    if (res.status >= 500) {
                        console.log("get district status >= 500 ", data);
                        return
                    }
                    else if (res.status >= 400) {
                        console.log("get district status >= 400 ", data);
                        return
                    }
                    setListDistrict(data.data)

                })
                .catch((error) => {
                    console.log(" error >>>>>>", error);
                })
        }
    }, [idCity])

    const handleChangeDistrictName = (data: string) => {
        // console.log(" District click => ", data);
        setIdDistrict(data);
        setListWard([])
    };

    /////////////////////////////////////////////////////////////

    useEffect(() => {
        if (idDistrict) {
            fetch(env.REACT_APP_API.concat(`/wards/${idDistrict}`), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "Bearer ".concat(user.token),
                },
                // body: JSON.stringify(form.getFieldsValue()),
            })
                .then(async (res) => {

                    const data = await res.json()

                    if (res.status >= 500) {
                        console.log("get ward status >= 500 ", data);
                        return
                    }
                    else if (res.status >= 400) {
                        console.log("get ward status >= 400 ", data);
                        return
                    }
                    setListWard(data.data)

                })
                .catch((error) => {
                    console.log(" error >>>>>>", error);
                })
        }
    }, [idDistrict])


    /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////

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
    const defaultValues: StopPointModel = { cityId: "", districtId: "", wardId: "", street: "", houseNumber: "", longitude: "", latitude: "" }

    const { register, control, handleSubmit, reset, } = useForm({
        defaultValues: {
            listStoppoint: [defaultValues]
        }
    });

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "listStoppoint"
    });

    const onSubmit = (data) => {

        const list: StopPointModel[] = data.listStoppoint
        console.log("list stopppoint", list)

        fetch(env.REACT_APP_API.concat(`/stop-point/create-point-list/${props.id}`), {
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
                    console.log(" create point status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log(" create point status >= 400 ", data);
                    return
                }

                console.log(" create point => ", data.data);

                reset({ listStoppoint: [defaultValues] })
                handleOpenNotify("Tạo điểm dừng thành công")
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
            {isShow && listCity ?
                <Modal
                    open={isShow}
                    onClose={() => props.close()}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h5" component="h3" sx={{ mb: 3 }}>
                            Tạo điểm dừng
                        </Typography>


                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ul className={styles.container_create_list} style={{ overflowY: "hidden" }}>
                                {fields.map((item, index) => {
                                    return (
                                        <li key={item.id} className={styles.item_form}>

                                            <div className={styles.item}>

                                                <div className={styles.box_input}>
                                                    <span className={styles.title} style={{ width: "100px" }} >Tỉnh/TP</span>
                                                    <select
                                                        required={true}
                                                        className={styles.input}
                                                        {...register(`listStoppoint.${index}.cityId`)}
                                                        onChange={(event) => { handleChangeCityName(event.target.value) }}
                                                    >
                                                        {
                                                            listCity?.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        {index === 0 ? <option value="" selected disabled hidden></option> : <></>}
                                                                        <option value={item.id} key={index} >
                                                                            {item.name}
                                                                        </option>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className={styles.box_input}>
                                                    <span className={styles.title} style={{ width: "100px" }} >Quận/Huyện</span>
                                                    <select
                                                        required={true}
                                                        className={styles.input}
                                                        {...register(`listStoppoint.${index}.districtId`)}
                                                        onChange={(event) => { handleChangeDistrictName(event.target.value) }}
                                                    >
                                                        {
                                                            listDistrict?.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        {index === 0 ? <option value="" selected disabled hidden></option> : <></>}
                                                                        <option value={item.id} key={index}>
                                                                            {item.name}
                                                                        </option>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className={styles.box_input}>
                                                    <span className={styles.title} style={{ width: "100px" }} >Phường/Xã</span>
                                                    <select
                                                        required={true}
                                                        className={styles.input}
                                                        {...register(`listStoppoint.${index}.wardId`)}
                                                    >

                                                        {
                                                            listWard?.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        {index === 0 ? <option value="" selected disabled hidden></option> : <></>}
                                                                        <option value={item.id} key={index}>
                                                                            {item.name}
                                                                        </option>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>

                                                <div className={styles.box_input}>
                                                    <span className={styles.title} style={{ width: "100px" }}>Đường</span>
                                                    <input
                                                        required={true}
                                                        className={styles.input}
                                                        {...register(`listStoppoint.${index}.street`)}
                                                    />
                                                </div>
                                                <div className={styles.box_input}>
                                                    <span className={styles.title} style={{ width: "100px" }}>Số nhà</span>
                                                    <input
                                                        required={true}
                                                        className={styles.input}
                                                        {...register(`listStoppoint.${index}.houseNumber`)}
                                                    />
                                                </div>



                                                {/* <div className={styles.box_input}>
                                                    <span className={styles.title}>Số ghế</span>
                                                    <input
                                                        type="number"
                                                        required={true}
                                                        className={styles.input}
                                                        {...register(`listStoppoint.${index}.row`)}
                                                    />
                                                </div> */}

                                            </div>

                                            {/* <IconButton className={styles.btnDelete} color="error" size='small' onClick={() => remove(index)}>
                                                <DeleteIcon fontSize='small' />
                                            </IconButton> */}

                                        </li>
                                    );
                                })}
                            </ul>
                            {/* <section>


                                <Button
                                    // startIcon={<AddIcon fontSize='small' />}
                                    // sx={{ fontSize: "10px", height: "30px" }}
                                    color="primary" size='small'
                                    onClick={() => {
                                        append(defaultValues);
                                        setIdCity("")
                                        setIdDistrict("")
                                        setIdWard("")
                                    }}>

                                    Thêm điểm dừng
                                </Button>


                            </section> */}

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













