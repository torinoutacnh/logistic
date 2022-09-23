import styles from './styles/carManagerInfo.module.scss'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Grid, Button, IconButton, Alert, Snackbar } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { env } from '../../Shared/Models/Everything';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useRouter } from 'next/router';
import { CarModel } from '../../Shared/Models/CarModel';
import { StopPointModel } from '../../Shared/Models/StopPointModel';
import { SeatModel } from '../../Shared/Models/SeatModel';
import { RouteModel } from '../../Shared/Models/RouteModel';
import { CarManagerModel } from '../../Shared/Models/CarManager';
import { ListiItemCarAdmin } from './ListItemCarAdmin';
import { UpdateCarManager } from './updateCarManager';

export const CarManagerInfo = () => {

    const router = useRouter()
    const { id } = router.query

    const [car, setCar] = useState<CarModel>()
    const [reRender, setReRender] = useState(0)
    const [carManager, setCarManager] = useState<CarManagerModel>()


    /////////////////////////////////////////////////////

    useEffect(() => {
        fetch(env.REACT_APP_API.concat("/cars-manager/").concat(id as string), {
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
                    console.log("get car manager status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log("get car manager status >= 400 ", data);
                    return
                }
                console.log("get car manager info => ", data.data);
                setCarManager(data.data)
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


    return (
        <>
            {
                carManager ?
                    <>
                        < Grid container className={styles.container} >

                            <Grid className={styles.top} item xs={11} sm={11} md={11} lg={11}>

                                <Grid item className={styles.item_logo} xs={12} sm={12} md={5.5} lg={5.5} >

                                    <Image
                                        style={{ borderRadius: "5px" }}
                                        src={env.REACT_APP_API.concat(carManager.logoPath)}
                                        alt="Không có logo"
                                        width={400}
                                        height={300}
                                    />

                                </Grid>

                                <Grid item className={styles.item_info} xs={12} sm={12} md={5.5} lg={5.5} style={{ flexGrow: 1 }}>
                                    <div className={styles.item_info_car}>
                                        <span className={styles.header_top}>Thông tin nhà xe</span>

                                        <span className={styles.text}>
                                            <span className={styles.title}>Tên nhà xe: </span>
                                            {carManager.name}
                                        </span>
                                        <span className={styles.text}>
                                            <span className={styles.title}>Mô tả: </span>
                                            {carManager.description}
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
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid item className={styles.item_bottom} xs={11} sm={11} md={9} lg={8}>
                                <span className={styles.header_top}>Thông tin xe</span>
                                <ListiItemCarAdmin typeProps={3} carManagerID={id as string} />

                            </Grid>

                        </Grid >

                        <UpdateCarManager
                            stateProps={isShowModalUpdate}
                            close={onClickCloseModalUpdate}
                            reloadPage={reloadPage}
                            id={id as string}
                            manage={carManager}
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