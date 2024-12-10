import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./mainPage.jsx";
import BlogPostView from "./blogpostView.jsx";
import Addblog from "./addBlog.jsx";
import Updateblog from "./updateBlog.jsx";
import Login from "./auth/login.jsx";
import {KindeProvider} from "@kinde-oss/kinde-auth-react";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/Post/:id",
    element: <BlogPostView />,
  },
  {
    path: "/Addblog",
    element: <Addblog />,
  },
  {
    path: "Post/:id/edit",
    element: <Updateblog />,
  },
  {
    path: "Login",
    element: <Login />,
  },
  { future: { v7_startTransition: true } }

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <KindeProvider
    clientId="5a7f4f5ec7d74dee9195c062eb2ffe31"
    domain="https://test11111111111.kinde.com"
    logoutUri={window.location.origin}
    redirectUri={window.location.origin}
  >
    <RouterProvider router={router} />
    </KindeProvider>
  </StrictMode>
);