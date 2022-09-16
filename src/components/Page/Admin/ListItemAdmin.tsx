import { Button, Grid, IconButton } from "@mui/material"
import styles from './admin.module.scss'
import imageTest from "../../../styles/img/imgTest.jpg"
import Image from "next/image"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const ListiItemAdmin = () => {
    return (
        <>
            <Grid container className={styles.g_container}>

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
                                Xe khách Phương Trang
                            </span>

                            <span className={styles.text2}>
                                <span className={styles.title}>Hãng xe:</span>
                                Lamborghini aventador
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>Màu xe:</span>
                                đỏ
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>BKS:</span>
                                62F1-12345
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>SĐT:</span>
                                0338786622
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>Giá vé:</span>
                                <span style={{ color: "red", fontWeight: "500" }}>
                                    300.000
                                </span>
                            </span>

                        </div>
                    </div>
                </Grid>

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
                                Xe khách Phương Trang
                            </span>

                            <span className={styles.text2}>
                                <span className={styles.title}>Hãng xe:</span>
                                Lamborghini aventador
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>Màu xe:</span>
                                đỏ
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>BKS:</span>
                                62F1-12345
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>SĐT:</span>
                                0338786622
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>Giá vé:</span>
                                <span style={{ color: "red", fontWeight: "500" }}>
                                    300.000
                                </span>
                            </span>

                        </div>
                    </div>
                </Grid>


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
                                Xe khách Phương Trang
                            </span>

                            <span className={styles.text2}>
                                <span className={styles.title}>Hãng xe:</span>
                                Lamborghini aventador
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>Màu xe:</span>
                                đỏ
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>BKS:</span>
                                62F1-12345
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>SĐT:</span>
                                0338786622
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>Giá vé:</span>
                                <span style={{ color: "red", fontWeight: "500" }}>
                                    300.000
                                </span>
                            </span>

                        </div>
                    </div>
                </Grid>

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
                                Xe khách Phương Trang
                            </span>

                            <span className={styles.text2}>
                                <span className={styles.title}>Hãng xe:</span>
                                Lamborghini aventador
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>Màu xe:</span>
                                đỏ
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>BKS:</span>
                                62F1-12345
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>SĐT:</span>
                                0338786622
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>Giá vé:</span>
                                <span style={{ color: "red", fontWeight: "500" }}>
                                    300.000
                                </span>
                            </span>

                        </div>
                    </div>
                </Grid>


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
                                Xe khách Phương Trang
                            </span>

                            <span className={styles.text2}>
                                <span className={styles.title}>Hãng xe:</span>
                                Lamborghini aventador
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>Màu xe:</span>
                                đỏ
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>BKS:</span>
                                62F1-12345
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>SĐT:</span>
                                0338786622
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>Giá vé:</span>
                                <span style={{ color: "red", fontWeight: "500" }}>
                                    300.000
                                </span>
                            </span>

                        </div>
                    </div>
                </Grid>

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
                                Xe khách Phương Trang
                            </span>

                            <span className={styles.text2}>
                                <span className={styles.title}>Hãng xe:</span>
                                Lamborghini aventador
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>Màu xe:</span>
                                đỏ
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>BKS:</span>
                                62F1-12345
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>SĐT:</span>
                                0338786622
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>Giá vé:</span>
                                <span style={{ color: "red", fontWeight: "500" }}>
                                    300.000
                                </span>
                            </span>

                        </div>
                    </div>
                </Grid>


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
                                Xe khách Phương Trang
                            </span>

                            <span className={styles.text2}>
                                <span className={styles.title}>Hãng xe:</span>
                                Lamborghini aventador
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>Màu xe:</span>
                                đỏ
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>BKS:</span>
                                62F1-12345
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>SĐT:</span>
                                0338786622
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>Giá vé:</span>
                                <span style={{ color: "red", fontWeight: "500" }}>
                                    300.000
                                </span>
                            </span>

                        </div>
                    </div>
                </Grid>

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
                                Xe khách Phương Trang
                            </span>

                            <span className={styles.text2}>
                                <span className={styles.title}>Hãng xe:</span>
                                Lamborghini aventador
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>Màu xe:</span>
                                đỏ
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>BKS:</span>
                                62F1-12345
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>SĐT:</span>
                                0338786622
                            </span>
                            <span className={styles.text}>
                                <span className={styles.title}>Giá vé:</span>
                                <span style={{ color: "red", fontWeight: "500" }}>
                                    300.000
                                </span>
                            </span>

                        </div>
                    </div>
                </Grid>


            </Grid>

            <button className={styles.btnAddCircle}>+</button>
        </>
    )
}