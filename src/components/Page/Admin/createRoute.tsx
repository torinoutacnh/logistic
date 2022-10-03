import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import styles from "./styles/createRouter.module.scss";
import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { ServiceType } from "../../Shared/Models/Everything";
import { CarModel } from "../../Shared/Models/CarModel";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useForm, useFieldArray } from "react-hook-form";
import ReactDOM from "react-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { SeatModel } from "../../Shared/Models/SeatModel";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import CancelIcon from "@mui/icons-material/Cancel";
import { RouteModel } from "../../Shared/Models/RouteModel";
import { CityModel } from "../../Shared/Models/CityModel";
import { DistrictModel } from "../../Shared/Models/DistrictModel";
import { WardModel } from "../../Shared/Models/WardModel";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  textAlign: "center",
};

export function CreateRoute(props?: {
  stateProps: boolean;
  close: any;
  reloadPage: any;
  id: string;
}) {
  const [isShow, setIsShow] = useState(false);
  const [typeNotifi, setTypeNotifi] = useState("success");

  ///////////////////////////////////////////
  ///////////////////////////////////////////
  const [distance, setDistance] = useState<number>();
  const [day, setDay] = useState<number>();
  const [hour, setHour] = useState<number>();
  const [minute, setMinute] = useState<number>();
  ///////////////////////////////////////////
  const [cityFrom, setCityFrom] = useState<CityModel>();
  const [districtFrom, setDistrictFrom] = useState<DistrictModel>();
  const [wardFrom, setWardFrom] = useState<WardModel>();
  const [streetFrom, setStreetFrom] = useState<string>();
  const [houseNumberFrom, setHouseNumberFrom] = useState<string>();
  ////////////////////////////////////////////
  const [listDistrictFrom, setListDistrictFrom] = useState<DistrictModel[]>();
  const [listWardFrom, setListWardFrom] = useState<WardModel[]>();
  //////////////////////////////////////////
  const [cityTo, setCityTo] = useState<CityModel>();
  const [districtTo, setDistrictTo] = useState<DistrictModel>();
  const [wardTo, setWardTo] = useState<WardModel>();
  const [streetTo, setStreetTo] = useState<string>();
  const [houseNumberTo, setHouseNumberTo] = useState<string>();
  //////////
  const [listDistrictTo, setListDistrictTo] = useState<DistrictModel[]>();
  const [listWardTo, setListWardTo] = useState<WardModel[]>();
  /////////////////////////////////////////
  const [listCity, setListCity] = useState<CityModel[]>();

  const loadData = async () => {
    const res_city = await fetch(
      process.env.NEXT_PUBLIC_API.concat("/cities"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer ".concat(user.token),
        }, // body: JSON.stringify(form.getFieldsValue()),
      }
    );
    if (res_city.status > 200) {
      return;
    }
    const data_res_city = await res_city.json();
    setListCity(data_res_city.data);
  };

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (cityFrom) {
      fetch(process.env.NEXT_PUBLIC_API.concat(`/districts/${cityFrom.id}`), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer ".concat(user.token),
        },
        // body: JSON.stringify(form.getFieldsValue()),
      })
        .then(async (res) => {
          const data = await res.json();

          if (res.status >= 500) {
            console.log("get district status >= 500 ", data);
            return;
          } else if (res.status >= 400) {
            console.log("get district status >= 400 ", data);
            return;
          }
          setListDistrictFrom(data.data);
        })
        .catch((error) => {
          console.log(" error >>>>>>", error);
        });
    }
  }, [cityFrom]);

  useEffect(() => {
    if (cityTo) {
      fetch(process.env.NEXT_PUBLIC_API.concat(`/districts/${cityTo.id}`), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer ".concat(user.token),
        },
        // body: JSON.stringify(form.getFieldsValue()),
      })
        .then(async (res) => {
          const data = await res.json();

          if (res.status >= 500) {
            console.log("get district status >= 500 ", data);
            return;
          } else if (res.status >= 400) {
            console.log("get district status >= 400 ", data);
            return;
          }
          setListDistrictTo(data.data);
        })
        .catch((error) => {
          console.log(" error >>>>>>", error);
        });
    }
  }, [cityTo]);

  /////////////////////////////////////////////////////////////

  useEffect(() => {
    if (districtFrom) {
      fetch(process.env.NEXT_PUBLIC_API.concat(`/wards/${districtFrom.id}`), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer ".concat(user.token),
        },
        // body: JSON.stringify(form.getFieldsValue()),
      })
        .then(async (res) => {
          const data = await res.json();

          if (res.status >= 500) {
            console.log("get ward status >= 500 ", data);
            return;
          } else if (res.status >= 400) {
            console.log("get ward status >= 400 ", data);
            return;
          }
          setListWardFrom(data.data);
        })
        .catch((error) => {
          console.log(" error >>>>>>", error);
        });
    }
  }, [districtFrom]);

  useEffect(() => {
    if (districtTo) {
      fetch(process.env.NEXT_PUBLIC_API.concat(`/wards/${districtTo.id}`), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer ".concat(user.token),
        },
        // body: JSON.stringify(form.getFieldsValue()),
      })
        .then(async (res) => {
          const data = await res.json();

          if (res.status >= 500) {
            console.log("get ward status >= 500 ", data);
            return;
          } else if (res.status >= 400) {
            console.log("get ward status >= 400 ", data);
            return;
          }
          setListWardTo(data.data);
        })
        .catch((error) => {
          console.log(" error >>>>>>", error);
        });
    }
  }, [districtTo]);

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setIsShow(props.stateProps);
    loadData();
  }, [props.stateProps]);

  const [openNotify, setOpenNofity] = useState(false);
  const [messageNotify, setMessageNotify] = useState("");

  const handleOpenNotify = (message: string, type: string) => {
    setTypeNotifi(type);
    setMessageNotify(message);
    setOpenNofity(true);
  };

  const handleCloseNotify = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNofity(false);
  };

  ///////////////////////////////////////////////////////////////////////////
  // function getCurrentDateTime() {
  //     const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  //     const localISOTime = new Date(Date.now() - tzoffset).toISOString();
  //     const mySqlDT = localISOTime;
  //     return mySqlDT;
  // }
  ///////////////////////////////////////////////////////////////////////////

  const resetForm = () => {
    setListCity([]);
    setListDistrictFrom([]);
    setListWardFrom([]);
    setListDistrictTo([]);
    setListWardTo([]);
    setCityFrom(null);
    setDistrictFrom(null);
    setWardFrom(null);
    setStreetFrom(null);
    setHouseNumberFrom(null);
    setCityTo(null);
    setDistrictTo(null);
    setWardTo(null);
    setStreetTo(null);
    setHouseNumberTo(null);
    setDistance(null);
    setDay(null);
    setHour(null);
    setMinute(null);
  };

  const onCloseModal = () => {
    resetForm();
    props.close();
  };

  const onClickSubmit = () => {
    const routerCreate: RouteModel = {
      from: {
        cityId: cityFrom?.id,
        districtId: districtFrom?.id,
        wardId: wardFrom?.id,
        street: streetFrom,
        houseNumber: houseNumberFrom,
      },
      to: {
        cityId: cityTo?.id,
        districtId: districtTo?.id,
        wardId: wardTo?.id,
        street: streetTo,
        houseNumber: houseNumberTo,
      },
      distanceByKm: distance,
      day: day,
      hour: hour,
      minute: minute,
    };
    console.log("router create", routerCreate);

    // list.map(i => i.dailyStartTime = getCurrentDateTime())

    fetch(process.env.NEXT_PUBLIC_API.concat(`/route/create-route`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer ".concat(user.token),
      },
      body: JSON.stringify(routerCreate),
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.status >= 500) {
          console.log(" create route status >= 500 ", data);
          return;
        } else if (res.status >= 400) {
          console.log(" create route status >= 400 ", data);
          handleOpenNotify("Vui lòng nhập đầy đủ thông tin!", "error");
          return;
        }

        console.log("create route => ", data.data);

        handleOpenNotify("Tạo tuyến đường thành công!", "success");
        resetForm();
        onCloseModal();
        props.reloadPage();
      })
      .catch((error) => {
        console.log(" error >>>>>>", error);
      });
  };
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

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
      {isShow && listCity ? (
        <Modal
          open={isShow}
          onClose={() => props.close()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ color: "black" }}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ mb: 3 }}
            >
              {"Tạo mới tuyến đường"}
            </Typography>
            <div className={styles.container}>
              <form
                noValidate
                autoComplete="off"
                id={styles.info}
                encType="multipart/form-data"
              >
                {/* FROM//////////////////////////////////////////////////////////////////////////////////////////
                                //////////////////////////////////////////////////////////////////////////////////////////
                                //////////////////////////////////////////////////////////////////////////////////////////
                                ////////////////////////////////////////////////////////////////////////////////////////// */}

                <div className={styles.itemFrom}>
                  <h3 style={{ margin: "15px", padding: "0", color: "red" }}>
                    Điểm đi
                  </h3>
                  <div className={styles.wrap}>
                    <p className={styles.title}>Tỉnh/TP</p>
                    <FormControl size="small" className={styles.selection}>
                      <Select
                        required={true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={cityFrom?.name}
                        MenuProps={MenuProps}
                      >
                        {listCity.map((item, index) => (
                          <MenuItem
                            sx={{ width: "220px" }}
                            key={index}
                            value={item.name}
                            onClick={() => {
                              setCityFrom(item);
                              setListWardFrom([]);
                            }}
                          >
                            <Typography noWrap>{item.name}</Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className={styles.wrap}>
                    <p className={styles.title}>Quận/Huyện</p>
                    <FormControl size="small" className={styles.selection}>
                      <Select
                        required={true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={districtFrom?.name}
                        MenuProps={MenuProps}
                      >
                        {listDistrictFrom?.map((item, index) => (
                          <MenuItem
                            sx={{ width: "220px" }}
                            key={index}
                            value={item.name}
                            onClick={() => {
                              setDistrictFrom(item);
                            }}
                          >
                            <Typography noWrap>{item.name}</Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className={styles.wrap}>
                    <p className={styles.title}>Xã/Phường</p>
                    <FormControl size="small" className={styles.selection}>
                      <Select
                        required={true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={wardFrom?.name}
                        MenuProps={MenuProps}
                      >
                        {listWardFrom?.map((item, index) => (
                          <MenuItem
                            sx={{ width: "220px" }}
                            key={index}
                            value={item.name}
                            onClick={() => {
                              setWardFrom(item);
                            }}
                          >
                            <Typography noWrap>{item.name}</Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className={styles.wrap}>
                    <p className={styles.title}>Đường</p>
                    <TextField
                      required={true}
                      className={styles.selection}
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      value={streetFrom}
                      onChange={(e) => setStreetFrom(e.target.value)}
                    />
                  </div>
                  <div className={styles.wrap}>
                    <p className={styles.title}>Số nhà</p>
                    <TextField
                      required={true}
                      className={styles.selection}
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      value={houseNumberFrom}
                      onChange={(e) => setHouseNumberFrom(e.target.value)}
                    />
                  </div>
                </div>

                {/* TO//////////////////////////////////////////////////////////////////////////////////////////
                                //////////////////////////////////////////////////////////////////////////////////////////
                                //////////////////////////////////////////////////////////////////////////////////////////
                                ////////////////////////////////////////////////////////////////////////////////////////// */}
                <div className={styles.itemTo}>
                  <h3 style={{ margin: "15px", padding: "0", color: "red" }}>
                    Điểm đến
                  </h3>
                  <div className={styles.wrap}>
                    <p className={styles.title}>Tỉnh/TP</p>
                    <FormControl size="small" className={styles.selection}>
                      <Select
                        required={true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={cityTo?.name}
                        MenuProps={MenuProps}
                      >
                        {listCity.map((item, index) => (
                          <MenuItem
                            sx={{ width: "220px" }}
                            key={index}
                            value={item.name}
                            onClick={() => {
                              setCityTo(item);
                              setListWardTo([]);
                            }}
                          >
                            <Typography noWrap>{item.name}</Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className={styles.wrap}>
                    <p className={styles.title}>Quận/Huyện</p>
                    <FormControl size="small" className={styles.selection}>
                      <Select
                        required={true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={districtTo?.name}
                        MenuProps={MenuProps}
                      >
                        {listDistrictTo?.map((item, index) => (
                          <MenuItem
                            sx={{ width: "220px" }}
                            key={index}
                            value={item.name}
                            onClick={() => {
                              setDistrictTo(item);
                            }}
                          >
                            <Typography noWrap>{item.name}</Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className={styles.wrap}>
                    <p className={styles.title}>Xã/Phường</p>
                    <FormControl size="small" className={styles.selection}>
                      <Select
                        required={true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={wardTo?.name}
                        MenuProps={MenuProps}
                      >
                        {listWardTo?.map((item, index) => (
                          <MenuItem
                            sx={{ width: "220px" }}
                            key={index}
                            value={item.name}
                            onClick={() => {
                              setWardTo(item);
                            }}
                          >
                            <Typography noWrap>{item.name}</Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className={styles.wrap}>
                    <p className={styles.title}>Đường</p>
                    <TextField
                      required={true}
                      className={styles.selection}
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      value={streetTo}
                      onChange={(e) => setStreetTo(e.target.value)}
                    />
                  </div>
                  <div className={styles.wrap}>
                    <p className={styles.title}>Số nhà</p>
                    <TextField
                      required={true}
                      className={styles.selection}
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      value={houseNumberTo}
                      onChange={(e) => setHouseNumberTo(e.target.value)}
                    />
                  </div>
                </div>
                {/*//////////////////////////////////////////////////////////////////////////////////////////
                                //////////////////////////////////////////////////////////////////////////////////////////
                                //////////////////////////////////////////////////////////////////////////////////////////
                                ////////////////////////////////////////////////////////////////////////////////////////// */}

                <div className={styles.itemAbout}>
                  <h3 style={{ margin: "15px", padding: "0", color: "red" }}>
                    Thông tin khác
                  </h3>
                  <div className={styles.wrap}>
                    <p className={styles.title}>Khoảng cách</p>
                    <TextField
                      type="number"
                      required={true}
                      className={styles.selection}
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      value={distance}
                      onChange={(e) => setDistance(Number(e.target.value))}
                    />
                  </div>
                  <div className={styles.wrap}>
                    <p className={styles.title}>Ngày</p>
                    <TextField
                      type="number"
                      required={true}
                      className={styles.selection}
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      value={day}
                      onChange={(e) => setDay(Number(e.target.value))}
                    />
                  </div>
                  <div className={styles.wrap}>
                    <p className={styles.title}>Giờ</p>
                    <TextField
                      type="number"
                      required={true}
                      className={styles.selection}
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      value={hour}
                      onChange={(e) => setHour(Number(e.target.value))}
                    />
                  </div>
                  <div className={styles.wrap}>
                    <p className={styles.title}>Phút</p>
                    <TextField
                      type="number"
                      required={true}
                      className={styles.selection}
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      value={minute}
                      onChange={(e) => setMinute(Number(e.target.value))}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className={styles.action}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<AddIcon />}
                className={styles.btnCreate}
                onClick={() => {
                  onClickSubmit();
                }}
              >
                Thêm mới
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<CloseIcon />}
                className={styles.btnCancel}
                onClick={() => {
                  onCloseModal();
                }}
              >
                Hủy bỏ
              </Button>
            </div>
          </Box>
        </Modal>
      ) : (
        <></>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        key={"top right"}
        open={openNotify}
        autoHideDuration={3000}
        onClose={handleCloseNotify}
      >
        {typeNotifi === "success" ? (
          <Alert
            color={"info"}
            onClose={handleCloseNotify}
            severity={"success"}
            sx={{ width: "100%" }}
          >
            {messageNotify}
          </Alert>
        ) : (
          <Alert
            color={"error"}
            onClose={handleCloseNotify}
            severity={"error"}
            sx={{ width: "100%" }}
          >
            {messageNotify}
          </Alert>
        )}
      </Snackbar>
    </>
  );
}
