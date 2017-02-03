import { User } from './user';
import { Position } from './position';

import { deserializeAbel, deserialize } from '../deserialisation';

@deserializeAbel
export class UserInPhoto {

    constructor(json?: any) {
        if (json) {
            this.user = new User(json.user);
            this.position = new Position(json.position);
        }
    }

    @deserialize()
    user: User;

    @deserialize()
    position: Position;
}

// console.log("UserInPhoto.prototype: %o", UserInPhoto.prototype);
// let usr = new UserInPhoto();
// (usr as any)._deserialize({ ar: ["test1", "test2"], ar2: [{ x: 54, y: 99 }, { x: 53, y: 11 }, { x: 56, y: 22 }], user: { id: "newUserId", username: "oliver", counts: { media: 55 } }, position: { x: 54, y: 11 }, tmp: "dddd" });
// console.log(usr);
// console.log(usr instanceof UserInPhoto);