import { Route, Routes } from 'react-router'
import Landingpag from './components/pages/landingpage/Landingpag.tsx'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landingpag />} />
    </Routes>
  )
}

export default Router