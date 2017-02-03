import { deserializeAbel, deserialize } from '../deserialisation';

@deserializeAbel
export class Position {

    constructor(json?: any) {
        if (json) {
            this.x = json.x;
            this.y = json.y;
        }
    }

    @deserialize()
    x: number;

    @deserialize()
    y: number;
}