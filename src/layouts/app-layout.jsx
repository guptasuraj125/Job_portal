// src/layouts/app-layout.jsx
import Header from '@/components/header';
import { Outlet } from 'react-router-dom';


const AppLayout = () => {
  return (
    <div>
      <div className='grid-background'></div>
      <main className='min-h-screen container mx-auto'>

 <Header />
        <Outlet />
      </main>
      {/* footer */}
      <div className='p-10 text-center bg-gray-800 mt-10'>Made With  💗  by GuptaSuraj</div>
    </div>
  );
};

export default AppLayout;
