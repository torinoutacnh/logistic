import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from "./booking.module.scss";
import { Alert, Grid, Snackbar } from '@mui/material';
import { SeatModel } from '../../Shared/Models/SeatModel';
import { Booking_Seat } from './seat';
import { CarModel } from '../../Shared/Models/CarModel';
import { Booking_Pay } from './pay';
import { Booking_Info_Customer } from './infoCustomer';
import { CityModel } from '../../Shared/Models/CityModel';
import { DistrictModel } from '../../Shared/Models/DistrictModel';
import { InfoCustomerModel } from '../../Shared/Models/InfomationCustomer';

export default function Booking() {
    const [activeStep, setActiveStep] = useState(0);
    const [seatSelect, setSeatSelect] = useState<SeatModel[]>([]);
    const [car, setCar] = useState<CarModel>();
    const [info, setInfo] = useState<InfoCustomerModel>();
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState<CityModel>();
    const [district, setDistrict] = useState<DistrictModel>();

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    const [typeNotifi, setTypeNotifi] = useState("success")
    const [openNotify, setOpenNofity] = useState(false);
    const [messageNotify, setMessageNotify] = useState("")

    const handleOpenNotify = (message: string, type: string) => {
        setTypeNotifi(type)
        setMessageNotify(message)
        setOpenNofity(true)
    }

    const handleCloseNotify = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenNofity(false);
    };

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    const listSeat: SeatModel[] = [
        {
            id: "0e680022-b712-4e07-98ad-4650e8a2d66f",
            row: "1",
            col: "1",
            floor: 0,
            status: 0
        },
        {
            id: "7e79fba8-764a-41fe-afef-f43e2892d988",
            row: "2",
            col: "1",
            floor: 0,
            status: 1
        },
        {
            id: "84c8277a-389b-4823-93e0-3cdc71047043",
            row: "3",
            col: "1",
            floor: 0,
            status: 0
        },
        {
            id: "c98b770a-dbf0-485c-b604-3181a84a44a4",
            row: "4",
            col: "1",
            floor: 0,
            status: 0
        },
        {
            id: "7e81def1-a240-4ea4-a615-9ecf7796b0eb",
            row: "5",
            col: "1",
            floor: 0,
            status: 0
        },
        {
            id: "6162b38b-bc3e-4898-8cab-14c58ddac8b4",
            row: "1",
            col: "2",
            floor: 0,
            status: 0
        },
        {
            id: "f58a937b-098a-483e-b68a-bdfd351f0cb7",
            row: "2",
            col: "2",
            floor: 0,
            status: 0
        },
        {
            id: "90c8fc54-b4b2-4364-953c-42896f86c9fc",
            row: "3",
            col: "2",
            floor: 0,
            status: 0
        },
        {
            id: "1e2e9e40-ec0b-4817-a369-4d8423cd8453",
            row: "4",
            col: "2",
            floor: 0,
            status: 0
        },
        {
            id: "bbce6b81-26b7-466f-b8c8-f07b04bd15da",
            row: "5",
            col: "2",
            floor: 0,
            status: 0
        }
    ]

    const onClickAddSeatSelect = (data: SeatModel) => {
        setSeatSelect([...seatSelect, data])
    }

    const onClickRemoveSeatSelect = (data: SeatModel) => {
        setSeatSelect(seatSelect?.filter(i => i.id !== data.id))
    }

    const onChangeName = (name: string) => {
        setName(name)
    }

    const onChangeTel = (tel: string) => {
        setTel(tel)
    }

    const onChangeEmail = (email: string) => {
        setEmail(email)
    }

    const onChangeCity = (city: CityModel) => {
        setCity(city)
    }

    const onChangeDistrict = (district: DistrictModel) => {
        setDistrict(district)
    }

    const infoCustomer = {
        name: name,
        tel: '0' + tel?.slice(3),
        email: email,
        city: city,
        district: district
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API.concat("/car/").concat("c21af245-d1e2-4801-8bfe-24502681b880"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer ".concat(user.token),
            },
            // body: JSON.stringify(form.getFieldsValue()),
        })
            .then(async (res) => {

                const data = await res.json()

                if (res.status >= 500) {
                    console.log("get car status >= 500 ", data);
                    return
                }
                else if (res.status >= 400) {
                    console.log("get car status >= 400 ", data);
                    return
                }

                // console.log("get car info=> ", data.data);

                const tmp: CarModel = data.data
                tmp.seats.sort((a, b) => Number(a.row) - Number(b.row)).sort((a, b) => Number(a.col) - Number(b.col)).sort((a, b) => a.floor - b.floor)
                setCar(tmp)

            })
            .catch((error) => {
                console.log(" error >>>>>>", error);
            })

    }, [])
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    const checkEmpty = (s : string) => {
        if ((s.trim().length === 0 ) || (s.trim().length === 3)) {
            return true
        } 
        else {
            return false
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    const steps = ['Chọn ghế', 'Thông tin khách hàng', 'Thanh toán'];
    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const handleNext = () => {

        if (activeStep === 0) {
            if (seatSelect?.length === 0) {
                handleOpenNotify("Vui lòng chọn ghế", "error")
                return
            }
        }

        else if (activeStep === 1) {
            if (checkEmpty(name) || checkEmpty(tel) || checkEmpty(email) || !city || !district ) {
                handleOpenNotify('Vui lòng điền đầy đủ thông tin', 'error')
                return
            }
            
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const handleReset = () => {
        setActiveStep(0);
        setSeatSelect([])
    };

    return (
        <>
            {
                car &&
                <>
                    <Grid container className={styles.container}>
                        <Grid item xs={11.8} sm={11.5} md={10} lg={8}>
                            <Box>
                                <Stepper activeStep={activeStep}>
                                    {steps.map((label, index) => {
                                        const stepProps: { completed?: boolean } = {};
                                        const labelProps: {
                                            optional?: React.ReactNode;
                                        } = {};
                                        // if (isStepOptional(index)) {
                                        //     labelProps.optional = (
                                        //         <Typography variant="caption">Optional</Typography>
                                        //     );
                                        // }
                                        // if (isStepSkipped(index)) {
                                        //     stepProps.completed = false;
                                        // }
                                        return (
                                            <Step key={label} {...stepProps}>
                                                <StepLabel {...labelProps}>{label}</StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                                {activeStep === steps.length ? (
                                    <React.Fragment>
                                        <Typography sx={{ mt: 2, mb: 1 }}>
                                            <h1>finish</h1>
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            <Button onClick={handleReset}>Đặt mới</Button>
                                        </Box>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <Typography sx={{ mt: 2, mb: 1 }}>

                                            {activeStep === 0
                                                ?
                                                <Booking_Seat
                                                    car={car}
                                                    add={onClickAddSeatSelect}
                                                    remove={onClickRemoveSeatSelect}
                                                    seatDefault={seatSelect} />
                                                : <></>
                                            }
                                            {activeStep === 1 
                                                ? 
                                                <Booking_Info_Customer 
                                                    onChangeName={onChangeName}
                                                    onChangeTel={onChangeTel}
                                                    onChangeEmail={onChangeEmail}
                                                    onChangeCity={onChangeCity}
                                                    onChangeDistrict={onChangeDistrict}
                                                    infoCustomer={infoCustomer}
                                                /> : <></>}
                                            {activeStep === 2 
                                                ? 
                                                <Booking_Pay 
                                                    infoCustomer={infoCustomer}
                                                    seat={seatSelect}
                                                /> : <></>}

                                        </Typography >
                                        <Box sx={{ display: 'flex', pt: 2, justifyContent: "center" }}>

                                            <Button
                                                color="inherit"
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                sx={{ mr: 1 }}
                                            >
                                                Quay lại
                                            </Button>

                                            <Button onClick={handleNext}>
                                                {activeStep === steps.length - 1 ? 'Hoàn tất' : 'Tiếp tục'}
                                            </Button>
                                        </Box>
                                    </React.Fragment >
                                )
                                }
                            </Box >
                        </Grid >
                    </Grid >
                    <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        key={"top right"}
                        open={openNotify}
                        autoHideDuration={3000}
                        onClose={handleCloseNotify}
                    >
                        {
                            typeNotifi === "success"
                                ?
                                <Alert
                                    color={"info"}
                                    onClose={handleCloseNotify}
                                    severity={"success"}
                                    sx={{ width: '100%' }}
                                >
                                    {messageNotify}
                                </Alert>
                                :
                                <Alert
                                    color={"error"}
                                    onClose={handleCloseNotify}
                                    severity={"error"}
                                    sx={{ width: '100%' }}
                                >
                                    {messageNotify}
                                </Alert>
                        }
                    </Snackbar>
                </>
            }
        </>

    );
}
