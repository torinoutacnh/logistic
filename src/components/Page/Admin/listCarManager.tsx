import { Alert, Box, Button, Grid, IconButton, Snackbar, TextField } from "@mui/material"
import styles from './styles/admin.module.scss'
import Image from "next/image"
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AddIcon from '@mui/icons-material/Add';
import { CreateCarManager } from "./createCarManager";
import { CarManagerModel } from "../../Shared/Models/CarManager";
import ProgressBar from "../../Shared/Components/Loading/ProgressBar";
import SearchIcon from '@mui/icons-material/Search';


export const ListCarManager = (props: { typeProps?: number, index: number, name: string }) => {

    const [reRender, setReRender] = useState(0)
    const [carManager, setCarManager] = useState<CarManagerModel[]>()

    const router = useRouter()

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
    }

    ////////////////////////////////////////////////////

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API.concat("/cars-manager"), {
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
                // console.log("get car manager => ", data.data);
                setCarManager(data.data)
            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })
    }, [reRender])

    const onClickDeleteCarManager = (idCarManager: string) => {
        fetch(process.env.NEXT_PUBLIC_API.concat(`/cars-manager/delete-manager/${idCarManager}`), {
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
                    console.log("delete car manager status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log("delete car manager status >= 400 ", data);
                    handleOpenNotify("Xo?? nh?? xe th???t b???i!", "error")
                    return
                }

                console.log("delete car manager => ", data);
                handleOpenNotify("X??a nh?? xe th??nh c??ng", "success")
                setReRender(pre => pre + 1)
            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })
    }

    const handelOnClickItemManager = (carManagerId: string) => {
        router.push({ pathname: "/admin/carManagerInfo", query: { id: carManagerId, index: props.index } })
    }

    ////////////////////////////////////////////////////////
    const [isShowModal, setIsShowModal] = useState(false);
    const onClickShowModal = () => setIsShowModal(true);
    const onClickCloseModal = () => setIsShowModal(false);
    const reloadPage = () => {
        setReRender(reRender + 1)
    }

    const [search, setSearch] = useState('');
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <>
            {
                (carManager) ?
                    <>
                        <Grid container className={styles.g_container}>
                            <div className={styles.option}>
                                <Box className={styles.search}>
                                    <IconButton className={styles.icon}>
                                        <SearchIcon />
                                    </IconButton>
                                    <TextField
                                        className={styles.search_input}
                                        id="input-with-sx"
                                        variant="standard"
                                        size='small'
                                        fullWidth
                                        value={search}
                                        onChange={(e) => handleChangeSearch(e)}
                                    />
                                </Box>
                                <span>{props.name}</span>
                                <Button
                                    className={styles.btnAdd}
                                    variant="outlined"
                                    size='small'
                                    startIcon={<AddIcon sx={{ color: "blue" }} />}
                                    sx={{ mr: 3 }}
                                    onClick={() => { onClickShowModal() }}
                                >
                                    Th??m m???i
                                </Button>
                            </div>
                            {
                                carManager?.map((item, index) => {
                                    return (
                                        <Grid xs={11.5} sm={9} md={9} lg={8} xl={5.9} key={index}>
                                            <div className={styles.g_item} >

                                                <div className={styles.left}>
                                                    <div className={styles.image} onClick={() => { handelOnClickItemManager(item.id) }}>
                                                        <Image
                                                            style={{ borderRadius: "5px" }}
                                                            src={process.env.NEXT_PUBLIC_API.concat(item.logoPath)}
                                                            alt="Kh??ng c?? logo"
                                                            width={1000}
                                                            height={1000}
                                                        />
                                                    </div>
                                                    <div className={styles.action}>

                                                        <Button
                                                            className={styles.btn} color={"error"}
                                                            onClick={() => { onClickDeleteCarManager(item.id) }}
                                                        >
                                                            <DeleteIcon className={styles.icon} />
                                                            <span className={styles.text}>
                                                                X??a
                                                            </span>
                                                        </Button>

                                                    </div>
                                                </div>

                                                <div className={styles.right} onClick={() => { handelOnClickItemManager(item.id) }}>

                                                    <span className={styles.text2}>
                                                        <span className={styles.title}>T??n nh?? xe: </span>
                                                        {item.name}
                                                    </span>

                                                    <span className={styles.text2}>
                                                        <span className={styles.title}>M?? t???: </span>
                                                        <span className={styles.discription}>{item.description}</span>
                                                    </span>

                                                </div>
                                            </div>
                                        </Grid>
                                    )
                                })
                            }

                        </Grid>
                        <button className={styles.btnAddCircle} onClick={() => onClickShowModal()}>+</button>
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
                        <CreateCarManager
                            stateProps={isShowModal}
                            close={onClickCloseModal}
                            reloadPage={reloadPage}
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
        </>
    )
}