import { deserializeAbel, deserialize } from '../deserialisation';

@deserializeAbel
export class Count {
    constructor(json?: any) {
        if (json) {
            this.count = json.count;
        }
    }

    @deserialize()
    count: number;
}