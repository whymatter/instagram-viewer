import { deserializeAbel, deserialize } from '../deserialisation';

@deserializeAbel
export class UserFromSearch {
    @deserialize()
    id: String;

    @deserialize()
    username: String;

    @deserialize()
    first_name: String;

    @deserialize()
    last_name: String;

    @deserialize()
    profile_picture: String;

    get full_name() {
        return `${this.first_name} ${this.last_name}`;
    }
}