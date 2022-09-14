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
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddIcon from '@mui/icons-material/Add';
import { ListiItemAdmin } from './ListItemAdmin';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupsIcon from '@mui/icons-material/Groups';

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

    const listMenu = [
        {
            icon: <GroupsIcon />,
            name: "Quản lý nhân viên"
        },
        {
            icon: <AirportShuttleIcon />,
            name: "Quản lý xe"
        },
        {
            icon: <LocalShippingIcon />,
            name: "Quản lý chành xe"
        },
        {
            icon: <BarChartIcon />,
            name: "Báo cáo thống kê"
        },
        {
            icon: <ConfirmationNumberIcon />,
            name: "Vé xe"
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

    return (
        <>
            <Grid container style={{ background: "#f9e5e6"}}>
                <Grid item xs={0.5} sm={0.5} md={0.5} xl={0.5}></Grid>
                <Grid item xs={11} sm={11} md={11} xl={11}>
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
                                <IconButton aria-label="notify" onClick={handleClick1}>
                                    
                                    <div className={styles.account}>
                                        <List
                                            sx={{ width: '10%', p: 0 }}
                                            component="nav"
                                            aria-labelledby="nested-list-subheader"
                                        >
                                            <NotificationsNoneIcon />
                                            

                                        </List>
                                    </div>
                                </IconButton>
                                <IconButton aria-label="account">
                                    <AccountCircleIcon />
                                </IconButton>
                            </Stack>    
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={0.5} sm={0.5} md={0.5} xl={0.5}></Grid>
            </Grid>

            <Grid container>
                <Grid item xs={0} sm={0} md={0.5} xl={0.5}></Grid>
                <Grid item xs={12} sm={12} md={11} xl={11}>
                    <Grid container>
                        <Grid item xs={3} sm={3} md={3} xl={3}>
                            {/* <List
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
                            </List> */}

                            <List
                                sx={{ width: '100%', p: 0 }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader" style={{ textAlign: "center" }} >
                                        <span className={styles.subheader}>Quản lý thông tin</span>
                                    </ListSubheader>
                                }
                            >
                                {
                                    listMenu.map((item,index)=>{
                                        return(        
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    {item.icon}   
                                                </ListItemIcon>
                                                <ListItemText key={index} primary={item.name} />
                                            </ListItemButton>
                                        )
                                    })
                                }
                            </List>

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

                                <ListiItemAdmin />

                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={0} sm={0} md={1} xl={1}></Grid>
            </Grid>
        </>
    )
}