import styles from '../styles/Menu.module.scss';

export const MenuButton = () => {
    return (
        <>
            <input type="checkbox" id={styles.menu} />
            <label htmlFor="menu" className={styles.icon}>
                    <div className={styles.menu}></div>
            </label>    
            {/* <div style={{width: 20, height: 20, background: "white"}}></div> */}
        </>
    )
}