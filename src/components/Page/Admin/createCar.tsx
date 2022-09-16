import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, FormControl, Select, MenuItem, FormControlLabel, Radio, RadioGroup, SelectChangeEvent } from '@mui/material';
import styles from './createCar.module.scss';
import UploadIcon from '@mui/icons-material/Upload';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
//   width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  textAlign: 'center',
};

export function CreateCar(props:{stateProps: boolean, close:any}) {
    const [isShow, setIsShow] = useState(false)

    useEffect(()=>{
    setIsShow(props.stateProps)
    }, [props.stateProps])

    const dataCar = [
        "Phương Trang",
        "Hùng Cường",
        "Hoa Mai",
        "Hồng Hoa",
        "Vương Lệnh",
    ]

    const [type, setType] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };

  return (
    <>
        {isShow ? 
            <Modal
                open={isShow}
                onClose={()=>props.close()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Tạo mới xe
                    </Typography>
                    <div className={styles.container}>
                        <div className={styles.img}>
                            <div className={styles.image}>ảnh</div>
                            <Button 
                                variant="contained" 
                                component="label"
                                startIcon={<UploadIcon/>}
                                className={styles.btnUpload}
                                size="small"
                            >
                                Tải ảnh lên
                                <input hidden accept="image/*" multiple type="file" />
                            </Button>
                        </div>

                        <form noValidate autoComplete="off" id={styles.info}>
                            <div className={styles.wrap}>
                                <p>Dịch vụ</p>
                                <FormControl 
                                    size="small"
                                    className={styles.selection}
                                >
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={handleChange}
                                        // MenuProps={MenuProps}
                                        // value={type}
                                        // onChange={handleChange}
                                        defaultValue={"Chở người"}
                                    >
                                         <MenuItem
                                            key={0}
                                            value={"Chở người"}
                                        >
                                            Chở người
                                        </MenuItem>
                                        <MenuItem
                                            key={1}
                                            value={"Chở hàng"}
                                        >
                                            Chở hàng
                                        </MenuItem>
                                        
                                    </Select>
                                </FormControl>
                            </div>

                            <div className={styles.wrap}>
                                <p>Tên nhà xe</p>
                                <FormControl 
                                    size="small"
                                    className={styles.selection}
                                >
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // MenuProps={MenuProps}
                                        // value={area}
                                        // onChange={handleChange}
                                    >

                                        {
                                            dataCar.map((item, index) => (
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
                            </div>

                            <div className={styles.wrap}>
                                <p>Hãng xe</p>
                                <TextField
                                    className={styles.booking_input}
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    // value={to}
                                    // onChange={(e) => setTo(e.target.value)}
                                />
                            </div>

                            <div className={styles.wrap}>
                                <p>Màu xe</p>
                                <TextField
                                    className={styles.booking_input}
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    // value={to}
                                    // onChange={(e) => setTo(e.target.value)}
                                />
                            </div>

                            <div className={styles.wrap}>
                                <p>BKS</p>
                                <TextField
                                    className={styles.booking_input}
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    // value={to}
                                    // onChange={(e) => setTo(e.target.value)}
                                />
                            </div>
                            <div className={styles.wrap}>
                                <p>SĐT</p>
                                <TextField
                                    className={styles.booking_input}
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    // value={to}
                                    // onChange={(e) => setTo(e.target.value)}
                                />
                            </div>

                            <div className={styles.wrap}>
                                <p>Giá vé</p>
                                <TextField
                                    className={styles.booking_input}
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    // value={to}
                                    // onChange={(e) => setTo(e.target.value)}
                                />
                            </div>
                        </form>
            
                    </div>
                    <div className={styles.action}>
                    <Button variant="outlined" startIcon={<AddIcon />}>
                        Thêm mới
                    </Button>
                    <Button variant="outlined" startIcon={<BorderColorIcon />}>
                        Cập nhật
                    </Button>
                    <Button variant="outlined" startIcon={<CloseIcon />}>
                        Hủy bỏ
                    </Button>
                    </div>
                </Box>
            </Modal>
        :
            <></>

        }
    </>
  );
}