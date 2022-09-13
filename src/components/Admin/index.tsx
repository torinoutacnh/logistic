import styles from './admin.module.scss'
import * as React from 'react';
import Image from 'next/image'
import { Grid, TextField, Box, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Collapse, FormControl, MenuItem, Select, SelectChangeEvent, Button, IconButton, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddIcon from '@mui/icons-material/Add';

export const Admin = () => {
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    const handleClick1 = () => {
        setOpen1(!open1);
    };

    const handleClick2 = () => {
        setOpen2(!open2);
    };

    const [area, setArea] = React.useState('');

    const handleChange = (e: SelectChangeEvent) => {
        setArea(e.target.value as string);
    };

    const dataDistrict = [
        "Quận 1",
        "Quận 2",
        "Quận 3",
        "Quận 4",
        "Quận 5",
        "Quận 6",
        "Quận 7",
        "Quận 8",
        "Quận 9",
        "Quận 10",
        "Quận 11",
        "Quận 12",
        "Quận Bình Tân",
        "Quận Bình Thạnh",
        "Quận Gò Vấp",
        "Quận Phú Nhuận",
        "Quận Tân Bình",
        "Quận Tân Phú",
        "Quận Thủ Đức",
        "Huyện Bình Chánh",
        "Huyện Cần Giờ",
        "Huyện Củ Chi",
        "Huyện Hóc Môn",
        "Huyện Nhà Bè",
    ]

    const listChair = [
        {
            icon: <AirlineSeatReclineExtraIcon />,
            name: "Ghế ngồi (4)"
        },
        {
            icon: <AirlineSeatReclineExtraIcon />,
            name: "Ghế ngồi (7)"
        },
        {
            icon: <AirlineSeatReclineExtraIcon />,
            name: "Ghế ngồi (16)"
        },
        {
            icon: <AirlineSeatReclineExtraIcon />,
            name: "Ghế ngồi (29)"
        },
        {
            icon: <AirlineSeatReclineExtraIcon />,
            name: "Ghế ngồi (35)"
        },
        {
            icon: <AirlineSeatReclineExtraIcon />,
            name: "Ghế ngồi (45)"
        },
        {
            icon: <AirlineSeatFlatIcon />,
            name: "Giường nằm (20)"
        },
        {
            icon: <AirlineSeatFlatIcon />,
            name: "Giường nằm (34)"
        },
        {
            icon: <AirlineSeatFlatIcon />,
            name: "Giường nằm (40)"
        }
    ]

    const listCar = [
        {
            icon: <AirportShuttleIcon />,
            name: "Xe khách"
        },
        {
            icon:  <LocalShippingIcon />,
            name: "Xe chở hàng"
        }
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

    return (
        <>
            <Grid container style={{ background: "#f9e5e6"}}>
                <Grid item xs={0.5} sm={0.5} md={1} xl={1}></Grid>
                <Grid item xs={11} sm={11} md={10} xl={10}>
                    <div className={styles.header}>
                        <div className={styles.logo}>Logo</div>
                        <div className={styles.nav}>
                            <Box className={styles.box}>
                                <SearchIcon className={styles.icon}/>
                                <TextField 
                                    id="input-with-sx"
                                    variant="standard"
                                    size='small'
                                    style={{ width: "50%" }}
                                />
                            </Box>
                            <div className={styles.icon}>
                            <Stack direction="row" spacing={1}>
                                <IconButton aria-label="notify">
                                    <NotificationsNoneIcon />
                                </IconButton>
                                <IconButton aria-label="account">
                                    <AccountCircleIcon />
                                </IconButton>
                            </Stack>    
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={0.5} sm={0.5} md={1} xl={1}></Grid>
            </Grid>

            <Grid container>
                <Grid item xs={0} sm={0} md={1} xl={1}></Grid>
                <Grid item xs={12} sm={12} md={10} xl={10}>
                    <Grid container>
                        <Grid item xs={3} sm={3} md={3} xl={3}>
                            <List
                                sx={{ width: '100%', p: 0 }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader" style={{ textAlign: "center" }} >
                                        <span className={styles.subheader}>Quản lý thông tin xe</span>
                                    </ListSubheader>
                                }
                            >
                                <ListItemButton onClick={handleClick1}>
                                    <ListItemIcon>
                                        <AirportShuttleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Quản lý xe" />
                                    {open1 ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={open1} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        
                                        {
                                            listChair.map((item,index)=>{
                                                return(
                                                    <ListItemButton sx={{ pl: 4 }}>
                                                    <ListItemIcon>
                                                        {item.icon}
                                                    </ListItemIcon> 
                                                    <ListItemText key={index} primary={item.name} />
                                                </ListItemButton>
                                                )
                                            })
                                        }
                                            
                                    </List>
                                </Collapse>
                            </List>

                            <List
                                sx={{ width: '100%', p: 0 }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                <ListItemButton onClick={handleClick2}>
                                    <ListItemIcon>
                                        <HomeWorkIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Quản lý chành xe" />
                                    {open2 ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={open2} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>

                                        {
                                            listCar.map((item,index)=>{
                                                return(
                                                    <ListItemButton sx={{ pl: 4 }}>
                                                    <ListItemIcon>
                                                        {item.icon}
                                                    </ListItemIcon> 
                                                    <ListItemText key={index} primary={item.name} />
                                                </ListItemButton>
                                                )
                                            })
                                        }

                                    </List>
                                </Collapse>
                            </List>
                                    
                            <ListItemButton>
                                <ListItemIcon>
                                    <RouteOutlinedIcon />   
                                </ListItemIcon>
                                <ListItemText primary="Tuyến đường" />
                            </ListItemButton>
                        </Grid>
                        <Grid item xs={9} sm={9} md={9} xl={9}>
                            <div className={styles.option}>
                                <Box className={styles.area}>
                                    <span>Khu vực</span>
                                    <FormControl fullWidth size="small">
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            MenuProps={MenuProps}
                                            value={area}
                                            onChange={handleChange}
                                        >

                                            {
                                                dataDistrict.map((item,index)=>(
                                                    <MenuItem 
                                                        key={index} 
                                                        value={item}
                                                    >
                                                        {item}
                                                    </MenuItem>
                                                    )
                                                )
                                            }

                                        </Select>
                                    </FormControl>
                                </Box>

                                <Button 
                                    variant="outlined"
                                    size='small' 
                                    startIcon={<AddIcon />}
                                    sx={{ marginRight: 3 }}
                                >
                                    Thêm mới
                                </Button>
                            </div>
                            <div className={styles.wrapper}>
                                dawdadawd
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={0} sm={0} md={1} xl={1}></Grid>
            </Grid>
        </>
    )
}