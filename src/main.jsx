import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUpForm from "./components/SignUpForm.jsx";
import LogInForm from "./components/LogInForm.jsx";
import Protecter from "./components/Protecter.jsx";
import AddPostForm from "./components/AddPostForm.jsx";
import ViewPost from "./components/ViewPost.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ViewProfile from "./pages/ViewProfile.jsx";
import PhotoView from "./components/PhotoView.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Protecter><PostsPage /></Protecter>,
      },
      {
        path: "signup",
        element: <SignUpForm />,
      },
      {
        path: "login",
        element: (
          <Protecter authentication={false}>
            <LogInForm />
          </Protecter>
        ),
      },
      {
        path: "all-posts",
        element: (
          <Protecter authentication>
            <PostsPage />
          </Protecter>
        ),
      },
      {
        path: "add-post",
        element: (
          <Protecter authentication>
            <AddPostForm />
          </Protecter>
        ),
      },
      {
        path: "posts/:slug/:userId",
        element: (
          <Protecter authentication>
            <ViewPost />
          </Protecter>
        ),
      },
      {
        path: "/profile",
        element: (
          <Protecter authentication>
            <ProfilePage />
          </Protecter>
        ),
      },
      {
        path: "/posts/:slug/:userId/view-profile/:username/:userid",
        element: (
          <Protecter authentication>
            <ViewProfile />
          </Protecter>
        ),
      },
      {
        path: "/:imgid",
        element: (
          <Protecter authentication>
            <PhotoView />
          </Protecter>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
