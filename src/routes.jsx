import AuthForm from "./components/Auth/AuthForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import About from "./pages/About/About";
import ContactUs from "./pages/ContactUs/ContactUs";
import Home from "./pages/Home/Home";
import PublicProfile from "./pages/PublicProfile/PublicProfile";
import SignUpSetting from "./pages/Dashboard/SignUpSetting";
import EditProfile from "./pages/Dashboard/EditProfile";
let routes = [
  { path: "/signup", element: <AuthForm /> },
  { path: "/login", element: <AuthForm /> },
  { path: "/about", element: <About /> },
  { path: "/", element: <Home /> },
  { path: "/contact-us", element: <ContactUs /> },
  { path: "/users/:username", element: <PublicProfile /> },
  { path: "/setting", element: <SignUpSetting /> },
  { path: "/editProile", element: <EditProfile /> },

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
