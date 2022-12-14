import styles from "./styles/admin.module.scss";
import React, { useEffect, useState } from "react";
import {
  Grid,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Popover,
} from "@mui/material";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupsIcon from "@mui/icons-material/Groups";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { ServiceType } from "../../Shared/Models/Everything";
import { ListCarManager } from "./listCarManager";
import { ListiItemCarAdmin } from "./ListItemCarAdmin";
import { useRouter } from "next/router";

interface ItemComponent {
  icon: any;
  name: string;
  index: number;
  component: any;
}

interface ItemComponent {
  icon: any;
  name: string;
  index: number;
  component: any;
}

export const Admin = () => {
  const router = useRouter();

  const { index } = router.query;

  const [showComponent, setShowComponent] = useState(<>HOME</>);

  const listMenu: ItemComponent[] = [
    {
      icon: <GroupsIcon />,
      name: "Quản lý nhân viên",
      index: 1,
      component: <>Quản lý nhân viên</>,
    },
    {
      icon: <WarehouseIcon />,
      name: "Quản lý thông tin nhà xe",
      index: 2,
      component: <ListCarManager index={2} name={"Quản lý thông tin nhà xe"} />,
    },
    {
      icon: <AirportShuttleIcon />,
      name: "Quản lý xe",
      index: 3,
      component: (
        <ListiItemCarAdmin
          typeProps={ServiceType["Chở người"]}
          index={3}
          name={"Quản lý xe"}
        />
      ),
    },
    {
      icon: <LocalShippingIcon />,
      name: "Quản lý chành xe",
      index: 4,
      component: (
        <ListiItemCarAdmin
          typeProps={ServiceType["Chở hàng"]}
          index={4}
          name={"Quản lý chành xe"}
        />
      ),
    },
    {
      icon: <BarChartIcon />,
      name: "Báo cáo thống kê",
      index: 5,
      component: <>Báo cáo thống kê</>,
    },
    {
      icon: <ConfirmationNumberIcon />,
      name: "Vé xe",
      index: 6,
      component: <>Vé xe</>,
    },
  ];

  useEffect(() => {
    const item: ItemComponent = listMenu.find((i) => i.index === Number(index));
    setShowComponent(item?.component);
  }, [index]);

  /////////////////////////////////////////////////////////

  const [dataTitleMenu, setDataTitleMenu] = React.useState("Quản lý xe");

  const onClickItemMenu = (data: any) => {
    setDataTitleMenu(data.name);
    setShowComponent(data.component);
    handleClose2();
  };

  /////////////////////////////////////////////////////////

  const [anchorEl2, setAnchorEl2] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl2(event.currentTarget);
  const handleClose2 = () => setAnchorEl2(null);
  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover" : undefined;

  /////////////////////////////////////////////////////////
  return (
    <>
      <Grid
        container
        style={{ background: "#fff", minHeight: "calc(100vh - 60px)" }}
      >
        <Grid item xs={0} sm={0} md={0.5} xl={0.5}></Grid>
        <Grid item xs={12} sm={12} md={11} xl={11}>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              xl={3}
              className={styles.nav_body}
            >
              <div className={styles.menuNavRes}>
                <Button
                  onClick={handleClick2}
                  size="small"
                  className={styles.btnIconMenuRes}
                >
                  <DnsOutlinedIcon className={styles.iconMenuRes} />
                </Button>
                <h3 className={styles.headerNavRes}>{dataTitleMenu}</h3>

                <Button
                  size="small"
                  className={styles.btnIconMenuResVisibility}
                  disabled={true}
                ></Button>
              </div>

              <Popover
                id={id2}
                open={open2}
                anchorEl={anchorEl2}
                onClose={handleClose2}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <List
                  className={styles.list_nav}
                  sx={{ width: "100%", p: 0 }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader
                      component="div"
                      id="nested-list-subheader"
                      style={{ textAlign: "center" }}
                    >
                      {/* <span className={styles.subheader}>Quản lý thông tin</span> */}
                    </ListSubheader>
                  }
                >
                  {listMenu.map((item, index) => {
                    return (
                      <ListItemButton
                        onClick={() => onClickItemMenu(item)}
                        key={index}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Popover>

              <List
                className={`${styles.list_nav} ${styles.list_nav_invisible}`}
                sx={{ width: "100%", p: 0 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                {listMenu.map((item, index) => {
                  return (
                    <ListItemButton
                      onClick={() => {
                        onClickItemMenu(item);
                      }}
                      key={index}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  );
                })}
              </List>
            </Grid>
            <Grid item xs={12} sm={12} md={9} xl={9}>
              <div className={styles.wrapper}>{showComponent}</div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={0} sm={0} md={1} xl={1}></Grid>
      </Grid>
    </>
  );
};
