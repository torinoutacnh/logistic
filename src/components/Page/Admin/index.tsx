import styles from './admin.module.scss'
import React from 'react';
import Image from 'next/image';
import { Grid, TextField, Box, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Collapse, FormControl, MenuItem, Select, SelectChangeEvent, Button, IconButton, Stack, Tooltip, Menu, Divider, Badge, Dialog, DialogContent, DialogActions, Popover } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { ListiItemAdmin } from './ListItemAdmin';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupsIcon from '@mui/icons-material/Groups';
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BadgeIcon from '@mui/icons-material/Badge';
import { ServiceType } from '../../Shared/Models/Everything';
import { HeaderAdmin } from './headerAdmin';
import { CreateCar } from './createCar';
import { CarInfo } from './carInfo';


export const Admin = () => {

    // const [area, setArea] = React.useState('');

    // const handleChange = (e: SelectChangeEvent) => {
    //     setArea(e.target.value as string);
    // };

    const listMenu = [
        {
            icon: <GroupsIcon />,
            name: "Quản lý nhân viên",
            type: 2
        },
        {
            icon: <AirportShuttleIcon />,
            name: "Quản lý xe",
            type: ServiceType["Chở người"]
        },
        {
            icon: <LocalShippingIcon />,
            name: "Quản lý chành xe",
            type: ServiceType["Chở hàng"]
        },
        {
            icon: <BarChartIcon />,
            name: "Báo cáo thống kê",
            type: 2
        },
        {
            icon: <ConfirmationNumberIcon />,
            name: "Vé xe",
            type: 2
        },
    ]

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 220,
            },
        },
    };

    /////////////////////////////////////////////////////////

    const [dataTitleMenu, setDataTitleMenu] = React.useState("Quản lý xe")
    const [typeCar, setTypeCar] = React.useState<number>(2)

    const onClickItemMenu = (data: any) => {
        setDataTitleMenu(data.name)
        setTypeCar(data.type)
        handleClose2()
    }

    /////////////////////////////////////////////////////////

    const [anchorEl2, setAnchorEl2] = React.useState<HTMLButtonElement | null>(null);

    const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl2(event.currentTarget);
    const handleClose2 = () => setAnchorEl2(null);
    const open2 = Boolean(anchorEl2);
    const id2 = open2 ? 'simple-popover' : undefined;

    /////////////////////////////////////////////////////////



    return (
        <>


            <Grid container style={{ background: "#fff" }}>
                <Grid item xs={0} sm={0} md={0.5} xl={0.5}></Grid>
                <Grid item xs={12} sm={12} md={11} xl={11}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={3} xl={3}>

                            <div className={styles.menuNavRes}>
                                <Button onClick={handleClick2} size="small" className={styles.btnIconMenuRes}>
                                    <DnsOutlinedIcon className={styles.iconMenuRes} />
                                </Button>
                                <h3 className={styles.headerNavRes}>{dataTitleMenu} </h3>

                                <Button size="small" className={styles.btnIconMenuResVisibility} disabled={true}>
                                </Button>
                            </div>

                            <Popover
                                id={id2}
                                open={open2}
                                anchorEl={anchorEl2}
                                onClose={handleClose2}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <List

                                    className={styles.list_nav}
                                    sx={{ width: '100%', p: 0 }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader" style={{ textAlign: "center" }} >
                                            {/* <span className={styles.subheader}>Quản lý thông tin</span> */}
                                        </ListSubheader>
                                    }
                                >
                                    {
                                        listMenu.map((item, index) => {
                                            return (
                                                <ListItemButton onClick={() => onClickItemMenu(item)} key={index}>
                                                    <ListItemIcon>
                                                        {item.icon}
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.name} />
                                                </ListItemButton>
                                            )
                                        })
                                    }
                                </List>
                            </Popover>

                            <List

                                className={`${styles.list_nav} ${styles.list_nav_invisible}`}
                                sx={{ width: '100%', p: 0 }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader" style={{ textAlign: "center" }} >
                                        {/* <span className={styles.subheader}>Quản lý thông tin</span> */}
                                    </ListSubheader>
                                }
                            >
                                {
                                    listMenu.map((item, index) => {
                                        return (
                                            <ListItemButton onClick={() => { onClickItemMenu(item) }} key={index} >
                                                <ListItemIcon>
                                                    {item.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={item.name} />
                                            </ListItemButton>
                                        )
                                    })
                                }
                            </List>

                        </Grid>
                        <Grid item xs={12} sm={12} md={9} xl={9}>

                            <div className={styles.wrapper}>

                                <ListiItemAdmin typeProps={typeCar} />

                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={0} sm={0} md={1} xl={1}></Grid>
            </Grid>

        </>
    )
}