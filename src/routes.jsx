import AuthForm from "./components/Auth/AuthForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import About from "./pages/About/About"
import ContactUs from "./pages/ContactUs/ContactUs"

let routes = [
  { path: "/signup", element: <AuthForm /> },
  { path: "/login", element: <AuthForm /> },
  { path: "/about", element: <About /> },
  { path: "/contact-us", element: <ContactUs /> },

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
