import React from "react";
import { Login } from "./src/screens/Login";
import { AuthContext } from "./src/contexts/AuthContext";

export default function App() {
  const auth = React.useMemo(() => ({
    login: (index_number) => {
      console.log("login", index_number);

      //after here navigate to the main page ...
    },
  }));

  return (
    <AuthContext.Provider value={auth}>
      <Login />
    </AuthContext.Provider>
  );
}
