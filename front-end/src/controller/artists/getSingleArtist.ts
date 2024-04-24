import { api } from "@/service/axios";

type fetchSingleArtistProps =  {
    id: string
}

type ArtistResponse = {
    artist: ARTIST_DTO
}

export async function fetchSingleArtist({ id }: fetchSingleArtistProps): Promise<ARTIST_DTO> {

    const artistResponse = await api.get<ArtistResponse>(`/artists/${id}`)
    const {artist} = artistResponse.data

    return artist
}

