import { Route, Routes } from 'react-router';
import { lazy, Suspense } from 'react';
import Login from './components/pages/authPages/login.tsx';
import Signup from './components/pages/authPages/Signup.tsx';

const LandingPage = lazy(() => import('./components/pages/landingpage/Landingpag.tsx'));
const GalleryPage = lazy(() => import('./components/pages/galleryPage/GalleryPage.tsx'));
const Faq = lazy(() => import('./components/pages/faqPage/FaqPage.tsx'));
const CreateRole = lazy(() => import('./components/pages/stratagyPage/CreateRulePage.tsx'));
const UserManagement = lazy(() => import('./components/pages/admin/UserManagement.tsx'));

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
      <Route path='/admin/users' element={
        <Suspense fallback={<div>Loading...</div>}>
          <UserManagement />
        </Suspense>
      }/>
      <Route path='/gallery' element={
        <Suspense fallback={<div>Loading...</div>}>
          <GalleryPage />
        </Suspense>
      }/>
      <Route path='/faq' element={
        <Suspense fallback={<div>Loading...</div>}>
          <Faq />
        </Suspense>
      }/>
      <Route path='/chart' element={
        <Suspense fallback={<div>Loading...</div>}>
          <CreateRole />
        </Suspense>
      }/>
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  );
};

export default Router;
