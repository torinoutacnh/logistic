import styles from './styles/admin.module.scss'
import React from 'react';
import { Grid, TextField, Box, ListItemIcon, MenuItem, Button, IconButton, Tooltip, Menu, Divider, Badge, Dialog, DialogContent, DialogActions, Popover, Alert } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import NotificationsIcon from '@mui/icons-material/Notifications';
import BadgeIcon from '@mui/icons-material/Badge';
import { useRouter } from 'next/router';

export const HeaderAdmin = () => {

    const router = useRouter()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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

    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    const [anchorEl2, setAnchorEl2] = React.useState<HTMLButtonElement | null>(null);

    const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const open2 = Boolean(anchorEl2);
    const id2 = open2 ? 'simple-popover' : undefined;
    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////

    const onClickHome = () => {
        router.push("/admin")

    }

    return <>
        <Grid container className={styles.bgheader}>
            <Grid item xs={0.5} sm={0.5} md={0.5} xl={0.5}></Grid>
            <Grid item xs={11} sm={11} md={11} xl={11}>
                <div className={styles.header}>

                    <div className={styles.logoDesktop} onClick={() => { onClickHome() }} >LogoPC</div>
                    
                    {/* <div className={styles.searchMobile}>
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

                    </div> */}
                    <div className={styles.logoMobile} onClick={() => { onClickHome() }}>LogoMb</div>
                    <div className={styles.icon}>
                        <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                            <Tooltip title="Thông báo">
                                <IconButton size="small" onClick={handleClick2}>
                                    <Badge badgeContent={"99+"} color="error">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>

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
                                <Alert variant="filled" severity="error">
                                    This is an error alert — check it out!
                                </Alert>
                                <Alert variant="filled" severity="warning">
                                    This is a warning alert — check it out!
                                </Alert>
                                <Alert variant="filled" severity="info">
                                    This is an info alert — check it out!
                                </Alert>
                                <Alert variant="filled" severity="success">
                                    This is a success alert — check it out!
                                </Alert>
                                <Alert variant="filled" severity="error">
                                    This is an error alert — check it out!
                                </Alert>
                                <Alert variant="filled" severity="warning">
                                    This is a warning alert — check it out!
                                </Alert>
                                <Alert variant="filled" severity="info">
                                    This is an info alert — check it out!
                                </Alert>
                                <Alert variant="filled" severity="success">
                                    This is a success alert — check it out!
                                </Alert>
                            </Popover>

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
    </>
}