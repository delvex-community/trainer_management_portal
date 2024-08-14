import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/forms/SigninForm";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/Home";
import SignupForm from "./_auth/forms/SignupForm";
import Profile from "./_root/pages/Profile";
import { Settings } from "lucide-react";
import AdminForm from "./_auth/forms/AdminForm";
import UserProtectedRoute from "./_root/User.ProtectedRoute";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import AdminLayout from "./admin/AdminLayout";
import AdminHome from "./admin/pages/AdminHome";

const App = () => {
  return (
    <main>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/admin-auth" element={<AdminForm />} />
        </Route>

        {/* User Routes */}
        <Route
          element={
            <UserProtectedRoute>
              <RootLayout />
            </UserProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Admin Routes */}
        <Route
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminHome />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
