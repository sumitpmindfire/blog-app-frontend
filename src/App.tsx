import React from "react";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "contexts/AuthContext";
import AppRoutes from "Routes";

function App() {
  return (
    <AuthContextProvider>
      <>
        <AppRoutes />
        <Toaster position="top-center" />
      </>
    </AuthContextProvider>
  );
}

export default App;
