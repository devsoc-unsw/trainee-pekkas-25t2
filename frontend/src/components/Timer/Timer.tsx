import { useState, useEffect, useRef } from 'react';
import classes from "./Timer.module.css"

function Timer() {
    const [timerRunning, setTimerRunning] = useState(false);
    const [time, setTime] = useState(0); //counts in seconds
    const intervalRef = useRef<number | null>(null);

    //lowk running outta time so I just watched this yt video https://www.youtube.com/watch?v=yHrQ4DuMOhA
    useEffect(() => {
        if (!timerRunning) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

            return;
        }
        intervalRef.current = window.setInterval(() => {
            setTime((s) => s + 1);
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [timerRunning]);

    //pls forgive bros asked chat here... 😔
    const formatTime = (total: number) => {
        const h = Math.floor(total / 3600);
        const m = Math.floor((total % 3600) / 60);
        const s = total % 60;
        const hh = h.toString();
        const mm = m.toString().padStart(2, "0");
        const ss = s.toString().padStart(2, "0");
        return `${hh}:${mm}:${ss}`;
    };

    const toggleTimer = () => {
        if (timerRunning) {
            setTimerRunning(false); //Don't clear just yet
            //increment the active pokemon's exp if exists
        } else {
            setTime(0);
            setTimerRunning(true);
        }
    }

    return (
        <div className={classes.wrapper}>
            <p className={classes.instructionText}>Train your pokemon with the timer!</p>
            <h1 className={classes.time}>{formatTime(time)}</h1>
            <button onClick={toggleTimer} className={`${classes.toggleButton} ${timerRunning ? classes.stop : classes.start}`}>{timerRunning ? "Stop" : "Start"}</button>
        </div>
    )
}

export default Timer