'use client'

import { lastMusicSearchKey } from ".";

export function getLastUserSearch(){
    const lastSearch = window.localStorage.getItem(lastMusicSearchKey)
    if(!lastSearch || !lastSearch?.length) return null
    return lastSearch
}