import { createContext, useCallback, useContext, ReactNode, useState, useMemo } from "react";
import { LS_new_item, LS_items, LS_remove_item, LS_change_item_name, LS_get_item, LS_update_item } from "../../utils/localstorage";

// Тип для аргумента функции
import { TimerListItem } from "../../types/universal";

// Определение типов для контекста
interface TimerContextType {
  saveTimerListItem: (resultProps: TimerListItem) => void;
  LS:TimerListItem[];
  removeTimerListItem:(id: number) => void;
  changeItemName:(id:number, value:string) => void;
  isModalOpen:boolean;
  openSavedItemModal:(id: number) => void,
  closeSavedItemModal:() => void;
  itemInfo:ItemInfo | undefined;
  setNewItemInfo:(new_description:string, id:number) => void;
}

interface ItemInfo extends TimerListItem{
  id:number;
}

// Создание контекста с `null` по умолчанию
const TimerContext = createContext<TimerContextType | null>(null);

// Провайдер контекста
export const List_Provider = ({ children }: { children: ReactNode }) => {

  const [LS, setLS] = useState<TimerListItem[]>(() => LS_items() || []);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemInfo, setItemInfo] = useState<ItemInfo>();

  const saveTimerListItem = useCallback((resultProps: TimerListItem) => {
    console.log(resultProps);    
    setLS(LS_new_item(resultProps))
  }, []);

  const removeTimerListItem = useCallback((id: number) => {
    console.log(id);
    
    setLS(LS_remove_item(id))
  }, [])

  const changeItemName = useCallback((id:number, value:string) => {
    setLS(LS_change_item_name(id, value))
  }, [])

  const closeSavedItemModal = useCallback(() => {
    setIsModalOpen(false);
  }, [])

  const openSavedItemModal = useCallback((id:number) => {
    const item = LS_get_item(id);
    setItemInfo({...item, id})
    setIsModalOpen(true);
  }, [])

  const setNewItemInfo = useCallback((new_description:string, id:number) => {
    LS_update_item(new_description, id)
  }, [])

  const ContextValue:TimerContextType = useMemo(() => ({
    saveTimerListItem,
    LS,
    removeTimerListItem,
    changeItemName,
    isModalOpen,
    openSavedItemModal,
    closeSavedItemModal,
    itemInfo,
    setNewItemInfo
  }), [saveTimerListItem, removeTimerListItem, changeItemName,openSavedItemModal, closeSavedItemModal, setNewItemInfo, LS, isModalOpen, itemInfo])

  return (
    <TimerContext.Provider value={ContextValue}>
      {children}
    </TimerContext.Provider>
  );
};

// Хук для использования контекста
export function useList_context(): TimerContextType {
  return useContext(TimerContext) as TimerContextType;
}
