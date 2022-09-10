import React, { createContext, useContext, useState, useEffect } from "react";
export const MainContext = createContext(null);
import path from "path";
// Usar el contexto:
const { ipcRenderer } = require("electron");
export const useMainContext = () => useContext(MainContext);
const themeDark = {
  primary: "#ef233c",
  secondary: "#8d99ae",
  backgrounds: "#000",
  text: "#fff",
};

const themeLight = {
  primary: "#ef233c",
  secondary: "#0d1703",
  backgrounds: "#fff",
  text: "#031417",
};
//Declarar la zona de contexto:
export const MainProvider = ({ children }) => {
  const [theme, setTheme] = useState(themeLight);
  const [profile, setprofile] = useState({
    mainBackground: path.join("frame_7.png"),
  });
  const [themes] = useState([themeLight]);
  // useEffect(() => {
  //   // console.log("running");
  //   ipcRenderer.invoke("getPath", (e, res) => {
  //     console.log(res);
  //   });
  //   ipcRenderer.send("getbackgroundRequest", "hola")
  // }, [])
  return (
    <MainContext.Provider value={{ theme, profile }}>
      {children}
    </MainContext.Provider>
  );
};
