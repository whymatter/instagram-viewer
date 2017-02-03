import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ModalInfo } from './modal-info';

export class ModalService {

    newModals: Subject<ModalInfo>;

    constructor() {
        this.newModals = new Subject<ModalInfo>();
    }

    create(component: any, title?: string, data?: any) {
        this.newModals.next(new ModalInfo(component, title, data));
    }

    subscribe(func: (next: ModalInfo) => void): any {
        this.newModals.subscribe(func);
    }
}