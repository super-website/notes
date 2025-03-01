import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'

//actions
import { action as loginAction } from './pages/Login'
import { store } from './store'
import Landing from './pages/Landing'
import HomeLayout from './pages/HomeLayout'
import AddNew from './pages/AddNew'
import AllTopics from './pages/AllTopics'
import Error from './pages/Error'
import EditTopic from './pages/EditTopic'
import AddGalleryImages from './pages/AddGalleryImages'

const router = createBrowserRouter([
  {
    path: '/cms',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'allTopics',
        element: <AllTopics />,
      },
      {
        path: 'addnew',
        element: <AddNew />,
      },
      {
        path: 'addgallery',
        element: <AddGalleryImages />,
      },
      {
        path: 'edit-topic/:id',
        element: <EditTopic />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <h2>There was an error</h2>,
    action: loginAction(store),
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
