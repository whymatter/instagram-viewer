import { deserializeAbel, deserialize } from '../deserialisation';

@deserializeAbel
export class TagFromSearch {
    @deserialize()
    media_count: number;

    @deserialize()
    name: string;
}