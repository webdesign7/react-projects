import { createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./Pages/Home";
import Products from "./Pages/Products";
import RootLayout from "./Root";
import ErrorPage from "./Pages/Error";
import ProductDetail from "./Pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    children: [
      { index:true, element: <HomePage />},
      { path: '/products', element: <Products />},
      { path: '/products/:productId', element: <ProductDetail />},
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
