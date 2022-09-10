import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon  from "@mui/icons-material/PlayArrow";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardMedia from "@mui/material/CardMedia";
import { useTheme } from "@mui/material/styles";
import data from "../assets/audio/data.json"
function MusicPlayer({ color, contrast, music }) {
  const theme2 = useTheme();
  // const { loading, error, sound } = useMusic(music)
  const playAudio = () => {
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.play();
  };
  return (
    <Card
      style={{
        width: 400,
        display: "flex",
        backgroundColor: color,
        boxShadow: "4px 4px 4px gray",
        position: "fixed",
        margin: 50
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent
          style={{
            flex: "1 0 auto",
          }}
        >
          <Typography component="h5" variant="h5" color={contrast}>
            {data.artist}
          </Typography>
          <Typography variant="subtitle1" color={contrast}>
            {data.title}
          </Typography>
        </CardContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: 1,
            paddingBottom: 1,
          }}
        >
          <IconButton aria-label="previous">
            {useTheme().direction !== "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause" onClick={playAudio}>
            <PlayArrowIcon
              style={{
                height: 38,
                width: 38,
              }}
            />
          </IconButton>
          <IconButton aria-label="next">
            {useTheme().direction !== "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
        </div>
      </div>
      <CardMedia
        style={{
          width: 151,
        }}
        image="https://write.geeksforgeeks.org/static/media/Group%20210.08204759.svg"
      />
        <audio autobuffer={"autobuffer"} autoPlay={"autoPlay"} className="audio-element">
            <source src={data.uri}></source>
        </audio>
    </Card>
  );
}
export default MusicPlayer;
