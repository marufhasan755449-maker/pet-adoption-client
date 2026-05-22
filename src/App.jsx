import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./providers/AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AllPets from "./pages/AllPets";
import PetDetails from "./pages/PetDetails";
import AddPet from "./pages/AddPet";
import MyListings from "./pages/MyListings";
import EditPet from "./pages/EditPet";
import MyRequests from "./pages/MyRequests";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="all-pets" element={<AllPets />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Private Routes */}
            <Route
              path="pets/:id"
              element={
                <PrivateRoute>
                  <PetDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="add-pet"
              element={
                <PrivateRoute>
                  <AddPet />
                </PrivateRoute>
              }
            />
            <Route
              path="my-listings"
              element={
                <PrivateRoute>
                  <MyListings />
                </PrivateRoute>
              }
            />
            <Route
              path="edit-pet/:id"
              element={
                <PrivateRoute>
                  <EditPet />
                </PrivateRoute>
              }
            />
            <Route
              path="my-requests"
              element={
                <PrivateRoute>
                  <MyRequests />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
