import type {RatingDto} from "./RatingDto.ts";

export default interface SaveRequest {
    ratings: RatingDto[];
}