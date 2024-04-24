import { api } from "@/service/axios";

type getAlbumsProps = BaseQueryParams & {
    search?: string;
};

type AlbumsResponse = {
    albums: ALBUM_DTO[];
};

export async function fetchAlbums({
    search,
    ...rest
}: getAlbumsProps): Promise<ALBUM_DTO[]> {
    const albumResponse = await api.get<AlbumsResponse>(`/albums`, {
        params: search
            ? {
                  search,
                  ...rest,
              }
            : {
                  ...rest,
              },
    });

    const { albums } = albumResponse.data;
    
    if(albums.length === 0) {
        return [];
    }

    return albums;
}
