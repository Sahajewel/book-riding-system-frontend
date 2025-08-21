import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './routes'
import { Provider as ReduxProvider } from "react-redux";
import { store } from './redux/store';
import { ThemeProvider } from './provider/Theme.Provider';
import "./index.css";
import { Toaster } from 'sonner';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <ReduxProvider store={store}>
    <ThemeProvider defaultTheme="system" >
       <RouterProvider router={router}></RouterProvider>
        <Toaster richColors/>
    </ThemeProvider>
   </ReduxProvider>
  </StrictMode>,
)
