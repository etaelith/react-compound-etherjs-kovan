import {Route, Routes} from 'react-router-dom'
import UserProvider from './context/UserProvider';
import NavBar from './components/NavBar'
import useDarkMode from './hooks/useDarkMode';
import NoRes from './components/NoRes'

/* import Home from './components/Home'; */
import ReadERC20 from './components/ReadERC20';
import WalletProvider from './context/WalletProvider';
import VerifyUser from './routes/VerifyUser'
import ContractProvider from './context/ContractProvider';
import SwapCard from './components/SwapCard';
import UseFetch from './hooks/UseFetch';

const style = {
  main: `h-screen w-full flex flex-col`
}
function App() {
  useDarkMode()
  return (
    <div className={style.main}>
      <UserProvider>
      <WalletProvider>
        <NavBar/>
        <Routes>
          <Route path='/'
            index
            element ={<ContractProvider><VerifyUser><SwapCard/></VerifyUser></ContractProvider>}>
          </Route>
          <Route path='/loged' element={<><ReadERC20/><UseFetch></UseFetch></>}></Route>
          <Route path='*' element={<NoRes/>}></Route>
        </Routes>
      </WalletProvider>
      </UserProvider>
    </div>
  );
}

export default App;
