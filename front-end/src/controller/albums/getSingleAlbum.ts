import { api } from "@/service/axios";

type getSingleAlbumProps = {
    id: string;
};

type AlbumResponse = {
    album: ALBUM_DTO;
};

export async function fetchSingleAlbum({
    id,
}: getSingleAlbumProps): Promise<ALBUM_DTO> {
    const albumResponse = await api.get<AlbumResponse>(`/albums/${id}`);
    const { album } = albumResponse.data;
    return album;
}
