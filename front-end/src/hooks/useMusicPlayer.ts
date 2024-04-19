import { MusicPlayerContext,MusicPlayerContextProps } from "@/context/MusicPlayerContext";
import { useContext } from "react";

export function useMusicPlayer():MusicPlayerContextProps{
    const context =  useContext<MusicPlayerContextProps>(MusicPlayerContext)
    return context
}

