import { TimerListItem } from "../types/universal"; 

export function LS_items(): TimerListItem[] {
    return JSON.parse(localStorage.getItem("results") || "[]");
}

function LS_update(LS: TimerListItem[]) {
    localStorage.setItem("results", JSON.stringify(LS));
}

export function LS_new_item(item: TimerListItem) {
    const newLS = LS_items().slice();
    newLS.push(item);
    LS_update(newLS);
    return newLS;
}

export function LS_remove_item(id: number): TimerListItem[] {
    const newLS = LS_items();
    newLS.splice(id, 1);
    LS_update(newLS);
    return newLS;
}

export function LS_change_item_name(id: number, value:string): TimerListItem[]{

    const newLS = LS_items();
    newLS[id].name = value;
    LS_update(newLS);
    return newLS;
}

export function LS_get_item(id:number):TimerListItem{
    return LS_items()[id];
}

export function LS_update_item(new_description:string, id:number){
    const newLS = LS_items();
    newLS[id].description = new_description;
    localStorage.setItem("results", JSON.stringify(newLS));
    return newLS;
}