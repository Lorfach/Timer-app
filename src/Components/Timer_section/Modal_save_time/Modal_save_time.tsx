import { useRef } from "react";
import { useList_context } from "../../Timer_list_context/Timer_list_context";

type SaveResultProps = {
    startDate: string;
    time: string;
    startTime2:string;
    endTime:string;
}

export default function Modal_save_time({
  onClick,
  saveResultProps: { startDate:date, time, startTime2, endTime },
}: {
  onClick: () => void;
  saveResultProps: SaveResultProps;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { saveTimerListItem } = useList_context();
  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex justify-center">
      <div className="w-[60%] px-6 py-8 pb-4 bg-neutral-900 rounded-xl flex flex-col gap-9 absolute top-[25%] items-center">
        <div
          className="text-2xl"
        >
          Сохранить заметку
        </div>
        <div className="bg-neutral-800 rounded-xl w-[80%] m-auto mt-14 mb-2 h-12">
          <input
            ref={inputRef}
            type="text"
            className="w-full h-full text-center bg-neutral-800 transition rounded-xl focus:contrast-75 border-indigo-600 outline-none"
            placeholder="Название заметки"
          />
        </div>

        <div className="bg-neutral-800 hover:contrast-75 transition w-full rounded-xl py-3 cursor-pointer"
        onClick={() => {saveTimerListItem({time, date, name:inputRef.current?.value || "", startTime:startTime2, endTime}); onClick()}}>
          Сохранить
        </div>

        <div
          className="absolute top-5 right-5 cursor-pointer bg-neutral-800 rounded-sm p-1"
          onClick={onClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#E52B50"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
