'use client'

import { ReactElement, ReactNode, createContext, useCallback, useContext, useRef, useState } from "react"
import Audio from "@/assets/audio01.mp3"
import Audio02 from "@/assets/audio02.mp3"
export type MusicPlayerContextProps = {
    musicPlayedTime: number,
    musicIsAlreadyPlaying: boolean,
    isFetchingMusic: boolean,
    audioRef: React.MutableRefObject<HTMLAudioElement | null>,
    fetchSingleSong: (music: MUSIC_DTO) => Promise<void>,
    currentMusic: MUSIC_DTO | null,
    handleMusicPlayerState: () => void,
    handleReturnToPlayMusic: (time: number[]) => void,
    handleMusicTimeChange: (time: number[]) => void,
    handleGoToNextMusic: () => Promise<void>,
    handleGoToPreviousMusic: () => Promise<void>,
    fetchQueueSongs: (musics: MUSIC_DTO[], musicId?: string) => Promise<void>,
}
type MusicPlayerContextProviderProps = {
    children: ReactNode
}
export const MusicPlayerContext = createContext({} as MusicPlayerContextProps)

export function MusicPlayerContextProvider({ children }: MusicPlayerContextProviderProps) {

    const [musicPlayedTime, setMusicPlayedTime] = useState(0)
    const [musicVolume, setMusicVolume] = useState(1)
    const [musicQueue, setMusicQueue] = useState<MUSIC_DTO[] | null>([])
    const [musicIsAlreadyPlaying, setMusicIsAlreadyPlaying] = useState(false)
    const [musicIntervalId, setMusicIntervalId] = useState<null | NodeJS.Timeout>(null)
    const [isFetchingMusic, setIsFetchingMusic] = useState(false)
    const [currentMusic, setCurrentMusic] = useState<null | MUSIC_DTO>(null)

    const audioRef = useRef<HTMLAudioElement | null>(null)

    function clearMusicIntervalId() {
        if (!musicIntervalId) {
            return
        }
        clearInterval(musicIntervalId)
    }

    const fetchSingleSong = useCallback(async (music: MUSIC_DTO) => {
        if (isFetchingMusic) return
        setIsFetchingMusic(true)
        if (!audioRef.current) return

        try {

            const audioResponse = await fetch(music.url)
            const streamReader = audioResponse.body?.getReader()

            if (!streamReader) return

            let audioContentExists = true
            const arrayChunks: Blob[] = []

            audioRef.current.currentTime = 0
            while (audioContentExists) {

                const { done, value } = await streamReader.read()

                if (done) break
                const blob = new Blob([value])
                arrayChunks.push(blob)

                if (arrayChunks.length === 12) {

                    const concatenatedBlob = new Blob(arrayChunks)
                    const audioUrl = URL.createObjectURL(concatenatedBlob);
                    audioRef.current.src = audioUrl

                    await startMusicPlayer()

                }

            }
            console.log("audio chunks", arrayChunks)

            const oldTime = audioRef.current.currentTime
            const concatenatedBlob = new Blob(arrayChunks)
            const audioUrl = URL.createObjectURL(concatenatedBlob);

            audioRef.current.src = audioUrl
            audioRef.current.currentTime = oldTime
            await startMusicPlayer()
            setCurrentMusic(music)



        } catch (error) {
            console.error(error)
        }
        finally {
            setIsFetchingMusic(false)
        }
    }, [])

    const fetchQueueSongs = useCallback(async (musics: MUSIC_DTO[], musicId?: string) => {
        setMusicQueue(musics)
        const music = musics.find(music => music.id === musicId)
        await fetchSingleSong(music?.id ? music : musics[0])
    }, [])




    function startMusicCounter() {
        const intervalId = setInterval(() => {
            if (!audioRef.current?.currentTime) return
            setMusicPlayedTime(audioRef.current?.currentTime)
        }, 1000)

        setMusicIntervalId(intervalId)

        return intervalId
    }

    async function startMusicPlayer() {
        if (!audioRef.current) return
        await audioRef.current?.play()
        startMusicCounter()
        setMusicIsAlreadyPlaying(true)
    }

    async function stopMusicPlayer() {
        clearMusicIntervalId()
        setMusicIsAlreadyPlaying(false)
        audioRef.current?.pause()
    }

    async function handleMusicPlayerState() {
        if (musicIntervalId && musicIsAlreadyPlaying) {
            stopMusicPlayer()
            return
        }
        await startMusicPlayer()
    }

    async function handleReturnToPlayMusic(time: number[]) {
        if (!audioRef.current?.currentTime) return
        audioRef.current.currentTime = time[0]
        audioRef.current.volume = musicVolume
        await startMusicPlayer()

    }

    function handleMusicTimeChange(time: number[]) {
        if (!audioRef.current?.currentTime) return
        setMusicPlayedTime(time[0])
        audioRef.current.currentTime = time[0]
        audioRef.current.pause()
        clearMusicIntervalId()

    }


    async function handleGoToNextMusic() {
        if (!audioRef.current) return
        if (!musicQueue || !musicQueue.length) return

        const currentMusicIndex = musicQueue.findIndex(music => music.id === currentMusic?.id)

        const isLastMusic = currentMusicIndex === musicQueue.length - 1
        const songToFetch = isLastMusic ? musicQueue[0] : musicQueue[currentMusicIndex + 1]
        fetchSingleSong(songToFetch)

    }

    async function handleGoToPreviousMusic() {
        if (!audioRef.current) return
        if (!musicQueue || !musicQueue.length) return
        const currentMusicIndex = musicQueue.findIndex(music => music.id === currentMusic?.id)

        const isFirstMusic = currentMusicIndex === 0

        if (isFirstMusic) {
            audioRef.current.currentTime = 0
            return
        }
        const songToFetch = musicQueue[currentMusicIndex - 1]
        fetchSingleSong(songToFetch)

    }






    return (
        <MusicPlayerContext.Provider value={{
            audioRef,
            fetchQueueSongs,
            handleGoToNextMusic,
            handleGoToPreviousMusic,
            handleMusicPlayerState,
            handleMusicTimeChange,
            fetchSingleSong,
            currentMusic,
            musicIsAlreadyPlaying,
            musicPlayedTime,
            isFetchingMusic: isFetchingMusic,

            handleReturnToPlayMusic,
        }}>
            {children}
        </MusicPlayerContext.Provider>
    )
}