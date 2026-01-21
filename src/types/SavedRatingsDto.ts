import type {AlbumDto} from "./AlbumDto.ts";

export interface SavedRatingsDto {
    album: AlbumDto;
    score: number;
}