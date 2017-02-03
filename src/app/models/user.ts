import { deserializeAbel, deserialize } from '../deserialisation';
import { Counts } from './counts';

@deserializeAbel
export class User {

    constructor(json?: any) {
        if (json) {
            this.id = json.id;
            this.username = json.username;
            this.full_name = json.full_name;
            this.profile_picture = json.profile_picture;
            this.bio = json.bio;
            this.website = json.website;
            this.counts = new Counts(json.counts);
        }
    }

    @deserialize()
    id: string;

    @deserialize()
    username: string;

    @deserialize()
    full_name: string;

    @deserialize()
    profile_picture: string;

    @deserialize()
    bio: string;

    @deserialize()
    website: string;

    @deserialize()
    counts: Counts;
}