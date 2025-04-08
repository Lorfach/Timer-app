import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useList_context } from "../../Timer_list_context/Timer_list_context";

interface TimerListItem {
  time: string;
  date: string;
  name: string;
  id: number;
}

const List_item = memo(({ time, date, name, id }: TimerListItem) => {
    // console.log(1);
    
  const { removeTimerListItem, changeItemName, openSavedItemModal } = useList_context();
  const inputRef = useRef<HTMLInputElement>(null)
  const [isInputing, setIsInputing] = useState<boolean>(false);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
        if((e.target as HTMLElement).tagName != 'svg'){
            if(e.button == 2){
                setIsInputing(true)
            }else if(e.button == 0){
                openSavedItemModal(id);
            }
        }
    },
    []
  );

  useEffect(() => {
    inputRef.current?.addEventListener('focusout', () => {setIsInputing(false); changeItemName(id, inputRef.current?.value as string)})
  }, [])

  useEffect(() => {
    isInputing ? inputRef.current?.removeAttribute('disabled') : inputRef.current?.setAttribute('disabled', "true")
    inputRef.current?.focus()
  }, [isInputing])

  return (
    <div
      className="w-[90%] group relative rounded-xl border-2 border-violet-900 transition-colors hover:border-violet-800 cursor-pointer flex flex-col gap-3 py-2 shadow-md"
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      <div className={`break-words px-3 ${name ? "" : "opacity-35"}`}>
        {/* {name ? name : "Без названия"} */}
        <input ref={inputRef} type="text" defaultValue={name && name} placeholder={!name ? "Без названия" : undefined}  className="pointer-events-none w-full text-center outline-0 cursor-pointer" onClick={handleClick} />
      </div>

      <div className="flex justify-around opacity-90 flex-wrap">
        <div className="border-r-2 border-neutral-700 grow">{date}</div>
        <div className="grow">{time}</div>
      </div>

      <div
        className="absolute right-2 top-2 z-50"
        onClick={() => removeTimerListItem(id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x-lg opacity-0 group-hover:fill-red-600 group-hover:opacity-100 transition"
          viewBox="0 0 16 16"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
      </div>
    </div>
  );
});

export default List_item;