import { deserializeAbel, deserialize } from '../deserialisation';

@deserializeAbel
export class Counts {

    constructor(json?: any) {
        if (json) {
            this.media = json.media;
            this.follows = json.follows;
            this.followed_by = json.followed_by;
        }
    }

    @deserialize()
    media: number;

    @deserialize()
    follows: number;

    @deserialize()
    followed_by: number;
}