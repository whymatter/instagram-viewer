import { deserializeAbel, deserialize } from '../deserialisation';
import { User } from './user';

@deserializeAbel
export class Caption {

    constructor(json?: any) {
        if (json) {
            this.created_time = json.created_time;
            this.text = json.text;
            this.from = new User(json.from);
            this.id = json.id;
        }
    }

    @deserialize()
    created_time: string;

    @deserialize()
    text: string;

    @deserialize()
    from: User;

    @deserialize()
    id: string;
}