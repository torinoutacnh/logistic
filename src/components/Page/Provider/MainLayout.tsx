import { Container } from "@mui/material"
import PageLoader from "next/dist/client/page-loader"
import { Header } from "../Header/header"
import { Footer } from "../Footer"
import styles from "../../../styles/Home.module.scss"
import { useRouter } from "next/router"
import { HeaderAdmin } from "../Admin/headerAdmin"


export const MainLayout = (props: { children: React.ReactNode }) => {

    const router = useRouter();
    if (router.pathname.startsWith("/admin")) {
        return (
            <>
                <div style={{ background: "white" }}>
                    <HeaderAdmin />
                    {props.children}
                </div>
            </>
        )
    }

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