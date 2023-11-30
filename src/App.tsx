import React from "react";
import AuthContextProvider from "contexts/AuthContext";
import AppRoutes from "Routes";

function App() {
  return (
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
  );
}

export default App;
