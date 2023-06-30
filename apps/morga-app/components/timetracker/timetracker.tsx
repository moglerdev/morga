"use client";
import React from "react";
import Button from "../utils/Button.jsx";

import { FaClock } from "react-icons/fa";

function pad(n: number) {
  return n < 10 ? "0" + n : n;
}

export function Time({ children }: { children: number }) {
  const [time, setTime] = React.useState("00:00:00");
  React.useEffect(() => {
    const hour = Math.floor(children / 3600);
    const minute = Math.floor((children - hour * 3600) / 60);
    const second = children - hour * 3600 - minute * 60;
    setTime(`${pad(hour)}:${pad(minute)}:${pad(second)}`);
  }, [children]);
  return <span>{time}</span>;
}

export default function TimeTracker() {
  const [fetching, setFetching] = React.useState(false);
  const [track, setTrack] = React.useState(0);
  const [intervalId, setIntervalId] = React.useState<number | undefined>(
    undefined
  );

  const startTracking = () => {
    setFetching(true);
    fetch("/api/timetracker", { method: "POST" })
      .then((res) => res.json())
      .then((res) => {
        setTrack(res.track);
        const id = window.setInterval(() => {
          setTrack((track) => track + 1);
        }, 1000);
        setIntervalId(id);
        setFetching(false);
      });
  };

  React.useEffect(() => {
    setFetching(true);
    fetch("/api/timetracker")
      .then((res) => res.json())
      .then((res) => {
        setTrack(res.track);
        if (res.tracking) {
          startTracking();
        }
        setFetching(false);
      });
  }, []);

  React.useEffect(() => {
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <Button onClick={startTracking} disabled={fetching}>
      <FaClock className="text-xl" />{" "}
      <span>{track > 0 ? <Time>{track}</Time> : "Start tracking"}</span>
    </Button>
  );
}
