import { useState } from "react";
import "./timer_section.css";
import Modal_save_time from "./Modal_save_time/Modal_save_time";
import { useTimer } from "../../hooks/useTimer";
import { useModalSaveTime } from "../../hooks/useModalSaveTime";
import { useList_context } from "../Timer_list_context/Timer_list_context";
import Modal_saved_item from "../List_section/Modal_saved_item/Modal_saved_item";

export default function Timer_section() {
  const { time, status, startDate, startTimer, pauseTimer, stopTimer, endTime, startTime2 } = useTimer();
  const { modalStatus, openModal, closeModal } = useModalSaveTime();
  const { isModalOpen } = useList_context();
  
  // Сохраним актуальное значение time перед остановкой
  const [savedTime, setSavedTime] = useState(time);

  const start_pause_button_styles: string =
    status === true ? "bg-yellow-600 pause_button" : "bg-green-600 start_button";

  const handleStop = () => {
    // Сохраняем текущее время перед сбросом
    setSavedTime(time);
    stopTimer();
    openModal();
  };

  return (
    <div className="bg-neutral-900 h-screen relative min-w-[70%] flex justify-center items-center flex-col select-none">
      <div className="text-4xl text-white">{time}</div>
      <div className="mt-36 grow w-full flex gap-5 absolute bottom-0 p-5 text-lg">
        <div
          className={`flex-1 py-6 bol rounded-xl cursor-pointer hover:scale-105 transition-all opacity-80 ${start_pause_button_styles}`}
          onClick={status === true ? pauseTimer : startTimer}
        >
          {status === true ? "Пауза" : (status === 'paused' ? 'Возобновить' : "Старт")}
        </div>
        <div
          className="flex-1 py-6 bol rounded-xl cursor-pointer hover:scale-105 transition-all opacity-80 stop_button bg-red-600"
          onClick={status ? handleStop : undefined}
        >
          Стоп
        </div>
      </div>
      {modalStatus && (
        
          <Modal_save_time 
            onClick={closeModal} 
            saveResultProps={{ startDate, time: savedTime, startTime2, endTime }} // Передаем сохранённое время
          />
        
      )}

      {isModalOpen && (
        <Modal_saved_item/>
      )}
    </div>
  );
}