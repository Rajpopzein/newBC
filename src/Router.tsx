import { Route, Routes } from 'react-router'
import Landingpag from './components/pages/landingpage/Landingpag.tsx'
import Login from './components/pages/landingpage/authPages/login.tsx'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landingpag />} />
      <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default Router