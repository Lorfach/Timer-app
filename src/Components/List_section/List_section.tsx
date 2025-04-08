import { useList_context } from "../Timer_list_context/Timer_list_context";
import List_item from "./List_item/List_item";

export default function List_section() {
  const { LS } = useList_context();

  return (
    <div className="h-full outline-1 outline-red-600 grow flex flex-col gap-5 items-center py-5 overflow-y-scroll">
      {LS.length ? (
        // Получаем массив [index, item], затем разворачиваем порядок элементов
        [...LS.entries()].reverse().map(([index, item_props]) => (
          <List_item key={index} {...item_props} id={index} />
        ))
      ) : (
        <div className="opacity-50">Нет записей</div>
      )}
    </div>
  );
}
