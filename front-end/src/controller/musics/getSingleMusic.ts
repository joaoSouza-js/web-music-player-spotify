import { api } from "@/service/axios"

type getSingleMusicProps = {
    id: string
}

type MusicResponse = {
    music: MUSIC_DTO
}

export async function fetchSingleMusic({ id }: getSingleMusicProps): Promise<MUSIC_DTO> {
    const musicResponse = await api.get<MusicResponse>(`/musics/${id}`)
    const {music} = musicResponse.data
    return music
}