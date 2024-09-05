import React, {useState,useEffect} from "react";

function Timer(){
    const [hours,setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);


    useEffect(()=>{
        let timer;
        if(isRunning && totalSeconds > 0){
            timer = setInterval(()=>{
                setTotalSeconds(prev => prev-1)
            },1000)
        }
        else if(totalSeconds === 0){
            clearInterval(timer)
            setIsRunning(false)
        }

        return()=> clearInterval(timer)
    },[isRunning,totalSeconds]);

    const startPause = () => {
        if (isRunning) {
            setIsRunning(false);
        } else {
            setTotalSeconds(hours * 3600 + minutes * 60 + seconds);
            setIsRunning(true);
        }
    };

    const reset = () => {
        setIsRunning(false);
        setTotalSeconds(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
    };
    
    const formatTime = () => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        let timeString = '';

        if (hrs > 0) timeString += `${hrs.toString().padStart(2, '0')}h `;
        if (mins > 0 || hrs > 0) timeString += `${mins.toString().padStart(2, '0')}m `;
        timeString += `${secs.toString().padStart(2, '0')}s`;

        return timeString;
    };

    return (
        <div>
            <main>
                <div id="heading"><h3>TIMER</h3></div>
                <label htmlFor="hours">Hours:</label>
                <input
                    type="number"
                    id="hours"
                    min="0"
                    placeholder="0"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                />
                <label htmlFor="minutes">Minutes:</label>
                <input
                    type="number"
                    id="minutes"
                    min="0"
                    max="59"
                    placeholder="0"
                    value={minutes}
                    onChange={(e) => setMinutes(Number(e.target.value))}
                />
                <label htmlFor="seconds">Seconds:</label>
                <input
                    type="number"
                    id="seconds"
                    min="0"
                    max="59"
                    placeholder="0"
                    value={seconds}
                    onChange={(e) => setSeconds(Number(e.target.value))}
                />
                <div id="time">{formatTime()}</div>
                <button id="start_pause_btn" onClick={startPause}>
                    {isRunning ? 'PAUSE' : 'START'}
                </button>
                <button id="reset" onClick={reset}>RESET</button>
            </main>
        </div>
    );
}

export default Timer;