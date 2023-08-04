import React, { useContext } from "react";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </BrowserRouter>
  );
}

function Routing() {
  const { accessToken } = useContext(AuthContext);

  const routing = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage />, index: true },
        {
          path: "signup",
          element: accessToken ? (
            <Navigate replace to="/todo" />
          ) : (
            <SignupPage />
          ),
        },
        {
          path: "signin",
          element: accessToken ? (
            <Navigate replace to="/todo" />
          ) : (
            <SigninPage />
          ),
        },
        {
          path: "todo",
          element: accessToken ? (
            <TodoPage />
          ) : (
            <Navigate replace to="/signin" />
          ),
        },
      ],
    },
  ]);

  return routing;
}

export default App;
