import { Settings } from "lucide-react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import AdminForm from "./_auth/forms/AdminForm";
import SigninForm from "./_auth/forms/SigninForm";
import RootLayout from "./_root/RootLayout";
import UserProtectedRoute from "./_root/UserProtectedRoute";
import Home from "./_root/pages/Home";
import NonTechRating from "./_root/pages/NonTechRating";
import Profile from "./_root/pages/Profile";
import TechRating from "./_root/pages/TechRating";
import TrainerDetails from "./_root/pages/TrainerDetails";
import AdminLayout from "./admin/AdminLayout";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import AddUserForm from "./admin/forms/AddUserForm";
import TrainerForm from "./admin/forms/TrainerForm";
import TrainingForm from "./admin/forms/TrainingForm";
import UpdateNonTechRating from "./admin/forms/UpdateNonTechRating";
import UpdateTechRating from "./admin/forms/UpdateTechRating";
import UpdateTraining from "./admin/forms/UpdateTraining";
import UpdateUser from "./admin/forms/UpdateUser";
import AdminTrainerDetails from "./admin/pages/AdminTrainerDetails";
import AdminTrainers from "./admin/pages/AdminTrainers";
import AdminTrainings from "./admin/pages/AdminTrainings";
import AdminUsers from "./admin/pages/AdminUsers";
import UpdateTrainer from "./admin/pages/UpdateTrainer";
import AdminTechnologies from "./admin/pages/AdminTechnologies";

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
          <Route path="/trainers/:trainerId">
            <Route index element={<TrainerDetails />} />
            <Route path="rating/tech" element={<TechRating />} />
            <Route path="rating/nontech" element={<NonTechRating />} />
          </Route>
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
          <Route index element={<Navigate to="trainers" />} />
          {/* <Route path="home" element={<AdminHome />} /> */}
          <Route path="trainings">
            <Route index element={<AdminTrainings />} />
            <Route path="add" element={<TrainingForm />} />
            <Route path="update/:trainingId" element={<UpdateTraining />} />
          </Route>
          <Route path="trainers">
            <Route index element={<AdminTrainers />} />
            <Route path="add" element={<TrainerForm />} />
            <Route path=":trainerId" element={<AdminTrainerDetails />} />
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
          <Route path="technologies" element={<AdminTechnologies />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
