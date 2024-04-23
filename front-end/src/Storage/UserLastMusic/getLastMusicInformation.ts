import { lastMusicKey, lastMusicQueueKey } from ".";

export function getLastMusicInformation() {
    const lastMusicInStringify = window.localStorage.getItem(lastMusicKey);
    const lastMusicQueueInStringify =
        window.localStorage.getItem(lastMusicQueueKey);

    const lastMusic: MUSIC_DTO = lastMusicInStringify
        ? JSON.parse(lastMusicInStringify)
        : null;

    const lastMusicQueue: MUSIC_DTO[] = lastMusicQueueInStringify
        ? JSON.parse(lastMusicQueueInStringify)
        : null;
    
    return { lastMusic, lastMusicQueue };
}
