import { Button, Grid, IconButton } from "@mui/material"
import styles from './admin.module.scss'
import imageTest from "../../../styles/img/imgTest.jpg"
import Image from "next/image"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from "react";
import { CarModel } from "../../Shared/Models/CarModel";
import { env } from "../../Shared/Models/Everything";

export const ListiItemAdmin = () => {

    const [car, setCar] = useState<CarModel[]>()



    useEffect(() => {
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

                console.log("get car => ", data.data);

                setCar(data.data)


            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })

    }, [])

    return (
        <>
            {
                !car ?
                    <><h1>Loading</h1></>
                    :
                    <>
                        <Grid container className={styles.g_container}>


                            {
                                car.map((item, index) => {
                                    return (
                                        <Grid xs={11.5} sm={9} md={9} lg={8} xl={5.9}>
                                            <div className={styles.g_item}>

                                                <div className={styles.left}>
                                                    <div className={styles.image}>
                                                        <Image src={imageTest} style={{ borderRadius: "5px" }} />
                                                    </div>
                                                    <div className={styles.action}>

                                                        <Button className={styles.btn}>
                                                            <BorderColorIcon className={styles.icon} />
                                                            <span className={styles.text}>
                                                                Chỉnh sửa
                                                            </span>
                                                        </Button>

                                                        <Button className={styles.btn} color={"error"}>
                                                            <DeleteIcon className={styles.icon} />
                                                            <span className={styles.text}>
                                                                Xóa
                                                            </span>
                                                        </Button>

                                                    </div>
                                                </div>

                                                <div className={styles.right}>

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
                    </>
            }
        </>
    )

}