import {Route, Routes} from 'react-router-dom'
import UserProvider from './context/UserProvider';
import NavBar from './components/NavBar'
import VerifyUser from './routes/VerifyUser';
import useDarkMode from './hooks/useDarkMode';
import NoRes from './components/NoRes'

/* import Home from './components/Home'; */
import ReadERC20 from './components/ReadERC20';
import PrintHistory from './components/PrintHistory'
import WalletProvider from './context/WalletProvider';
import TestCard from './test/TestCard';
import ContractProvider from './test/ContractProvider';
const style = {
  main: `h-screen w-screen flex flex-col`
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
            element ={<ContractProvider><TestCard/></ContractProvider>}>
          </Route>
          <Route path='/loged' element={<><ReadERC20/><ReadERC20/></>}></Route>
          <Route path='/history' element={
            <VerifyUser>
              <PrintHistory></PrintHistory>
            </VerifyUser>
          }></Route>
          <Route path='*' element={<NoRes/>}></Route>
        </Routes>
      </WalletProvider>
      </UserProvider>
    </div>
  );
}

export default App;
