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
import SwapCard from './components/SwapCard';
function App() {
  useDarkMode()
  return (
    <div className="App">
      <UserProvider>
        <NavBar/>
        <Routes>
          <Route path='/'
            index
            element ={<SwapCard/>}>
          </Route>
          <Route path='/loged' element={<WalletProvider><ReadERC20/></WalletProvider>}></Route>
          <Route path='/history' element={
            <VerifyUser>
              <PrintHistory></PrintHistory>
            </VerifyUser>
          }></Route>
          <Route path='*' element={<NoRes/>}></Route>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
