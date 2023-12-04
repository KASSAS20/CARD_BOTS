import './App.css';
import Shop from './components/Shop';
import Menu from './components/Menu';
import Cards from './components/Cards';
import Craft from './components/Craft';
import Drop from './components/Drop';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu/>,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/cards",
    element: <Cards />,
  },
  {
    path: "/craft",
    element: <Craft />,
  },
  {
    path: "/drop",
    element: <Drop />,
  },
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
