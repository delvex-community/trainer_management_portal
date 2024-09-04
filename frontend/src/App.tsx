import { Settings } from "lucide-react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import AdminForm from "./_auth/forms/AdminForm";
import SigninForm from "./_auth/forms/SigninForm";
import RootLayout from "./_root/RootLayout";
import UserProtectedRoute from "./_root/UserProtectedRoute";
import Home from "./_root/pages/Home";
import Profile from "./_root/pages/Profile";
import AdminLayout from "./admin/AdminLayout";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import AddUserForm from "./admin/forms/AddUserForm";
import TrainerForm from "./admin/forms/TrainerForm";
import TrainingForm from "./admin/forms/TrainingForm";
import UpdateTechRating from "./admin/forms/UpdateTechRating";
import UpdateTraining from "./admin/forms/UpdateTraining";
import UpdateUser from "./admin/forms/UpdateUser";
import AdminHome from "./admin/pages/AdminHome";
import AdminTrainers from "./admin/pages/AdminTrainers";
import AdminTrainings from "./admin/pages/AdminTrainings";
import AdminUsers from "./admin/pages/AdminUsers";
import TrainerDetails from "./admin/pages/TrainerDetails";
import UpdateTrainer from "./admin/pages/UpdateTrainer";
import UpdateNonTechRating from "./admin/forms/UpdateNonTechRating";

const App = () => {
  return (
    <main>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          {/* <Route path="/sign-up" element={<SignupForm />} /> */}
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
          <Route path="/trainers/:trainerId" element={<TrainerDetails />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="trainings">
            <Route index element={<AdminTrainings />} />
            <Route path="add" element={<TrainingForm />} />
            <Route path="update/:trainingId" element={<UpdateTraining />} />
          </Route>
          <Route path="trainers">
            <Route index element={<AdminTrainers />} />
            <Route path="add" element={<TrainerForm />} />
            <Route path=":trainerId" element={<TrainerDetails />} />
            <Route
              path=":trainerId/update-profile"
              element={<UpdateTrainer />}
            />
            <Route
              path=":trainerId/update-rating/tech"
              element={<UpdateTechRating />}
            />
            <Route
              path=":trainerId/update-rating/nontech"
              element={<UpdateNonTechRating />}
            />
          </Route>
          <Route path="users">
            <Route index element={<AdminUsers />} />
            <Route path="add" element={<AddUserForm />} />
            <Route path=":userId/update-user" element={<UpdateUser />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
};

export default App;
