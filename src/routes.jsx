import AuthForm from "./components/Auth/AuthForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";

let routes = [
  { path: "/signup", element: <AuthForm /> },
  { path: "/login", element: <AuthForm /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
];

export default routes;
