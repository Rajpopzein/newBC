import { Route, Routes } from 'react-router';
import { lazy, Suspense } from 'react';
import Login from './components/pages/authPages/login.tsx';
import Signup from './components/pages/authPages/Signup.tsx';

const LandingPage = lazy(() => import('./components/pages/landingpage/Landingpag.tsx'));
const GalleryPage = lazy(() => import('./components/pages/galleryPage/GalleryPage.tsx'));

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <LandingPage />
          </Suspense>
        }
      />
      <Route path='/gallery' element={
        <Suspense fallback={<div>Loading...</div>}>
          <GalleryPage />
        </Suspense>
      }/>
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  );
};

export default Router;
