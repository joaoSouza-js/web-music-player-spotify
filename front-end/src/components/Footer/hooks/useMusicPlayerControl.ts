import { useState } from "react"

type useMusicPlayerControlReturn = {
    handleMusicPlayerState: () => void,
    handleReturnToPlayMusic: (time: number[]) => void,
    handleMusicTimeChange: (time: number[]) => void,
    handleGoToNextMusic: () => Promise<void>,
    handleGoToPreviousMusic: () => Promise<void>,
    handleMuteApplicationSpeaker: () => void
    handleVolumeChange: (volumeList: number[]) => void,
    musicIsAlreadyPlaying: boolean,
}

type useMusicPlayerControlProps  = {
    audioRef: React.MutableRefObject<HTMLAudioElement | null>
}

export function useMusicPlayerControl({audioRef}:useMusicPlayerControlProps) {
    const [musicVolume, setMusicVolume] = useState(1)
  

    function handleVolumeChange(volumeList: number[]) {
        if (!audioRef.current?.volume) return

        const volume = volumeList[0]
        setMusicVolume(volume)

        audioRef.current.muted = false

        if (volume <= 0) {
            setMusicVolume(.001)
            audioRef.current.volume = .1
            return

        }
        setMusicVolume(volume)
        audioRef.current.volume = volume
    }

    async function handleMuteApplicationSpeaker() {
        if (!audioRef.current) return
        if (audioRef.current.muted === true) {
            handleVolumeChange([.5])
            audioRef.current.muted = false
            return

        }
        handleVolumeChange([.1])
        audioRef.current.muted = true

    }

    

    return {
        handleVolumeChange,
        musicVolume,
        handleMuteApplicationSpeaker,
    }
}