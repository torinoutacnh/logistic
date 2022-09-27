import styles from './styles/carInfo.module.scss'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Grid, Button, IconButton, Alert, Snackbar } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { env, ServiceType } from '../../Shared/Models/Everything';
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

export const CarInfo = () => {

    const router = useRouter()
    const { id, index } = router.query

    const [car, setCar] = useState<CarModel>()
    const [reRender, setReRender] = useState(0)

    useEffect(() => {
        fetch(env.REACT_APP_API.concat("/car/").concat(id as string), {
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
        // handleOpenNotify("Cập nhật xe thành công")
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

    const onClickDeleteRoute = (idRoute: string) => {
        fetch(env.REACT_APP_API.concat(`/route/delete-route/${idRoute}`), {
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
                    console.log("delete route status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log("delete route status >= 400 ", data);
                    return
                }
                console.log("delete route point => ", data);
                handleOpenNotify("Xóa tuyến thành công")
                reloadPage();
            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })
    }
    //////////////////////////////////////////////////////////////////

    const onClickDeleteStopPoint = (idStopPoint: string) => {
        fetch(env.REACT_APP_API.concat(`/stop-point/delete-point/${idStopPoint}`), {
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
                    console.log("delete stop point status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log("delete stop point status >= 400 ", data);
                    return
                }
                console.log("delete stop point => ", data);
                handleOpenNotify("Xóa điểm dừng thành công")
                setReRender(pre => pre + 1)
            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })
    }

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
                                        src={env.REACT_APP_API.concat(car.imagePath)}
                                        alt="Không có hình ảnh"
                                        width={500}
                                        height={400}
                                        onClick={() => { router.push({ pathname: "/admin", query: { index: index } }) }}
                                    />

                                </Grid>

                                <Grid item className={styles.item_left2} xs={12} sm={12} md={5.5} lg={5.5}>
                                    <div className={styles.box_info_left2}>
                                        <span className={styles.header_left}>Thông tin xe</span>

                                        {car.serviceType === ServiceType["Chở hàng"] ?
                                            <>
                                                <span className={styles.text2}>
                                                    <span className={styles.title}>Tên nhà xe:</span>

                                                </span>
                                            </>
                                            :
                                            <></>
                                        }

                                        <span className={styles.text2}>
                                            <span className={styles.title}>Hãng xe:</span>
                                            {car.carModel}
                                        </span>
                                        <span className={styles.text}>
                                            <span className={styles.title}>Màu xe:</span>
                                            {car.carColor}
                                        </span>
                                        <span className={styles.text}>
                                            <span className={styles.title}>BKS:</span>
                                            {car.carNumber}
                                        </span>
                                        <span className={styles.text}>
                                            <span className={styles.title}>SĐT:</span>
                                            {car.tel}
                                        </span>
                                        <span className={styles.text}>
                                            <span className={styles.title}>Giá vé:</span>
                                            <span style={{ color: "red", fontWeight: "500" }}>
                                                {car.shipPrice > 0 ? car.shipPrice : car.travelPrice}
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
                                                Cập nhật
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
                                                Sửa giá
                                            </span>
                                        </Button>
                                    </div>
                                </Grid>

                                <Grid item className={styles.item_left3} xs={12} sm={12} md={5.5} lg={5.5}>

                                    <h3 className={styles.header_left}>TUYẾN</h3>
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
                                                                            <span className={styles.title}>Từ:</span>

                                                                            {item.from.ward} - {item.from.district} - {item.from.city}
                                                                        </span>

                                                                        <span className={styles.text}>
                                                                            <span className={styles.title}>Đến:</span>

                                                                            {item.to.ward} - {item.to.district} - {item.to.city}
                                                                        </span>
                                                                        <div className={styles.dis_time}>
                                                                            <p className={styles.distance}>
                                                                                <RouteOutlinedIcon />
                                                                                <span>{item.distanceByKm} km</span>
                                                                            </p>
                                                                            <p className={styles.time}>
                                                                                <TimerOutlinedIcon />
                                                                                {(item.day === 0) ? "" : (' ' + item.day + ' ngày')}
                                                                                {(item.hour === 0) ? "" : (' ' + item.hour + ' giờ')}
                                                                                {(item.minute === 0) ? "" : (' ' + item.minute + ' phút')}
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
                                                                            onClick={() => { onClickDeleteRoute(item.id) }}
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
                                        Tạo mới
                                    </Button>
                                </Grid>

                                {/* <Grid item className={styles.item_left4} xs={12} sm={12} md={5.5} lg={5.5}>
                                    <h3 className={styles.header_left}>ĐIỂM DỪNG</h3>
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
                                        Tạo mới
                                    </Button>
                                </Grid> */}

                            </Grid>

                            <Grid className={styles.right} container xs={9} sm={4} md={4} lg={2.5} >
                                <div className={styles.header_right}>
                                    <span className={styles.title}>Ghế ngồi</span>
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
                                                        <span className={styles.str}>Tầng</span>
                                                        <span className={styles.num}>: {item.floor}</span>
                                                    </div>

                                                    <div className={styles.text}>
                                                        <span className={styles.str}>Hàng</span>
                                                        <span className={styles.num}>: {item.col}</span>
                                                    </div>
                                                    <div className={styles.text}>
                                                        <span className={styles.str}>Ghế</span>
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
                    <><h1>Loading</h1></>

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
    )
}