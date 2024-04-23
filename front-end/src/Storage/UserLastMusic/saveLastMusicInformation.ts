import { lastMusicKey, lastMusicQueueKey } from "."

type saveLastMusicInformationProps = {
    music: MUSIC_DTO
    musicQueue?: MUSIC_DTO[]
}

export async function saveLastMusicInformation({ music, musicQueue }: saveLastMusicInformationProps) {
    const musicInStringify = JSON.stringify(music)
    window.localStorage.setItem(lastMusicKey, musicInStringify)
    if(!musicQueue?.length) return

    const musicQueueInStringify = JSON.stringify(musicQueue)
    window.localStorage.setItem(lastMusicQueueKey, musicQueueInStringify)
}