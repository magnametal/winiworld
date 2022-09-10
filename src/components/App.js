import React, { useEffect, useState } from 'react'
import '../assets/css/App.css'
const { ipcRenderer } = require("electron");
import { Routes, Route, HashRouter, Link } from 'react-router-dom';
import { MainProvider, useMainContext } from "./context/mainContext";
import useImage from './hooks/useImage'
import { ColorExtractor } from 'react-color-extractor'
import Grid from '@mui/material/Grid';
import MusicPlayer from './MusicPlayer';
import { motion } from "framer-motion";
const styles = {
  main:{
    margin: 0,
    padding: 0
  },
  root: (props) => ({
    minHeight: "100vh",
    backgroundImage: "url("+props.background+")",
    backgroundPosition: "center",
    margin: 0,
    padding: 0,
    backgroundSize: 'cover',
    overflow: 'hidden',
    backgroundRepeat  : 'no-repeat'
  }),
  background:{
    position: "fixed",
    width: "100vw",
    height: "100vh",
    padding: 0,
    // transform: "translateX(-1) scale(1)"
  },
  centerTitle:{
    height: 300,
    fontSize: 27,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
  }
}

function Home() {
  const contexto = useMainContext();
  const { theme, profile } = contexto;
  const { loading, error, image } = useImage(profile.mainBackground)
  const [colors, setcolors] = useState([])

  useEffect(() => {
    // ipcRenderer.send("loadFileDialog", "message");
    return () => {
      console.log("closed");
    }
  }, [])
  function getColors(colorsVector){
    setcolors(colorsVector)
  }
  return (
    <>
     <div style={styles.root({ background : image })}>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <ul>
              <li>
                <a href="#" style={{ color: colors[1], background: colors[2] }}>
                  <p>La ciencia de la paz</p>
                </a>
              </li>
            </ul>
          </Grid>
          <Grid item md={8} xs={12}>
            <ColorExtractor getColors={getColors}>
              <img
                src={image}
                style={{ width: 5, height: 5, visibility: "none", opacity: 0 }}
              />
            </ColorExtractor>
            <MusicPlayer music="1.mp3" color={colors[1]} contrast={colors[2]} />
          </Grid>
          <Grid item xs={12} style={styles.centerTitle}>
            <motion.div
              initial={{ scale: 1.0, opacity: 1 }}
              animate={{ scale: 1.2, opacity: 0.7, duration: 0.2 }}
              transition={{ ease: "linear", duration: 2, repeat: Infinity, repeatType: "reverse", }}
            >
              <h2 style={{ color: colors[1], textShadow: "2px 2px 4px #000" }}>Haz click para ingresar</h2>
            </motion.div>
          </Grid>
          
        </Grid>
      </div>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}
function externalApp() {
  return (
    <MainProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </MainProvider>
  );
}
function App() {
  const contexto = useMainContext();
  const { theme, profile } = contexto;
  return (
    <div className={styles.main}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default externalApp;
