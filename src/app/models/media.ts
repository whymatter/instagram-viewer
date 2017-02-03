import { Location } from './location';
import { Image } from './image';
import { User } from './user';
import { UserInPhoto } from './user-in-photo';
import { Count } from './count';
import { Caption } from './caption';
import { Images } from './images';
import { deserializeAbel, deserialize } from '../deserialisation';

@deserializeAbel
export class Media {

    constructor(json?: any) {
        if (json) {
            this.id = json.id;
            this.user = new User(json.user);
            this.location = new Location(json.location);
            this.user_has_liked = json.user_has_liked;
            this.comments = new Count(json.comments);
            this.caption = new Caption(json.caption);
            this.link = json.link;
            this.likes = new Count(json.likes);
            this.created_time = json.created_time;
            this.images = new Images(json.images);
            this.type = json.type;
            this.users_in_photo = (json.users_in_photo as any[]).map(x => new UserInPhoto(x));
            this.filter = json.filter;
            this.tags = json.tags;
        }
    }

    @deserialize()
    id: String;

    @deserialize()
    user: User;

    @deserialize()
    location: Location;

    @deserialize()
    user_has_liked: boolean;

    @deserialize()
    comments: Count;

    caption: Caption;

    @deserialize()
    link: String;

    @deserialize()
    likes: Count;

    @deserialize()
    created_time: String;

    @deserialize()
    images: Images;

    @deserialize()
    type: String;

    @deserialize({ deserialize: true, arrayType: UserInPhoto })
    users_in_photo: UserInPhoto[];

    @deserialize()
    filter: String;

    @deserialize({ deserialize: true, arrayType: String })
    tags: String[];
}