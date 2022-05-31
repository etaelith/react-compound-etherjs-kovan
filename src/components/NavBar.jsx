import { NavLink } from "react-router-dom";
import LogUser from "../routes/LogUser";
import DarkMode from './darkMode'
import compound from '../Assets/compound.png'
const style = {
  nav : `p-4 flex justify-between items-center bg-white dark:bg-gray-800`,
  headerLogo : `flex w-1/4 items-center justify-start`,
  container : `container flex flex-wrap justify-between items-center mx-auto`,
  navlink : `block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white`,
  containerNav : `flex-1 flex justify-center items-center`,
  navItemCont : `flex bg-gray-300 dark:bg-gray-900 rounded-3xl`,
  navItem : `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer dark:border-gray-600 rounded-3xl text-gray-500 dark:text-gray-400`,
  itemActive : `bg-gray-100`,
  buttonsContainer : `flex w-1/4 justify-end items-center`
}
const NavBar = () => {
    return (
        <nav className={style.nav}>
            <div className={style.headerLogo}>
              <img src={compound} alt="" />
            </div>
            <div className={style.containerNav}>
              <ul className={style.navItemCont}>
                
                  <NavLink to='/' className={style.navItem} aria-current="page">Home</NavLink>
                
                  <NavLink to='/loged' className={`${style.navItem}`}>Transactions</NavLink>
                
                
              </ul>
            </div>
            <div className={style.buttonsContainer}>
              <DarkMode/>
              <LogUser/>
            </div>
            
      
</nav>
    )
}

export default NavBar;

