import { Component, OnInit } from '@angular/core';

import { ModalService } from './modal.service';
import { ModalInfo } from './modal-info';

@Component({
    selector: 'modal',
    moduleId: "" + module.id,
    template: `
        <modal-single *ngFor="let modal of modals; let i = index" [modal]="modal" [index]="i"></modal-single>
    `
})
export class Modal implements OnInit {
    constructor(
        private modalService: ModalService
    ) {
        this.modals = new Array<any>();
    }

    modals: ModalInfo[];

    ngOnInit(): void {
        this.modalService.subscribe(x => this.modals.push(x));
    }
}