import { useRoutes } from "react-router-dom";
import { pathDefault } from "./common/path";
import SignIn from "./pages/SignIn/SignIn";
import HomePage from "./pages/HomePage/HomePage";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { createContext, Suspense } from "react";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import SearchJobs from "./pages/SearchJobs/SearchJobs";
import SignInAdmin from "./pages/SignInAdmin/SignInAdmin";
import Product from "./pages/Product/Product";
import SignUp from "./pages/SignUp/SignUp";

export const NotificationContext = createContext();

const HomeTemplate = React.lazy(() => {
  return import("./templates/HomeTemplate/HomeTemplate");
});
const ManagerJob = React.lazy(() => {
  return import("./pages/ManagerJob/ManagerJob");
});
const ManagerUser = React.lazy(() => {
  return import("./pages/ManagerUser/ManagerUser");
});
const ManagerComment = React.lazy(() =>
  import("./pages/ManagerComment/ManagerComment")
);

const arrRoutes = [
  {
    path: pathDefault.homePage,
    element: (
      <Suspense fallback={<div></div>}>
        <HomeTemplate />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/search-jobs",
        element: <SearchJobs />,
      },
      {
        path: "/product",
        element: <Product />,
      },
    ],
  },
  {
    path: pathDefault.signIn,
    element: <SignIn />,
  },
  {
    path: pathDefault.signInAdmin,
    element: <SignInAdmin />,
  },
  {
    path: pathDefault.signUp,
    element: <SignUp />,
  },
  {
    path: pathDefault.admin,
    element: <AdminTemplate />,
    children: [
      {
        index: true,
        element: (
          //trong fallback de mot component loading
          <Suspense fallback={<></>}>
            <ManagerUser />
          </Suspense>
        ),
      },
      {
        path: "manager-user",
        element: (
          <Suspense fallback={<></>}>
            <ManagerUser />
          </Suspense>
        ),
      },
      {
        path: "manager-job",
        element: (
          <Suspense fallback={<></>}>
            <ManagerJob />
          </Suspense>
        ),
      },
      {
        path: "manager-comment",
        element: (
          <Suspense fallback={<></>}>
            <ManagerComment />
          </Suspense>
        ),
      },
    ],
  },
];

function App() {
  const routes = useRoutes(arrRoutes);
  const handleNotification = (type, content, timeClose = 3000) => {
    toast[type](content, {
      position: "top-right",
      autoClose: timeClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <>
      <NotificationContext.Provider value={{ handleNotification }}>
        {routes}
        <ToastContainer />
      </NotificationContext.Provider>
    </>
  );
}

export default App;
