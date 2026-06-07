import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import ToastConfig from "./components/ui/ToastConfig";

const App = () => {
  return (
    <BrowserRouter>
      {/*
        <ToastConfig> renders the <Toaster> here at root level.
        WHY HERE? Because toasts need to render above everything else
        in the app — sidebar, modals, all of it. Putting it at the
        top of the component tree guarantees that.
      */}
      <ToastConfig />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
