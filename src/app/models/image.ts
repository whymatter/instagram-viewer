import { deserializeAbel, deserialize } from '../deserialisation';

@deserializeAbel
export class Image {

    constructor(json?: any) {
        if (json) {
            this.url = json.url;
            this.width = json.width;
            this.height = json.height;
        }
    }

    @deserialize()
    url: String;

    @deserialize()
    width: number;

    @deserialize()
    height: number;
}