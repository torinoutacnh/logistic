import { Container } from "@mui/material"
import PageLoader from "next/dist/client/page-loader"
import { Header } from "../../pages/header"
import { Footer } from "../Footer"


export const MainLayout = (props: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <Container>
                {props.children}
            </Container>
            <Footer />
        </>
    )
}