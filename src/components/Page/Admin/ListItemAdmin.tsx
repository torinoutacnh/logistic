import { Grid } from "@mui/material"
import styles from './admin.module.scss'
import imageTest from "../../../styles/img/imgTest.jpg"
import Image from "next/image"

export const ListiItemAdmin = () => {
    return (
        <>
            <Grid container className={styles.g_container}>
                <Grid xs={11} sm={11} md={10} xl={5.5}>
                    <div className={styles.g_item}>
                        <div className={styles.g_item_image}>
                            <Image src={imageTest} style={{ borderRadius: "5px" }} />
                        </div>
                        <span className={styles.g_item_name}>
                            {`Mẹo: Tìm kiếm chỉ kết quả tiếng Việt. Bạn có thể chỉ định ngôn ngữ tìm kiếm của mình trong Tùy chọn`}
                        </span>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}