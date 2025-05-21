// import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// import { RouterProvider } from 'react-router-dom';
// import { router } from './router.tsx'
// import { AuthContextProvider } from './context/AuthContext.tsx';

// createRoot(document.getElementById("root")!).render(

//     <>

//     {/* <App /> */}

//     <AuthContextProvider>
//         <RouterProvider router={router}/>
//     </AuthContextProvider>
    
    
//     </>
// );

// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { router } from './router';
import { initLIFF } from './utils/liff'; // Import your LIFF initializer
import './index.css';

const rootElement = document.getElementById('root')!;

initLIFF().then(() => {
  createRoot(rootElement).render(
    <React.StrictMode>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </React.StrictMode>
  );
}).catch((error) => {
  // You can also render an error screen here if LIFF fails
  console.error('App failed to start due to LIFF error:', error);
});