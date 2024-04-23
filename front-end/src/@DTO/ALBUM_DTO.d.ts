interface ALBUM_DTO {
    id: string;
    name: string;
    photo: string;
    description: string | null;
    artistsOwner: ARTIST_DTO[],
    musics: MUSIC_DTO[]
}
