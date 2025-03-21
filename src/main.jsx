import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import MovieBio from "./components/MovieBio.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import Chat from "./components/Chat.jsx";
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/moviebio/:movie_id", element: <MovieBio /> },
  { path: "/chat", element: <Chat /> },
  { path: "*", element: <PageNotFound /> },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
