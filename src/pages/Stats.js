import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Backdrop,
  CircularProgress,
  Box,
  LinearProgress,
  Typography,
} from "@mui/material";
import * as skinview3d from "skinview3d";
import { useNavigate, useLocation } from "react-router-dom";

export default function Stats({
  reloadStats,
  username,
  setUsername,
  error,
  setError,
}) {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  let gettingName = null;
  const getStats = async (username) => {
    setError(null);
    if (isLoading || gettingName != null) return;
    if (stats !== null) {
      if (username === stats.stats.general.playerName) {
        return;
      }
    }
    if (username.length <= 0) {
      setIsLoading(false);
      setError("Please enter a username!");
    } else {
      console.log("Getting stats for " + username);
      setIsLoading(true);
      gettingName = username;
      await axios
        .get(`https://sulky-alluring-diploma.glitch.me/stats/${username}`)
        .then((res) => {
          var data = res.data;
          if (data.hasOwnProperty("error")) {
            setError(data.error);
            navigate("/");
          } else {
            setStats(data);
          }
          setIsLoading(false);
          gettingName = null;
        })
        .catch((err) => {
          navigate("/");
          setError(err);
          setIsLoading(false);
          gettingName = null;
        });
    }
  };
  const pathname = window.location.pathname;
  const onPageLoad = () => {
    var u = pathname.substring(pathname.lastIndexOf("/") + 1);
    setUsername(u);
    getStats(u);
  };
  useEffect(() => {
    // Check if the page has already loaded
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  useEffect(() => {
    onPageLoad();
  }, [location]);

  useEffect(() => {
    if (stats != null) {
      const domElement = document.getElementById("skin_container");
      const skinViewer = new skinview3d.SkinViewer({
        canvas: domElement,
        width: 500,
        height: 600,
        skin: stats.skin,
      });

      // Control objects with your mouse!
      const control = skinview3d.createOrbitControls(skinViewer);
      control.enableRotate = true;
      control.enableZoom = false;

      // And run for now!
      let run = skinViewer.animations.add(skinview3d.IdleAnimation);

      // Set the speed of an animation
      run.speed = 1;

      domElement.addEventListener(
        "contextmenu",
        (event) => event.stopImmediatePropagation(),
        true // this forces us to stop bubbling
      );

      const domElement2 = document.getElementById("skin_container_mobile");
      const skinViewer2 = new skinview3d.SkinViewer({
        canvas: domElement2,
        width: 300,
        height: 400,
        skin: stats.skin,
      });

      // Control objects with your mouse!
      const control2 = skinview3d.createOrbitControls(skinViewer2);
      control2.enableRotate = true;
      control2.enableZoom = false;

      // And run for now!
      let run2 = skinViewer2.animations.add(skinview3d.IdleAnimation);

      // Set the speed of an animation
      run2.speed = 1;

      domElement2.addEventListener(
        "contextmenu",
        (event) => event.stopImmediatePropagation(),
        true // this forces us to stop bubbling
      );
      setProgress(
        (stats.stats.general.progress / stats.stats.general.maxProgress) * 100
      );
    }
  }, [stats]);

  useEffect(() => {}, [reloadStats]);
  const [showMore, setShowMore] = useState(false);

  const toggleShow = () => {
    if (!showMore) {
      document.getElementById("showmore").classList.add("show2");
    } else {
      document.getElementById("showmore").classList.remove("show2");
    }

    setShowMore(!showMore);
  };
  return (
    <>
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        stats && (
          <div className="display">
            <div className="skin-display">
              <canvas id="skin_container"></canvas>
            </div>
            <div className="stats-display">
              <div className="stats-display__title">
                <div className="bg-text">
                  Player: <a>{stats.stats.general.playerName}</a>
                </div>
                <div className="bg-text">
                  Rank: <a>{stats.rankData.rank}</a>
                </div>
              </div>
              <div className="stats-display__content">
                <div className="progressBra">
                  <div className="level">
                    Level: <a>{stats.stats.general.level}</a>
                  </div>
                  <div className="level">
                    Progress:{" "}
                    <a>
                      {stats.stats.general.progress} /{" "}
                      {stats.stats.general.maxProgress}
                    </a>
                  </div>
                  <Box sx={{ width: "100%" }}>
                    <LinearProgressWithLabel
                      color="success"
                      className="progress"
                      value={progress}
                    />
                  </Box>
                </div>
                <div className="skinViewMobile">
                  <canvas id="skin_container_mobile"></canvas>
                </div>
                {/* BedWars */}
                <div className="data-box">
                  <div className="data-box__title">
                    <a>BedWars</a>
                  </div>
                  <div className="data-box__content">
                    <div className="data-box__content__row">
                      Wins:{" "}
                      <mark className="data-box__content__row__value">
                        {stats.stats.bedwars.wins}
                      </mark>
                    </div>
                    <div className="data-box__content__row">
                      Kills:{" "}
                      <mark className="data-box__content__row__value">
                        {stats.stats.bedwars.kills}
                      </mark>
                    </div>
                    <div className="data-box__content__row">
                      Final Kills:{" "}
                      <mark className="data-box__content__row__value">
                        {stats.stats.bedwars.finalKills}
                      </mark>
                    </div>
                    <div className="data-box__content__row">
                      Beds Broken:{" "}
                      <mark className="data-box__content__row__value">
                        {stats.stats.bedwars.bedsBroken}
                      </mark>
                    </div>
                    <div className="data-box__content__row">
                      Current win streak:{" "}
                      <mark className="data-box__content__row__value">
                        {stats.stats.bedwars.currentWinstreak}
                      </mark>
                    </div>
                    <div className="data-box__content__row">
                      Best win streak:{" "}
                      <mark className="data-box__content__row__value">
                        {stats.stats.bedwars.bestWinstreak}
                      </mark>
                    </div>
                  </div>
                </div>
                {/* SkyWars */}
                <div className="data-box">
                  <div className="data-box__title">
                    <a>SkyWars</a>
                  </div>
                  <div className="data-box__content">
                    <div className="data-box__content__row">
                      Wins:{" "}
                      <mark className="data-box__content__row__value">
                        {stats.stats.skywars.wins}
                      </mark>
                    </div>
                    <div className="data-box__content__row">
                      Kills:{" "}
                      <mark className="data-box__content__row__value">
                        {stats.stats.skywars.kills}
                      </mark>
                    </div>
                  </div>
                </div>
                {/* TheBridge */}
                <div className="data-box">
                  <div className="data-box__title">
                    <a>TheBridge</a>
                  </div>
                  <div className="data-box__content">
                    <div className="data-box__content__row">
                      Wins:{" "}
                      <mark className="data-box__content__row__value">
                        {stats.stats.thebridge.wins}
                      </mark>
                    </div>
                    <div className="data-box__content__row">
                      Goals:{" "}
                      <mark className="data-box__content__row__value">
                        {stats.stats.thebridge.goals}
                      </mark>
                    </div>
                    <div className="data-box__content__row">
                      Current win streak:{" "}
                      <mark className="data-box__content__row__value">
                        {stats.stats.thebridge.currentWinstreak}
                      </mark>
                    </div>
                    <div className="data-box__content__row">
                      Best win streak:{" "}
                      <mark className="data-box__content__row__value">
                        {stats.stats.thebridge.bestWinstreak}
                      </mark>
                    </div>
                  </div>
                </div>

                {/* Duels */}
                <div className="data-box">
                  <div className="data-box__title">
                    <a>Duels</a>
                  </div>
                  <div className="data-box__content">
                    <div className="data-box__content__row">
                      All wins:{" "}
                      <mark className="data-box__content__row__value">
                        {stats.stats.duels.sumoWins +
                          stats.stats.duels.archerWins +
                          stats.stats.duels.ironWins +
                          stats.stats.duels.potWins +
                          stats.stats.duels.buildUhcWins}
                      </mark>
                    </div>
                    <h6>
                      <div className="show-more-group" id="showmore">
                        <div className="data-box__content__row">
                          BuildUHC wins:{" "}
                          <mark className="data-box__content__row__value">
                            {stats.stats.duels.buildUhcWins}
                          </mark>
                        </div>

                        <div className="data-box__content__row">
                          PotPvP wins:{" "}
                          <mark className="data-box__content__row__value">
                            {stats.stats.duels.potWins}
                          </mark>
                        </div>

                        <div className="data-box__content__row">
                          Iron wins:{" "}
                          <mark className="data-box__content__row__value">
                            {stats.stats.duels.ironWins}
                          </mark>
                        </div>

                        <div className="data-box__content__row">
                          Archer wins:{" "}
                          <mark className="data-box__content__row__value">
                            {stats.stats.duels.archerWins}
                          </mark>
                        </div>

                        <div className="data-box__content__row">
                          Sumo wins:{" "}
                          <mark className="data-box__content__row__value">
                            {stats.stats.duels.sumoWins}
                          </mark>
                        </div>
                      </div>

                      <div
                        className="showMoreBtn"
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleShow()}
                      >
                        {showMore ? "Show less" : "Show more"}
                      </div>
                    </h6>

                    <div className="data-box__content__row">
                      Current win streak:{" "}
                      <mark className="data-box__content__row__value">
                        {stats.stats.duels.currentWinstreak}
                      </mark>
                    </div>

                    <div className="data-box__content__row">
                      Best win streak:{" "}
                      <mark className="data-box__content__row__value">
                        {stats.stats.duels.bestWinstreak}
                      </mark>
                    </div>

                    <div className="data-box__content__row">
                      Elo:{" "}
                      <mark className="data-box__content__row__value">
                        {stats.stats.duels.elo}
                      </mark>
                    </div>
                  </div>
                </div>

                {/* UHCMeetup */}
                <div className="data-box">
                  <div className="data-box__title">
                    <a>UHCMeetup</a>
                  </div>
                  <div className="data-box__content">
                    <div className="data-box__content__row">
                      Wins:{" "}
                      <mark className="data-box__content__row__value">
                        {stats.stats.uhcmeetup.wins}
                      </mark>
                    </div>
                    <div className="data-box__content__row">
                      Kills:{" "}
                      <mark className="data-box__content__row__value">
                        {stats.stats.uhcmeetup.kills}
                      </mark>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
