import { deserializeAbel, deserialize } from '../deserialisation';

@deserializeAbel
export class Location {

    constructor(json?: any) {
        if (json) {
            this.id = json.id;
            this.latitude = json.latitude;
            this.longitude = json.longitude;
            this.name = json.name;
        }
    }

    @deserialize()
    id: String;

    @deserialize()
    latitude: number;

    @deserialize()
    longitude: number;

    @deserialize()
    name: String;
}