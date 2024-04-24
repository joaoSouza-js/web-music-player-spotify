import { api } from "@/service/axios"

type fetchArtistSongsProps = & BaseQueryParams & {
    id: string
} 

type fetchArtistSongsResponse = {
    musics: MUSIC_DTO[]
}

export async function fetchArtistSongs({ id, ...rest }: fetchArtistSongsProps): Promise<MUSIC_DTO[]> {

    const musicResponse = await api.get<fetchArtistSongsResponse>(`/artists/${id}/songs`, {
        params: rest
    })

    const { musics } = musicResponse.data

    if(musics.length === 0) {
        return []
    }

    return musics

}
