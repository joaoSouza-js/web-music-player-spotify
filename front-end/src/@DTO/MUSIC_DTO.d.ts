interface MUSIC_DTO {
    name: string;
    id: string;
    photo: string;
    url: string;
    artists: ARTIST_DTO[] | null
}
