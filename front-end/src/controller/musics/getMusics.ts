import { api } from "@/service/axios";

type getMusicsProps = BaseQueryParams & {
    search?: string;
}

type MusicsResponse = {
    musics: MUSIC_DTO[];
}

export async function fetchMusics({ search, ...rest }: getMusicsProps): Promise<MUSIC_DTO[]> {
    const musicResponse = await api.get<MusicsResponse>(`/musics`, {
        params: search
            ? {
                  search,
                  ...rest
              }
            : {
                  ...rest
              },
    });

    const { musics } = musicResponse.data;

    if(musics.length === 0) {
        return [];
    }

    return musics
}