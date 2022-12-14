import styles from './styles/carInfo.module.scss'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Grid, Button, IconButton, Alert, Snackbar } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { ServiceType } from '../../Shared/Models/Everything';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { CarModel } from '../../Shared/Models/CarModel';
import { StopPointModel } from '../../Shared/Models/StopPointModel';
import { UpdatePrice } from './updatePrice';
import { CreateSeat } from './createSeat';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import { SeatModel } from '../../Shared/Models/SeatModel';
import { CreateRoute } from './createRoute';
import { UpdateCar } from './updateCar';
import { UpdateStopPoint } from './updateStopPoint';
import { CreateStoppoint } from './createStoppoint';
import { RouteModel } from '../../Shared/Models/RouteModel';
import { UpdateRoute } from './updateRoute';
import { ChangeSeat } from './ChangeSeat';
import ProgressBar from '../../Shared/Components/Loading/ProgressBar';
import { CreateMapping } from './createMapping';

export const CarInfo = () => {

    const router = useRouter()
    const { id, index } = router.query

    const [car, setCar] = useState<CarModel>()
    const [reRender, setReRender] = useState(0)

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API.concat("/car/").concat(id as string), {
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

                // console.log("get car info=> ", data.data);

                const tmp: CarModel = data.data
                tmp.seats.sort((a, b) => Number(a.row) - Number(b.row)).sort((a, b) => Number(a.col) - Number(b.col)).sort((a, b) => a.floor - b.floor)
                setCar(tmp)

            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })

    }, [reRender])

    /////////////////////////////////////////////////////
    const reloadPage = () => {
        setReRender(reRender + 1)
        // handleOpenNotify("C???p nh???t xe th??nh c??ng")
    }
    ////////////////////////////////////////////////////////
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
    const onClickShowModalUpdate = () => setIsShowModalUpdate(true);
    const onClickCloseModalUpdate = () => setIsShowModalUpdate(false);
    //////////////////////////////////////////////////////
    const [isShowModalPrice, setIsShowModalPrice] = useState(false);
    const onClickShowModalPrice = () => setIsShowModalPrice(true);
    const onClickCloseModalPrice = () => setIsShowModalPrice(false);
    //////////////////////////////////////////////////////
    const [isShowModalCreateSeat, setIsShowModalCreateSeat] = useState(false);
    const onClickShowModalCreateSeat = () => setIsShowModalCreateSeat(true);
    const onClickCloseModalCreateSeat = () => setIsShowModalCreateSeat(false);
    //////////////////////////////////////////////////////

    const [isShowModalCreateStoppoint, setIsShowModalCreateStoppoint] = useState(false);
    const onClickShowModalCreateStoppoint = () => setIsShowModalCreateStoppoint(true);
    const onClickCloseModalCreateStoppoint = () => setIsShowModalCreateStoppoint(false);
    //////////////////////////////////////////////////////

    const [seatChange, setSeatChange] = useState<SeatModel>()
    const [isShowModalChangeSeat, setIsShowModalChangeSeat] = useState(false);
    const onClickShowModalChangeSeat = (item: SeatModel) => {
        setIsShowModalChangeSeat(true);
        setSeatChange(item);
    }
    const onClickCloseModalChangeSeat = () => {
        setIsShowModalChangeSeat(false);
    };
    //////////////////////////////////////////////////////
    const [isShowModalCreateRoute, setIsShowModalCreateRoute] = useState(false);
    const onClickShowModalCreateRoute = () => setIsShowModalCreateRoute(true);
    const onClickCloseModalCreateRoute = () => setIsShowModalCreateRoute(false);
    //////////////////////////////////////////////////////
    const [isShowModalCreateMapping, setIsShowModalCreateMapping] = useState(false);
    const onClickShowModalCreateMapping = () => setIsShowModalCreateMapping(true);
    const onClickCloseModalCreateMapping = () => setIsShowModalCreateMapping(false);
    //////////////////////////////////////////////////////
    const [isShowModalUpdateRoute, setIsShowModalUpdateRoute] = useState(false);
    const [infoRoute, setInfoRoute] = useState<RouteModel>();
    const onClickShowModalUpdateRoute = (route: RouteModel) => {
        setIsShowModalUpdateRoute(true);
        setInfoRoute(route);

    }
    const onClickCloseUpdateRoute = () => setIsShowModalUpdateRoute(false);
    //////////////////////////////////////////////////////
    const [isShowModalUpdateStopPoint, setIsShowModalUpdateStopPoint] = useState(false);
    const [stopPointUpdate, setStopPointUpdate] = useState<StopPointModel>();
    const onClickShowModalUpdateStopPoint = (item: StopPointModel) => {
        setIsShowModalUpdateStopPoint(true);
        setStopPointUpdate(item);
    }
    const onClickCloseUpdateStopPoint = () => setIsShowModalUpdateStopPoint(false);

    ////////////////////////////////////////////////////
    const [typeNotifi, setTypeNotifi] = useState("success")
    const [openNotify, setOpenNofity] = useState(false);
    const [messageNotify, setMessageNotify] = useState("")

    const handleCloseNotify = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenNofity(false);
    };

    const handleOpenNotify = (message: string, type: string) => {
        setTypeNotifi(type)
        setMessageNotify(message)
        setOpenNofity(true)
    }    ////////////////////////////////////////////////////

    const onClickDeleteMapping = (idMapping: string) => {
        fetch(process.env.NEXT_PUBLIC_API.concat(`/carRouteMapping/delete-carRouteMapping/${idMapping}`), {
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
                    console.log("delete mapping status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log("delete mapping status >= 400 ", data);
                    handleOpenNotify("Xo?? tuy???n th???t b???i!", "error")
                    return
                }
                console.log("delete mapping => ", data);
                handleOpenNotify("X??a tuy???n th??nh c??ng!", "success")
                reloadPage();
            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })
    }
    //////////////////////////////////////////////////////////////////

    // const onClickDeleteStopPoint = (idStopPoint: string) => {
    //     fetch(process.env.NEXT_PUBLIC_API.concat(`/stop-point/delete-point/${idStopPoint}`), {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             // Authorization: "Bearer ".concat(user.token),
    //         },
    //         // body: JSON.stringify(form.getFieldsValue()),
    //     })
    //         .then(async (res) => {

    //             const data = await res.json()

    //             if (res.status >= 500) {
    //                 console.log("delete stop point status >= 500 ", data);
    //                 return
    //             }
    //             else if (res.status >= 400) {
    //                 console.log("delete stop point status >= 400 ", data);
    //                 return
    //             }
    //             console.log("delete stop point => ", data);
    //             handleOpenNotify("X??a ??i???m d???ng th??nh c??ng", "success")
    //             setReRender(pre => pre + 1)
    //         })
    //         .catch((error) => {
    //             console.log(" error >>>>>>", error);
    //         })
    // }

    return (
        <>
            {
                car ?
                    <>
                        < Grid container className={styles.container} >

                            <Grid className={styles.left} container xs={11} sm={10} md={10} lg={7.5}>

                                <Grid item className={styles.item_left1} xs={12} sm={12} md={5.5} lg={5.5} style={{ textAlign: "center" }}>

                                    <Image
                                        style={{ borderRadius: "5px" }}
                                        src={process.env.NEXT_PUBLIC_API.concat(car.imagePath)}
                                        alt="Kh??ng c?? h??nh ???nh"
                                        width={500}
                                        height={400}
                                        onClick={() => { router.push({ pathname: "/admin", query: { index: index } }) }}
                                    />

                                </Grid>

                                <Grid item className={styles.item_left2} xs={12} sm={12} md={5.5} lg={5.5}>
                                    <div className={styles.box_info_left2}>
                                        <span className={styles.header_left}>Th??ng tin xe</span>

                                        {car.serviceType === ServiceType["Ch??? h??ng"] ?
                                            <>
                                                <span className={styles.text2}>
                                                    <span className={styles.title}>T??n nh?? xe:</span>

                                                </span>
                                            </>
                                            :
                                            <></>
                                        }

                                        <span className={styles.text2}>
                                            <span className={styles.title}>H??ng xe:</span>
                                            {car.carModel}
                                        </span>
                                        <span className={styles.text}>
                                            <span className={styles.title}>M??u xe:</span>
                                            {car.carColor}
                                        </span>
                                        <span className={styles.text}>
                                            <span className={styles.title}>BKS:</span>
                                            {car.carNumber}
                                        </span>
                                        <span className={styles.text}>
                                            <span className={styles.title}>S??T:</span>
                                            {car.tel}
                                        </span>
                                        <span className={styles.text}>
                                            <span className={styles.title}>Gi?? v??:</span>
                                            <span style={{ color: "red", fontWeight: "500" }}>
                                                {car.serviceType === ServiceType["Ch??? h??ng"] ? car.shipPrice : car.travelPrice}
                                            </span>
                                        </span>
                                    </div>
                                    <div className={styles.action}>
                                        <Button
                                            className={styles.btn}
                                            onClick={() => { onClickShowModalUpdate() }}
                                        >
                                            <BorderColorIcon className={styles.icon} />
                                            <span className={styles.text}>
                                                C???p nh???t
                                            </span>
                                        </Button>

                                        <Button
                                            className={styles.btn}
                                            onClick={() => { onClickShowModalPrice() }}
                                        >
                                            <BorderColorIcon
                                                className={styles.icon}
                                            />
                                            <span className={styles.text}>
                                                S???a gi??
                                            </span>
                                        </Button>
                                    </div>
                                </Grid>

                                <Grid item className={styles.item_left3} xs={12} sm={12} md={5.5} lg={5.5}>

                                    <h3 className={styles.header_left}>TUY???N ???????NG XE CH???Y</h3>
                                    <div className={styles.box_info_left_3_4}>

                                        {
                                            car.routes.map((item, index) => {

                                                return (
                                                    <>
                                                        {

                                                            <>
                                                                <div className={styles.item} key={index}>

                                                                    <div className={styles.item_left}>
                                                                        <span className={styles.text}>
                                                                            <span className={styles.title}>T???:</span>

                                                                            {item.from.ward} - {item.from.district} - {item.from.city}
                                                                        </span>

                                                                        <span className={styles.text}>
                                                                            <span className={styles.title}>?????n:</span>

                                                                            {item.to.ward} - {item.to.district} - {item.to.city}
                                                                        </span>
                                                                        <div className={styles.dis_time}>
                                                                            <p className={styles.distance}>
                                                                                <RouteOutlinedIcon />
                                                                                <span>{item.distanceByKm} km</span>
                                                                            </p>
                                                                            <p className={styles.time}>
                                                                                <TimerOutlinedIcon />
                                                                                {(item.day === 0) ? "" : (' ' + item.day + ' ng??y')}
                                                                                {(item.hour === 0) ? "" : (' ' + item.hour + ' gi???')}
                                                                                {(item.minute === 0) ? "" : (' ' + item.minute + ' ph??t')}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className={styles.item_right}>
                                                                        <IconButton
                                                                            onClick={() => onClickShowModalUpdateRoute(item)}
                                                                            color="primary"
                                                                            size='small'
                                                                        >
                                                                            <BorderColorIcon fontSize='inherit' />
                                                                        </IconButton>

                                                                        <IconButton
                                                                            onClick={() => { onClickDeleteMapping(item.id) }}
                                                                            color="error"
                                                                            size='small'
                                                                        >
                                                                            <DeleteIcon fontSize='inherit' />
                                                                        </IconButton>

                                                                    </div>

                                                                </div>
                                                            </>

                                                        }
                                                    </>
                                                )
                                            })
                                        }

                                    </div>

                                    <Button
                                        onClick={() => { onClickShowModalCreateRoute() }}
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        size="small"
                                        style={{ marginTop: "10px", marginBottom: "10px" }}

                                    >
                                        T???o tuy???n ???????ng
                                    </Button>

                                    <Button
                                        onClick={() => { onClickShowModalCreateMapping() }}
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        size="small"
                                        style={{ marginTop: "10px", marginBottom: "10px" }}

                                    >
                                        Th??m tuy???n cho xe
                                    </Button>

                                </Grid>

                                {/* <Grid item className={styles.item_left4} xs={12} sm={12} md={5.5} lg={5.5}>
                                    <h3 className={styles.header_left}>??I???M D???NG</h3>
                                    <div className={styles.box_info_left_3_4}>
                                        {
                                            car.stopPoints?.map((item, index) => {
                                                return (
                                                    <>
                                                        <div className={styles.item} key={index}>

                                                            <div className={styles.item_left}>
                                                                <span className={styles.text}>
                                                                    {item.houseNumber} {item.street} -
                                                                    {item.ward} - {item.district} - {item.city}
                                                                </span>
                                                            </div>
                                                            <div className={styles.item_right}>
                                                                <IconButton
                                                                    onClick={() => { onClickShowModalUpdateStopPoint(item) }}
                                                                    color="primary"
                                                                    size='small'
                                                                >
                                                                    <BorderColorIcon fontSize='inherit' />
                                                                </IconButton>

                                                                <IconButton
                                                                    onClick={() => { onClickDeleteStopPoint(item.id) }}
                                                                    color="error"
                                                                    size='small'
                                                                >
                                                                    <DeleteIcon fontSize='inherit' />
                                                                </IconButton>
                                                            </div>

                                                        </div>
                                                    </>
                                                )
                                            })
                                        }


                                    </div>
                                    <Button
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        size="small" style={{ marginTop: "10px", marginBottom: "10px" }}
                                        onClick={() => { onClickShowModalCreateStoppoint() }}>
                                        T???o m???i
                                    </Button>
                                </Grid> */}

                            </Grid>

                            <Grid className={styles.right} container xs={9} sm={4} md={4} lg={2.5} >
                                <div className={styles.header_right}>
                                    <span className={styles.title}>Gh??? ng???i</span>
                                    <Button
                                        className={styles.btnCreate}
                                        variant="outlined"
                                        size="small"
                                        onClick={() => { onClickShowModalCreateSeat() }}
                                    >
                                        <AddIcon />

                                    </Button>
                                </div>
                                <div className={styles.body_seat}>

                                    {car.seats?.map((item, index) => {
                                        return (
                                            <>
                                                <div
                                                    onClick={() => { onClickShowModalChangeSeat(item) }}
                                                    className={styles.item_seat}
                                                    key={index}
                                                >
                                                    <div className={styles.text}>
                                                        <span className={styles.str}>T???ng</span>
                                                        <span className={styles.num}>: {item.floor + 1}</span>
                                                    </div>

                                                    <div className={styles.text}>
                                                        <span className={styles.str}>H??ng</span>
                                                        <span className={styles.num}>: {item.col}</span>
                                                    </div>
                                                    <div className={styles.text}>
                                                        <span className={styles.str}>Gh???</span>
                                                        <span className={styles.num}>: {item.row}</span>
                                                    </div>


                                                </div>
                                            </>
                                        )
                                    })}
                                </div>


                            </Grid>

                        </Grid >

                        <UpdateCar
                            stateProps={isShowModalUpdate}
                            close={onClickCloseModalUpdate}
                            reloadPage={reloadPage}
                            car={car}
                            id={id as string}
                        />

                        <UpdatePrice
                            stateProps={isShowModalPrice}
                            close={onClickCloseModalPrice}
                            reloadPage={reloadPage}
                            car={car}
                            id={id as string} />

                        <CreateSeat
                            stateProps={isShowModalCreateSeat}
                            close={onClickCloseModalCreateSeat}
                            reloadPage={reloadPage}
                            id={id as string} />

                        {
                            seatChange &&
                            <ChangeSeat
                                stateProps={isShowModalChangeSeat}
                                close={onClickCloseModalChangeSeat}
                                reloadPage={reloadPage}
                                seat={seatChange}
                                id={id as string} />
                        }

                        <CreateMapping
                            stateProps={isShowModalCreateMapping}
                            close={onClickCloseModalCreateMapping}
                            reloadPage={reloadPage}
                            id={id as string} />

                        <CreateRoute
                            stateProps={isShowModalCreateRoute}
                            close={onClickCloseModalCreateRoute}
                            reloadPage={reloadPage}
                            id={id as string}
                        />

                        <UpdateStopPoint
                            stateProps={isShowModalUpdateStopPoint}
                            close={onClickCloseUpdateStopPoint}
                            reloadPage={reloadPage}
                            stopPoint={stopPointUpdate}
                        />

                        <CreateStoppoint
                            stateProps={isShowModalCreateStoppoint}
                            close={onClickCloseModalCreateStoppoint}
                            reloadPage={reloadPage}
                            id={id as string}
                        />

                        <UpdateRoute
                            stateProps={isShowModalUpdateRoute}
                            close={onClickCloseUpdateRoute}
                            reloadPage={reloadPage}
                            route={infoRoute}
                        />


                    </>
                    :
                    <div style={{
                        width: "100%",
                        height: "calc(100vh - 60px)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}><ProgressBar /></div>

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
    )
}