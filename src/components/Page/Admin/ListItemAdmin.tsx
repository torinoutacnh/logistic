import { Alert, Button, Grid, IconButton, Snackbar } from "@mui/material"
import styles from './admin.module.scss'
import imageTest from "../../../styles/img/imgTest.jpg"
import Image from "next/image"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from "react";
import { CarModel } from "../../Shared/Models/CarModel";
import { env, ServiceType } from "../../Shared/Models/Everything";
import { useRouter } from "next/router";
import { CreateSeat } from "./createSeat";
import AddIcon from '@mui/icons-material/Add';
import { CreateCar } from "./createCar";

export const ListiItemAdmin = (props: { typeProps?: number }) => {

    const [car, setCar] = useState<CarModel[]>([])
    const [filterCar, setFilterCar] = useState<CarModel[]>()
    const [reRender, setReRender] = useState(0)

    const router = useRouter()

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////

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
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////

    useEffect(() => {
        setFilterCar(null)
        fetch(env.REACT_APP_API.concat("/car"), {
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
                    console.log("get car status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log("get car status >= 400 ", data);
                    return
                }

                // console.log("get car => ", data.data);

                setCar(data.data)


            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })

    }, [props.typeProps, reRender])

    useEffect(() => {
        const tmp = car.filter(item => item.serviceType == props.typeProps)
        setFilterCar(tmp)
    }, [car])


    const onClickDeleteCar = (idCar: string) => {
        fetch(env.REACT_APP_API.concat(`/car/delete-car/${idCar}`), {
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
                    console.log("delete car status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log("delete car status >= 400 ", data);
                    return
                }

                console.log("delete car => ", data);
                handleOpenNotify("Xóa xe thành công")
                setReRender(pre => pre + 1)


            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })

    }

    const handelOnClickItem = (carId: string) => {
        router.push({ pathname: "/admin/carInfo", query: { id: carId } })
    }

    ////////////////////////////////////////////////////////
    const [isShowModal, setIsShowModal] = useState(false);
    const onClickShowModal = () => setIsShowModal(true);
    const onClickCloseModal = () => setIsShowModal(false);

    return (
        <>
            {
                !filterCar ?
                    <><h1>Loading</h1></>
                    :
                    <>
                    <div className={styles.option}>
                                {/* <Box className={styles.area}>
                                    <span>Khu vực</span>
                                    <FormControl fullWidth size="small">
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            MenuProps={MenuProps}
                                            value={area}
                                            onChange={handleChange}
                                        >

                                            {
                                                dataDistrict.map((item, index) => (
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
                                </Box> */}

                                <Button
                                    variant="outlined"
                                    size='small'
                                    startIcon={<AddIcon />}
                                    sx={{ marginRight: 3 }}
                                    onClick={() => { onClickShowModal() }}
                                >
                                    Thêm mới
                                </Button>
                            </div>
                        <Grid container className={styles.g_container}>


                            {
                                filterCar.map((item, index) => {
                                    return (
                                        <Grid xs={11.5} sm={9} md={9} lg={8} xl={5.9} key={index}>
                                            <div className={styles.g_item} >

                                                <div className={styles.left}>
                                                    <div className={styles.image} onClick={() => { handelOnClickItem(item.id) }}>
                                                        <Image src={imageTest} style={{ borderRadius: "5px" }} />
                                                    </div>
                                                    <div className={styles.action}>

                                                        <Button className={styles.btn}>
                                                            <BorderColorIcon className={styles.icon} />
                                                            <span className={styles.text}>
                                                                Chỉnh sửa
                                                            </span>
                                                        </Button>

                                                        <Button
                                                            className={styles.btn} color={"error"}
                                                            onClick={() => { onClickDeleteCar(item.id) }}
                                                        >
                                                            <DeleteIcon className={styles.icon} />
                                                            <span className={styles.text}>
                                                                Xóa
                                                            </span>
                                                        </Button>

                                                    </div>
                                                </div>

                                                <div className={styles.right} onClick={() => { handelOnClickItem(item.id) }}>

                                                    <span className={styles.text2}>
                                                        <span className={styles.title}>Tên nhà xe:</span>
                                                        {item.carsManagerName}
                                                    </span>

                                                    <span className={styles.text2}>
                                                        <span className={styles.title}>Hãng xe:</span>
                                                        {item.carModel}
                                                    </span>
                                                    <span className={styles.text}>
                                                        <span className={styles.title}>Màu xe:</span>
                                                        {item.carColor}
                                                    </span>
                                                    <span className={styles.text}>
                                                        <span className={styles.title}>BKS:</span>
                                                        {item.carNumber}
                                                    </span>
                                                    <span className={styles.text}>
                                                        <span className={styles.title}>SĐT:</span>
                                                        {item.tel}
                                                    </span>
                                                    <span className={styles.text}>
                                                        <span className={styles.title}>Giá vé:</span>
                                                        <span style={{ color: "red", fontWeight: "500" }}>
                                                            {item.shipPrice > 0 ? item.shipPrice : item.travelPrice}
                                                        </span>
                                                    </span>

                                                </div>
                                            </div>
                                        </Grid>
                                    )
                                })
                            }





                        </Grid>
                        <button className={styles.btnAddCircle}>+</button>
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
                        <CreateCar stateProps={isShowModal} close={onClickCloseModal} />
                    </>
                    
            }
        </>
    )

    // return <CreateSeat />

}