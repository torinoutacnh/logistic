import { Container } from "@mui/material"
import PageLoader from "next/dist/client/page-loader"
import { Header } from "../Header/header"
import { Footer } from "../Footer"
import styles from "../../../styles/Home.module.scss"
import { useRouter } from "next/router"


export const MainLayout = (props: { children: React.ReactNode }) => {

    const router = useRouter();
    if (router.pathname.startsWith("/admin")) {
        return <>{props.children}</>;
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