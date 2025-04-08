import {useEffect, useRef } from "react";
import { useList_context } from "../../Timer_list_context/Timer_list_context"

export default function Modal_saved_item(){
    const {closeSavedItemModal, itemInfo, setNewItemInfo} = useList_context();
    console.log(itemInfo);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        textAreaRef.current?.addEventListener('focusout', () => {
            textAreaRef.current?.value && setNewItemInfo(textAreaRef.current?.value, (itemInfo?.id as number));
        })
    }, [])
    
    return(
        <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex justify-center items-center" id="blur">
            <div className="w-[60%] p-6 bg-neutral-900 rounded-xl flex flex-col gap-10 relative select-text">
                <div className="text-2xl">{itemInfo?.name == "" ? <span className=" opacity-50">Без названия</span> : itemInfo?.name}</div>

                <div className="flex gap-5 justify-around">
                    <div className="w-[40%] h-full flex flex-col gap-3 items-center justify-center">
                        <div className="text-xl">
                            Время и дата
                        </div>

                        <div className="flex flex-col gap-2 w-[80%] text-lg">
                            <p>{itemInfo?.date}</p>
                            <p className="border-t-1 border-neutral-500 py-2">Сколько занимался: <br /> {itemInfo?.time}</p>
                            <p className="border-t-1 border-neutral-500 py-2">Когда начал: <br /> {itemInfo?.startTime}</p>
                            <p className="border-t-1 border-neutral-500 py-2">Когда закончил: <br /> {itemInfo?.endTime}</p>
                        </div>
                    </div>
                    <div className="w-[40%] h-auto flex flex-col gap-3">
                        <div className="text-xl w-full">
                            Описание записи
                        </div>

                        <div className="h-full">
                            <textarea ref={textAreaRef} name="" defaultValue={itemInfo?.description} id="" className="h-full focus:border-2 rounded-md transition text-center border-neutral-600 outline-0"></textarea>
                        </div>
                    </div>
                </div>

                <div
                    className="absolute top-5 right-5 cursor-pointer bg-neutral-800 rounded-sm p-1"
                    onClick={closeSavedItemModal}
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
    )
}