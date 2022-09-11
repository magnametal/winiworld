import React, { useEffect, useState } from "react";
const { ipcRenderer } = require("electron");
import { useNavigate } from "react-router-dom";
import { useMainContext } from "./context/mainContext";
import useImage from "./hooks/useImage";
import { ColorExtractor } from "react-color-extractor";
import Grid from "@mui/material/Grid";
import MusicPlayer from "./MusicPlayer";
import { motion } from "framer-motion";
import audioData from "../assets/audio/data.json";
import CachedIcon from "@mui/icons-material/Cached";
import IconButton from "@mui/material/IconButton";
import SnowStorm from 'react-snowstorm';
import Button from '@mui/material/Button';

const styles = {
  root: (props) => ({
    minHeight: "100vh",
    backgroundImage: "url(" + props.background + ")",
    backgroundPosition: "center",
    margin: 0,
    padding: 0,
    backgroundSize: "cover",
    overflow: "hidden",
    backgroundRepeat: "no-repeat",
  }),
  background: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    padding: 0,
    // transform: "translateX(-1) scale(1)"
  },
  centerTitle: {
    height: 300,
    fontSize: 27,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mainGridStyles: {
    width: "100%",
  },
  gridStyles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 320,
  },
};
const variants = {
  out: { opacity: 0 },
  stand: { opacity: 1, x: 0 },
};
function Home() {
  const contexto = useMainContext();
  const { theme, profile, getRandom, background, reloadBg, contrast } =
    contexto;
  const [colors, setcolors] = useState([]);
  const [playingMusic, setPlayingMusic] = useState(null);
  const { loading, error, image } = useImage(background);
  const [isOut, setIsOut] = useState(false);
  let navigate = useNavigate();
  function start() {
    setTimeout(() => {
      navigate("/about");
    }, 1400);
    setIsOut(true);
  }
  useEffect(() => {
    // ipcRenderer.send("loadFileDialog", "message");
    let SelectedAudio = getRandom(audioData);
    setPlayingMusic(SelectedAudio);
    return () => {
      console.log("Home closed");
    };
  }, []);
  function getColors(colorsVector) {
    setcolors(colorsVector);
  }
  function reloadBackground() {
    reloadBg();
  }
  function getColor() {
      return colors[1];
  }
  if (!background) {
    return "cargando";
  }
  return (
    <>  
        {
            colors[1]?
                <SnowStorm followMouse={false} snowColor={colors[1]} /> 
            : false
        }
      
      <motion.div
        style={styles.root({ background: image })}
        transition={{
          ease: "easeOut",
          duration: 1.5,
        }}
        variants={variants}
        animate={isOut ? "out" : "stand"}
      >
        <IconButton
          aria-label="reload"
          style={{
            color: colors[1],
            background: "rgba(0, 0, 0, .6)",
            borderRadius: "20px",
            margin: "5px",
          }}
          onClick={reloadBackground}
        >
          <CachedIcon />
        </IconButton>
        
        <Grid container spacing={0}>
          <Grid item xs={12} md={12}>
            <Grid container spacing={0} style={styles.mainGridStyles}>
              <Grid item md={4} style={styles.gridStyles}>
                <ul>
                  <li>
                    <a
                      href="#"
                      style={{ color: colors[1], background: colors[2] }}
                    >
                      <p>La ciencia de la paz</p>
                    </a>
                  </li>
                </ul>
              </Grid>
              <Grid item md={4}>
                <ColorExtractor getColors={getColors}>
                  <img
                    src={image}
                    style={{
                      width: 5,
                      height: 5,
                      visibility: "none",
                      opacity: 0,
                    }}
                  />
                </ColorExtractor>
              </Grid>
              <Grid item md={4} style={styles.gridStyles}>
                {playingMusic ? (
                  <MusicPlayer
                    playingMusic={playingMusic}
                    color={colors[1]}
                    contrast={colors[2]}
                  />
                ) : (
                  false
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={styles.centerTitle}>
            <motion.div
              initial={{ scale: 1.0, opacity: 1 }}
              animate={{ scale: 1.2, opacity: 0.7, duration: 0.2 }}
              transition={{
                ease: "linear",
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              onClick={() => start(history)}
            >
              <h2
                style={{ color: colors[1], textShadow: "2px 2px 4px #000" }}
              >
                <Button style={{ color: colors[2], backgroundColor: colors[1] }} variant="contained">Iniciar WiniWorld </Button>
              </h2>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </>
  );
}

export default Home;
