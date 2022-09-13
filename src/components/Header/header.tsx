import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import styles from '../../styles/Home.module.scss';
// import '../styles/Menu.module.scss';

export const Header = () => {

    const data: { name?: string, link?: string }[] = [
        { name: "TRANG CHỦ", link: "#" },
        { name: "LỊCH TRÌNH", link: "#" },
        { name: "LIÊN HỆ", link: "#" },
        { name: "VỀ CHÚNG TÔI", link: "#" }
    ]

    const [activeMenuRes, setActiveMenuRes] = useState(false)

    const onClickMenu = () => {
        const hambuger = document.querySelector(`.${styles.header_list_item}`)
        if (activeMenuRes) {
            hambuger.classList.remove(`${styles.active_list_item}`)
        }
        else {
            hambuger.classList.add(`${styles.active_list_item}`)
        }
        setActiveMenuRes(!activeMenuRes)
    }
    return (
        <>
            <div>
                <div className={styles.header}>
                    <MenuIcon className={styles.header_icon_left} />
                    <a className={styles.header_item_logo} href="#">logo</a>
                    <ul className={`${styles.header_list_item}`}>

                        {
                            data.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <a className={styles.header_item} href={`${item.link}`}>{item.name}</a>
                                    </li>
                                )
                            })
                        }

                    </ul>
                    <a className={styles.login_reg} href="#" >
                        Đăng nhập/ Đăng ký
                        <KeyboardArrowDownIcon />
                    </a>
                    <div className={styles.header_icon_right} onClick={() => { onClickMenu() }}>
                        <MenuIcon className={styles.right_icon} />
                        {/* <div className={ onClickMenu ? hamburger : activeHamburger}></div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

