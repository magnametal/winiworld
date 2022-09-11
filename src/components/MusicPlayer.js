import React, { useEffect, useState, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/PauseOutlined";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import Stack from "@mui/material/Stack";
import { CardActions } from "@mui/material";

function MusicPlayer({ color, contrast, playingMusic }) {
  const theme = useTheme();
  const audioPlayer = useRef();
  const theme2 = useTheme();
  const [audioStatus, changeAudioStatus] = useState(true);

  const startAudio = () => {
    audioPlayer.current.play();

    changeAudioStatus(true);
  };
  const pauseAudio = () => {
    audioPlayer.current.pause();
    changeAudioStatus(false);
  };
  // const { loading, error, sound } = useMusic(music)
  const playAudio = () => {
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.play();
  };
  function valuetext(value) {
    return `${value}`;
  }
  const changeVolumen = (e) => {
    audioPlayer.current.volume = e.target.value / 100;
  };

  return (
    <div
      style={{
        maxWidth: 270,
        padding: 50
      }}
    >
      <Card
        style={{
          display: "flex",
          backgroundColor: color,
          boxShadow: "4px 4px 4px gray",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "240px"
          }}
        >
          <CardContent
            style={{
              flex: "1 0 auto",
              padding: "10px",
            }}
          >
            <Typography
              style={{
                fontSize: "13px",
              }}
              color={contrast}
            >
              {playingMusic.artist}
            </Typography>
            <Typography variant="subtitle1" color={contrast}>
              {playingMusic.title}
            </Typography>
          </CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              maxHeight: 60
            }}
          >
            <IconButton aria-label="previous">
              {useTheme().direction !== "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
            {audioStatus ? (
              <IconButton aria-label="play/pause" onClick={pauseAudio}>
                <PauseIcon
                  style={{
                    height: 38,
                    width: 38,
                  }}
                />
              </IconButton>
            ) : (
              <IconButton aria-label="play/pause" onClick={startAudio}>
                <PlayArrowIcon
                  style={{
                    height: 38,
                    width: 38,
                  }}
                />
              </IconButton>
            )}

            <IconButton aria-label="next">
              {useTheme().direction !== "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
          </div>
        </div>
        <audio
          ref={audioPlayer}
          autobuffer={"autobuffer"}
          autoPlay={"autoPlay"}
          preload="auto"
          repeat="repeat"
          loop={true}
        >
          <source src={playingMusic.uri}></source>
        </audio>
      </Card>
      <Stack
        spacing={2}
        direction="row"
        sx={{ mb: 1, px: 1 }}
        style={{ width: "95%", marginTop: "10px", background: "rgba(0, 0, 0, .6)", borderRadius: "20px"
      }}
        alignItems="center"
      >
        <VolumeDownRounded
          style={{
            color: color,
          }}
        />
        <Slider
          aria-label="Volumen"
          defaultValue={100}
          sx={{
            color: color,
            "& .MuiSlider-track": {
              border: "none",
            },
            "& .MuiSlider-thumb": {
              width: 24,
              height: 24,
              backgroundColor: contrast,
              "&:before": {
                boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                boxShadow: "none",
              },
            },
          }}
          onChange={changeVolumen}
        />
        <VolumeUpRounded
          style={{
            color: color,
          }}
        />
      </Stack>
    </div>
  );
}
export default MusicPlayer;
