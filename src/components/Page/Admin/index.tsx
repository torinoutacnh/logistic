import styles from './admin.module.scss'
import * as React from 'react';
import Image from 'next/image';
import { Grid, TextField, Box, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Collapse, FormControl, MenuItem, Select, SelectChangeEvent, Button, IconButton, Stack, Tooltip, Menu, Divider, Badge, Dialog, DialogContent, DialogActions, Popover } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddIcon from '@mui/icons-material/Add';
import { ListiItemAdmin } from './ListItemAdmin';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupsIcon from '@mui/icons-material/Groups';
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BadgeIcon from '@mui/icons-material/Badge';


export const Admin = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [area, setArea] = React.useState('');


    const open = Boolean(anchorEl);

    const [openSearch, setOpenSearch] = React.useState(false);

    const handleClickOpen = () => {
        setOpenSearch(true);
    };

    const handleClickClose = () => {
        setOpenSearch(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleChange = (e: SelectChangeEvent) => {
        setArea(e.target.value as string);
    };

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

    /////////////////////////////////////////////////////////

    const [dataTitleMenu, setDataTitleMenu] = React.useState("Quản lý xe")
    const onClickItemMenu = (data?: string) => {
        setDataTitleMenu(data)
        handleClose2()
    }

    /////////////////////////////////////////////////////////

    const [anchorEl2, setAnchorEl2] = React.useState<HTMLButtonElement | null>(null);

    const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const open2 = Boolean(anchorEl2);
    const id2 = open2 ? 'simple-popover' : undefined;

    /////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////


    return (
        <>
            <Grid container className={styles.bgheader}>
                <Grid item xs={0.5} sm={0.5} md={0.5} xl={0.5}></Grid>
                <Grid item xs={11} sm={11} md={11} xl={11}>
                    <div className={styles.header}>

                        <div className={styles.logoDesktop}>LogoPC</div>
                        <Box className={styles.search}>
                            <SearchIcon />
                            <TextField
                                className={styles.search_input}
                                id="input-with-sx"
                                variant="standard"
                                size='small'
                            />
                        </Box>
                        <div className={styles.searchMobile}>
                            <IconButton
                                size="small"
                                className={styles.search_icon}
                                onClick={handleClickOpen}
                            >
                                <SearchIcon />
                            </IconButton>
                            <Dialog open={openSearch} onClose={handleClickClose}>
                                <DialogContent style={{ overflow: "hidden" }}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Nhập để tìm kiếm"
                                        type="text"
                                        variant="standard"
                                        style={{ width: "70vw" }}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClickClose}>Tìm kiếm</Button>
                                </DialogActions>
                            </Dialog>

                        </div>
                        <div className={styles.logoMobile}>LogoMb</div>
                        <div className={styles.icon}>
                            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                                <Tooltip title="Thông báo">
                                    <IconButton size="small">
                                        <Badge badgeContent={"99+"} color="error">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Cài đặt tài khoản">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? "true" : undefined}
                                    >
                                        <AccountCircleIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: "visible",
                                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                        mt: 1.5,
                                        "& .MuiAvatar-root": {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1
                                        },
                                        "&:before": {
                                            content: '""',
                                            display: "block",
                                            position: "absolute",
                                            top: 0,
                                            right: 12,
                                            width: 10,
                                            height: 10,
                                            bgcolor: "background.paper",
                                            transform: "translateY(-50%) rotate(45deg)",
                                            zIndex: 0
                                        }
                                    }
                                }}
                                transformOrigin={{ horizontal: "right", vertical: "top" }}
                                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                            >
                                <MenuItem>
                                    <ListItemIcon>
                                        <BadgeIcon fontSize="small" />
                                    </ListItemIcon>
                                    Hồ sơ
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <AccountCircleIcon fontSize="small" />
                                    </ListItemIcon>
                                    Tài khoản
                                </MenuItem>
                                <Divider />
                                <MenuItem>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Cài đặt
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Đăng xuất
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={0.5} sm={0.5} md={0.5} xl={0.5}></Grid>
            </Grid>

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
                                                <ListItemButton onClick={() => onClickItemMenu(item.name)}>
                                                    <ListItemIcon>
                                                        {item.icon}
                                                    </ListItemIcon>
                                                    <ListItemText key={index} primary={item.name} />
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
                        <Grid item xs={12} sm={12} md={9} xl={9}>
                            <div className={styles.option}>
                                {/* <Box className={styles.area}>
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
                                                dataDistrict.map((item, index) => (
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
                                </Box> */}

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