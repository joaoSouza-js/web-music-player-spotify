import { lastMusicSearchKey } from ".";

export function saveLastUserSearch(search: string){
     localStorage.setItem(lastMusicSearchKey,search)
}