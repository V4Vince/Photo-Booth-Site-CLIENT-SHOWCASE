import React, { useState, createContext, useContext } from "react";
import { signIn } from "../api";
import { SiteContext } from "./SiteContext";

export const AuthContext = createContext();
export const LoginContext = createContext();

export const AuthProvider = (props) => {
  const INITIAL_STATE = {
    token: "",
    isSignedIn: false,
  };

  const [loadStateData] = useContext(SiteContext);

  const [auth, setAuth] = useState(INITIAL_STATE);

  const handleLogin = (creds) => {
    signIn(creds)
      .then((data) => {
        localStorage.setItem("token", data.token);
        return data;
      })
      .then((data) =>
        setAuth({
          token: data.token,
          isSignedIn: true,
        })
      )
      .then(() => loadStateData("SUCCESS", "Sign in success"))

      .catch((err) => loadStateData("ERROR", "Signing in failed"));
  };

  const handleSignOut = () => {
    localStorage
      .removeItem("token")
      .then((data) =>
        setAuth({
          ...INITIAL_STATE,
        })
      )
      .then(() => loadStateData("SUCCESS", "Signed out"))
      .catch((err) => loadStateData("ERROR", "Sign out failed"));
  };

  return (
    <AuthContext.Provider value={[auth, handleLogin, handleSignOut]}>
      {props.children}
    </AuthContext.Provider>
  );
};
