'use client'

import { ReactElement, ReactNode, createContext, useCallback, useContext, useRef, useState } from "react"
import Audio from "@/assets/audio01.mp3"
import Audio02 from "@/assets/audio02.mp3"
export type MusicPlayerContextProps = {
    musicPlayedTime: number,
    musicIsAlreadyPlaying: boolean,
    isFetchingMusic: boolean,
    audioRef: React.MutableRefObject<HTMLAudioElement | null>,
    fetchAudioStream: () => Promise<void>,

    handleMusicPlayerState: () => void,
    handleReturnToPlayMusic: (time: number[]) => void,
    handleMusicTimeChange: (time: number[]) => void,
    handleGoToNextMusic: () => Promise<void>,
    handleGoToPreviousMusic: () => Promise<void>,
}
type MusicPlayerContextProviderProps = {
    children: ReactNode
}
export const MusicPlayerContext = createContext({} as MusicPlayerContextProps)

export function MusicPlayerContextProvider({ children }: MusicPlayerContextProviderProps) {
     
    const [musicPlayedTime, setMusicPlayedTime] = useState(0)
    const [musicVolume, setMusicVolume] = useState(1)
    const [musicIsAlreadyPlaying, setMusicIsAlreadyPlaying] = useState(false)
    const [musicIntervalId, setMusicIntervalId] = useState<null | NodeJS.Timeout>(null)
    const [isFetchingMusic, setIsFetchingMusic] = useState(false)

    const audioRef = useRef<HTMLAudioElement | null>(null)

    function clearMusicIntervalId() {
        if (!musicIntervalId) {
            return
        }
        clearInterval(musicIntervalId)
    }

    const fetchAudioStream = useCallback(async () => {
        if (isFetchingMusic) return
        setIsFetchingMusic(true)
        try {
            const response = await fetch("http://localhost:3333/audio-stream")
            const streamReader = response.body?.getReader()
            if (!streamReader) return
            let audioContentExists = true
            const arrayChunks: Blob[] = []
            while (audioContentExists) {

                const { done, value } = await streamReader.read()

                if (done) break
                const blob = new Blob([value])
                arrayChunks.push(blob)

                if (!audioRef.current) return

                if (arrayChunks.length === 5) {

                    const concatenatedBlob = new Blob(arrayChunks)
                    const audioUrl = URL.createObjectURL(concatenatedBlob);
                    audioRef.current.src = audioUrl

                    await startMusicPlayer()

                }

            }

            if (!audioRef.current) return
            const oldTime = audioRef.current.currentTime
            const concatenatedBlob = new Blob(arrayChunks)
            const audioUrl = URL.createObjectURL(concatenatedBlob);

            audioRef.current.src = audioUrl
            await startMusicPlayer()
            audioRef.current.currentTime = oldTime

        } catch (error) {
            console.error(error)
        }
        finally {
            setIsFetchingMusic(false)
        }
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
        audioRef.current.src = Audio02
        startMusicPlayer()
    }

    async function handleGoToPreviousMusic() {
        if (!audioRef.current) return
        audioRef.current.src = Audio
        startMusicPlayer()
    }




    return (
        <MusicPlayerContext.Provider value={{
            audioRef,
            handleGoToNextMusic,
            handleGoToPreviousMusic,
            handleMusicPlayerState,
            handleMusicTimeChange,
            fetchAudioStream,
            musicIsAlreadyPlaying,
            musicPlayedTime,
            isFetchingMusic: isFetchingMusic,
           
            handleReturnToPlayMusic,
        }}>
            {children}
        </MusicPlayerContext.Provider>
    )
}