import { Grid } from '@mui/material'
import styles from './footer.module.scss'
import Image from 'next/image'
import image1 from '../../styles/img/image1.jpg'
import image2 from '../../styles/img/image2.png'
import image3 from '../../styles/img/image3.png'
import image4 from '../../styles/img/image4.png'
import image5 from '../../styles/img/image5.png'
import image6 from '../../styles/img/image6.png'

export const Footer = () => {
    return (
        <>
            <div className={styles.wrap}>
                <Grid container className={styles.footer_row}>


                    <Grid className={styles.footer_col} item xs={5} sm={5} md={5} xl={2.5}>
                        <div>
                            <h3 className={styles.footer_title_list}>Tuyến đường</h3>
                            <ul className={styles.footer_list}>
                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Xe đi Buôn Mê Thuột từ Sài Gòn
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Xe đi Vũng Tàu từ Sài Gòn
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Xe đi Nha Trang từ Sài Gòn
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Xe đi Đà Lạt từ Sài Gòn
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Xe đi Sapa từ Hà Nội
                                    </a>
                                </li>
                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Xe đi Hải Phòng từ Hà Nội
                                    </a>
                                </li>
                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Xe đi Vinh từ Hà Nội
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Grid>

                    <Grid className={styles.footer_col} item xs={5} sm={5} md={5} xl={2.5}>
                        <div>
                            <h3 className={styles.footer_title_list}>Xe Limousine</h3>
                            <ul className={styles.footer_list}>
                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Limousine đi Đà Lạt từ Sài Gòn
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Limousine đi Vũng Tàu từ Sài Gòn
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Limousine đi Nha Trang từ Sài Gòn
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Limousine đi Hải Phòng từ Hà Nội
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Limousine đi Hạ Long từ Hà Nội
                                    </a>
                                </li>
                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Limousine đi Sapa Từ Hà Nội
                                    </a>
                                </li>
                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Limousine đi Quảng Ninh từ Hà Nội
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Grid>

                    <Grid className={styles.footer_col} item xs={5} sm={5} md={5} xl={2.5}>
                        <div>
                            <h3 className={styles.footer_title_list}>Bến xe</h3>
                            <ul className={styles.footer_list}>
                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Bến xe Miền Đông
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Bến xe Trung tâm Đà Nẵng
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Bến xe Gia Lâm
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Bến xe Mỹ Đình
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Bến xe An Sương
                                    </a>
                                </li>
                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Bến xe Nước Ngầm
                                    </a>
                                </li>
                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Bến xe Miền Tây
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Grid>

                    <Grid className={styles.footer_col} item xs={5} sm={5} md={5} xl={2.5}>
                        <div>
                            <h3 className={styles.footer_title_list}>Nhà xe</h3>
                            <ul className={styles.footer_list}>
                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Xe Sao Việt
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Xe Hải Âu
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Xe Văn Minh
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Xe Taxi Hoa Mai
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Xe Queen Cafe
                                    </a>
                                </li>
                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Xe Quang Nghị
                                    </a>
                                </li>
                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Xe Hạ Long Travel
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Grid>
                </Grid>
                <div className={styles.line} />
                <Grid container className={styles.footer_row}>

                    <Grid className={styles.footer_col} item xs={5} sm={5} md={5} xl={2.5}>
                        <div>
                            <h3 className={styles.footer_title_list}>Về chúng tôi</h3>
                            <ul className={styles.footer_list}>
                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Phần mềm đại lí
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Giới Thiệu VeXeRe.com
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Tuyển dụng
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Tin tức
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Liên hệ
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Grid>


                    <Grid className={styles.footer_col} item xs={5} sm={5} md={5} xl={2.5}>
                        <div>
                            <h3 className={styles.footer_title_list}>Hỗ trợ</h3>
                            <ul className={styles.footer_list}>
                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Hướng dẫn thanh toán
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Quy chế nhà xe
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>

                                        Chính sách bảo mật thông tin

                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Chính sách bảo mật thanh toán

                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Chính sách và quy trình giải quyết tranh chấp, khiếu nại

                                    </a>
                                </li>
                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Câu hỏi thường gặp

                                    </a>
                                </li>
                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        Tra cứu đơn hàng
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Grid>

                    <Grid className={styles.footer_col} item xs={5} sm={5} md={5} xl={2.5}>
                        <div>
                            <h3 className={styles.footer_title_list}>Chứng nhận</h3>
                            <ul className={styles.footer_list}>
                                <li className={`${styles.footer_list_item}`}>
                                    <Image src={image1} alt={"photo"} width={"130px"} height={"50px"} />
                                </li>

                                <li className={`${styles.footer_list_item}`}>
                                    <Image src={image2} alt={"photo"} width={"130px"} height={"50px"} />
                                </li>

                                <li className={`${styles.footer_list_item}`}>
                                    <Image src={image3} alt={"photo"} width={"130px"} height={"50px"} />
                                </li>

                                <li className={`${styles.footer_list_item}`}>
                                    <Image src={image4} alt={"photo"} width={"130px"} height={"50px"} />
                                </li>
                            </ul>
                        </div>
                    </Grid>

                    <Grid className={styles.footer_col} item xs={5} sm={5} md={5} xl={2.5}>
                        <div>
                            <h3 className={styles.footer_title_list}>Tải ứng dụng nhà xe</h3>
                            <ul className={styles.footer_list}>
                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        <Image src={image5} alt={"photo"} width={"170px"} height={"70px"} />
                                    </a>
                                </li>

                                <li className={styles.footer_list_item}>
                                    <a href="" className={styles.item_link}>
                                        <Image src={image6} alt={"photo"} width={"170px"} height={"70px"} />
                                    </a>
                                </li>


                            </ul>
                        </div>
                    </Grid>

                </Grid>
                <div className={styles.line2} />
                <div className={styles.footer_box}>
                    <h3 className={styles.box_name}>
                        Công ty TNHH Thương Mại Dịch Vụ ABC
                    </h3>
                    <span className={styles.box_text}>
                        Địa chỉ đăng ký kinh doanh: 8C Chữ Đồng Tử, Phường 7, Quận Tân Bình, Thành Phố Hồ Chí Minh, Việt Nam
                    </span>
                    <span className={styles.box_text}>
                        Địa chỉ: 182 Cộng Hoà, , Tân Bình, TP.Hồ Chí Minh, Việt Nam
                    </span>
                    <span className={styles.box_text}>
                        Giấy chứng nhận ĐKKD số 0315133726 do Sở KH và ĐT TP.Hồ Chí Minh cấp lần đầu ngày 27 / 6 / 2018
                    </span>
                    <span className={styles.box_text}>
                        Bản quyền © 2020 thuộc về 5 ae siêu nhân
                    </span>
                </div>
            </div>
        </>
    )
}




