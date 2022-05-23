import {Route, Routes} from 'react-router-dom'
import UserProvider from './context/UserProvider';
import NavBar from './components/NavBar'
import VerifyUser from './routes/VerifyUser';
import useDarkMode from './hooks/useDarkMode';
import NoRes from './components/NoRes'

import Home from './components/Home';
import Loged from './utils/Loged'
import PrintHistory from './components/PrintHistory'
function App() {
  useDarkMode()
  return (
    <div className="App">
      <UserProvider>
      <NavBar/>
      <Routes>
        <Route path='/'
          index
          element ={<Home/>}>
        </Route>
        <Route path='/loged' element={<Loged/>}></Route>
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