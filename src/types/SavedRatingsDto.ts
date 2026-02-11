import type {AlbumDto} from "./AlbumDto.ts";

export interface SavedRatingsDto {
    album: AlbumDto;
    displayName: string;
    score: number;
}