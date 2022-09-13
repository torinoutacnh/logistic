import { Container } from "@mui/material"
import PageLoader from "next/dist/client/page-loader"
import { Header } from "../Header/header"
import { Footer } from "../Footer"
import styles from "../../styles/Home.module.scss"


export const MainLayout = (props: { children: React.ReactNode }) => {
    return (
        <>
            <div className={styles.container}>
                <Header />
                {props.children}
            </div>
            <Footer />
        </>
    )
}