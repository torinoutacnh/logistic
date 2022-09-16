import { MainLayout } from "./MainLayout";

export default function Provider(props: { children: React.ReactNode }) {
    return <MainLayout>{props.children}</MainLayout>
}

