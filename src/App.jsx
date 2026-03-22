
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './App.css'
import MainLayout from './Layout/MainLayout'
import Feed from './Pages/Feed'
import Profile from './Pages/Profile'
import PostDetails from './Pages/PostDetails'
import NotFound from './Pages/NotFound'
import AuthLayout from './Layout/AuthLayout'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import ProtectedRoute from './protectedRoutes/ProtectedRoute'
import ProtectedAuthRoute from './protectedRoutes/ProtectedAuthRoute'
import AuthContextProvider from './contexts/authContext'


// with prtptectedRoutes

  const router = createBrowserRouter([
   {
        path:'/',
        element:<MainLayout />,
        children: [
            {index:true, element: <ProtectedRoute><Feed /></ProtectedRoute> },
            {path: 'profile', element:<ProtectedRoute> <Profile /> </ProtectedRoute>},
            {path: 'post/:postId', element:<ProtectedRoute> <PostDetails /> </ProtectedRoute>},
            {path: '*', element: <NotFound />} ]
    },

    {
      path:'/',
      element:<AuthLayout />,
      children:[ 
           {path: 'signin', element: <ProtectedAuthRoute><SignIn /> </ProtectedAuthRoute>},
           {path: 'signup', element: <ProtectedAuthRoute><SignUp /></ProtectedAuthRoute>},]
    }
   
  ])


{/* 
  const router = createBrowserRouter([
   {
        path:'',
        element:<MainLayout />,
        children: [
          
            {index:true, element: <Feed /> },
            {path: 'profile', element: <Profile />},
            {path:'post/:postId', element: <PostDetails/>},
            {path: '*', element: <NotFound />} ]
    },

    {
      path:'',
      element:<AuthLayout />,
      children:[ 
           {path: 'signin', element: <SignIn /> },
           {path: 'signup', element: <SignUp />},]
    }
   
  ]) */}

function App() {
  return (
    <>
    <AuthContextProvider>
      <HeroUIProvider> 
        <ToastProvider/>
       <RouterProvider router={router} />
      </HeroUIProvider>
    </AuthContextProvider>
    </>
  )
}

export default App
