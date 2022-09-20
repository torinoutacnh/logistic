import styles from './styles/carInfo.module.scss'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Grid, Button, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { env, ServiceType } from '../../Shared/Models/Everything';
import imageTest from "../../../styles/img/imgTest.jpg"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { CarModel } from '../../Shared/Models/CarModel';
import { StopPointModel } from '../../Shared/Models/StopPointModel';
import { Create_Update_Car } from './createUpdateCar';

export const CarInfo = () => {


    const router = useRouter()
    const { id } = router.query

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

                console.log("get car info=> ", data.data);

                setCar(data.data)


            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })

    }, [reRender])

    ////////////////////////////////////////////////////////
    const [isShowModal, setIsShowModal] = useState(false);
    const onClickShowModal = () => setIsShowModal(true);
    const onClickCloseModal = () => setIsShowModal(false);
    const reloadPage = () => {
        setReRender(reRender + 1)

        // handleOpenNotify("Cập nhật xe thành công")

    }

    return (
        <>
            {
                car ?

                    <>
                        < Grid container className={styles.container} >

                            <Grid className={styles.left} container xs={11} sm={6.5} md={7.5} lg={7.5}>

                                <Grid item className={styles.item_left1} xs={12} sm={12} md={5.5} lg={5.5} >

                                    <Image src={imageTest} style={{ borderRadius: "5px" }} />

                                </Grid>

                                <Grid item className={styles.item_left2} xs={12} sm={12} md={5.5} lg={5.5}>
                                    <div className={styles.box_info_left2}>

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
                                    <Button
                                        className={styles.btn}
                                        onClick={() => { onClickShowModal() }}
                                    >
                                        <BorderColorIcon className={styles.icon} />
                                        <span className={styles.text}>
                                            Chỉnh sửa
                                        </span>
                                    </Button>
                                </Grid>

                                <Grid item className={styles.item_left3} xs={12} sm={12} md={5.5} lg={5.5}>

                                    <h3 className={styles.header_left}>Tuyến</h3>
                                    <div className={styles.box_info_left_3_4}>

                                        {
                                            car.routes.map((item, index) => {

                                                const RouterFrom: StopPointModel = car.stopPoints.filter(i => i.id === item.fromId)[0]
                                                const RouterTo: StopPointModel = car.stopPoints.filter(i => i.id === item.toId)[0]

                                                return (
                                                    <>
                                                        <div className={styles.item} key={index}>

                                                            <div className={styles.item_left}>
                                                                <span className={styles.text}>
                                                                    <span className={styles.title}>Từ:</span>
                                                                    {RouterFrom.houseNumber} {RouterFrom.street} -
                                                                    {RouterFrom.ward} - {RouterFrom.district} - {RouterFrom.city}
                                                                </span>

                                                                <span className={styles.text}>
                                                                    <span className={styles.title}>Đến:</span>
                                                                    {RouterTo.houseNumber} {RouterTo.street} -
                                                                    {RouterTo.ward} - {RouterTo.district} - {RouterTo.city}
                                                                </span>
                                                            </div>
                                                            <div className={styles.item_right}>
                                                                <IconButton color="primary" size='small'>
                                                                    <BorderColorIcon fontSize='inherit' />
                                                                </IconButton>

                                                                <IconButton color="error" size='small'>
                                                                    <DeleteIcon fontSize='inherit' />
                                                                </IconButton>

                                                            </div>

                                                        </div>
                                                    </>
                                                )
                                            })
                                        }

                                    </div>

                                    <Button variant="outlined" startIcon={<AddIcon />} size="small" style={{ marginTop: "10px", marginBottom: "10px" }}>
                                        Tạo mới
                                    </Button>
                                </Grid>

                                <Grid item className={styles.item_left4} xs={12} sm={12} md={5.5} lg={5.5}>
                                    <h3 className={styles.header_left}>Điểm dừng</h3>
                                    <div className={styles.box_info_left_3_4}>

                                        {
                                            car.stopPoints.map((item, index) => {
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
                                                                <IconButton color="primary" size='small'>
                                                                    <BorderColorIcon fontSize='inherit' />
                                                                </IconButton>

                                                                <IconButton color="error" size='small'>
                                                                    <DeleteIcon fontSize='inherit' />
                                                                </IconButton>
                                                            </div>

                                                        </div>
                                                    </>
                                                )
                                            })
                                        }


                                    </div>
                                    <Button variant="outlined" startIcon={<AddIcon />} size="small" style={{ marginTop: "10px", marginBottom: "10px" }}>
                                        Tạo mới
                                    </Button>
                                </Grid>


                            </Grid>

                            <Grid className={styles.right} container xs={9} sm={3.5} md={2.5} lg={2.5} style={{ background: "orange" }}>
                                a
                            </Grid>

                        </Grid >
                        <Create_Update_Car
                            stateProps={isShowModal}
                            close={onClickCloseModal}
                            reloadPage={reloadPage}
                            carManagers={null}
                            car={car}
                            id={id as string}
                        // car={null}
                        />

                    </>
                    :
                    <><h1>Loading</h1></>

            }
        </>
    )

}