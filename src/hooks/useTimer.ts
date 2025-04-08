import { useState, useCallback, useRef } from "react";
import { getTime } from "../utils/utils"; // Функция форматирования времени

// Тип для статуса таймера: false – не запущен, true – работает, "paused" – на паузе
type Status = true | false | "paused";

export function useTimer() {
  const startTime = useRef<number>(0);
  const pausedTime = useRef<number>(0);
  const timerRef = useRef<number>(0);
  const startTime2 = useRef<string>("");
  const endTime = useRef<string>("");

  const startDate = new Date(startTime.current).toLocaleDateString();
  

  const [time, setTime] = useState<string>("00:00:00");
  const [status, setStatus] = useState<Status>(false);

  const startTimer = useCallback(() => {
    if (status === false) {
      // Запуск таймера с нуля
      startTime2.current = getTime(Date.now());

      startTime.current = Date.now();
      timerRef.current = window.setInterval(() => {
        const currentTime = Date.now();
        setTime(getTime(currentTime - startTime.current));
        
      }, 1000);
      setStatus(true);
    } else if (status === "paused") {
      // Возобновление работы после паузы
      startTime.current = Date.now();
      timerRef.current = window.setInterval(() => {
        const currentTime = Date.now();
        setTime(getTime(currentTime - startTime.current + pausedTime.current));
      }, 1000);
      setStatus(true);
    }
  }, [status]);

  const pauseTimer = useCallback(() => {
    pausedTime.current += Date.now() - startTime.current;
    clearInterval(timerRef.current);
    setStatus("paused");
  }, [status]);

  const stopTimer = useCallback(() => {
    endTime.current = getTime(Date.now());
    clearInterval(timerRef.current);
    setTime("00:00:00");
    setStatus(false);
    pausedTime.current = 0;
  }, [status]);

  return { time, status, startDate, startTime2:startTime2.current, endTime:endTime.current, startTimer, pauseTimer, stopTimer };
}