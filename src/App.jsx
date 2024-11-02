import { useRoutes } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import { pathDefault } from "./common/path";
import SignIn from "./pages/SignIn/SignIn";
import HomePage from "./pages/HomePage/HomePage";

const arrRoutes = [
  {
    path: pathDefault.homePage,
    element: <HomeTemplate />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
  {
    path: pathDefault.signIn,
    element: <SignIn />,
  },
];

function App() {
  const routes = useRoutes(arrRoutes);
  return routes;
}

export default App;
