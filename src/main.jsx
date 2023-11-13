import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUpForm from "./components/SignUpForm.jsx";
import LogInForm from "./components/LogInForm.jsx";
import HomePage from "./pages/HomePage.jsx";
import Protecter from "./components/Protecter.jsx";
import AllPosts from "./components/AllPosts.jsx";
import AddPostForm from "./components/AddPostForm.jsx";
import ViewPost from "./components/ViewPost.jsx";
import PostsPage from "./pages/PostsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <Protecter>
            <HomePage />
          </Protecter>
        ),
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
        path: "posts/:slug",
        element: (
          <Protecter authentication>
            <ViewPost/>
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
