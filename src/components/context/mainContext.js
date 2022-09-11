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
    mainBackground: path.join("frame_5.jpg"),
  });
  const [backgroundsData, setBackgroundsData] = useState(["frame_1.jpg", "frame_2.png", "frame_3.png", "frame_4.png", "frame_5.jpg", "frame_6.jpg", "frame_7.png"]);
  const [background, setbackground] = useState(null)
  const [themes] = useState([themeLight]);

  function getRandom (list) {
    const random = Math.floor(Math.random() * list.length)
    return list[random];
  }
  function reloadBg() {
    let selected = getRandom(backgroundsData);
    console.log(selected);
    setbackground(selected);
  }
  useEffect(() => {
    reloadBg();
  }, [])
  // useEffect(() => {
  //   // console.log("running");
  //   ipcRenderer.invoke("getPath", (e, res) => {
  //     console.log(res);
  //   });
  //   ipcRenderer.send("getbackgroundRequest", "hola")
  // }, [])
  return (
    <MainContext.Provider value={{ theme, profile, getRandom, background, reloadBg }}>
      {children}
    </MainContext.Provider>
  );
};
