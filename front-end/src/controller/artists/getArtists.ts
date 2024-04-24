import { api } from "@/service/axios";

type fetchArtistProps = BaseQueryParams & {
    search?: string;
};

type ArtistsResponse = {
    artists: ARTIST_DTO[];
};

export async function fetchArtists({ search, ...rest }: fetchArtistProps): Promise<ARTIST_DTO[]> {
    const artistResponse = await api.get<ArtistsResponse>(`/artists`, {
        params: search? {
                  search,
                  ...rest
            }
            : {
                  ...rest,
              },
    });

    const { artists } = artistResponse.data

    if(artists.length === 0) {
        return [];
    }

    return artists
}


