import { deserializeAbel, deserialize } from '../deserialisation';
import { Image } from './image';

@deserializeAbel
export class Images {

    constructor(json?: any) {
        if (json) {
            this.low_resulution = new Image(json.low_resulution);
            this.thumbnail = new Image(json.thumbnail);
            this.standard_resolution = new Image(json.standard_resolution);
        }
    }

    @deserialize()
    low_resulution: Image;

    @deserialize()
    thumbnail: Image;

    @deserialize()
    standard_resolution: Image;
}