import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, ComponentRef } from '@angular/core';

import { ModalInfo } from './modal-info';
import { FeedItemDetail } from './feed-item-detail.component';

@Component({
    selector: 'modal-single',
    moduleId: "" + module.id,
    templateUrl: 'modal-single.component.html'
})
export class ModalSingle implements OnInit, OnDestroy {

    @Input() modal: ModalInfo;
    @Input() index: number;

    private componentRef: ComponentRef<{}>

    @ViewChild('content', { read: ViewContainerRef }) content: ViewContainerRef;

    constructor(
        private resolver: ComponentFactoryResolver
    ) { }

    ngOnInit(): void {
        let componentFactory = this.resolver.resolveComponentFactory(this.modal.component);

        let providers = Object.keys(this.modal.data || {}).map(x => { return { provide: x, useValue: this.modal.data[x] }; });
        let injectors = ReflectiveInjector.resolve(providers);

        let componentInjector = ReflectiveInjector.fromResolvedProviders(injectors, this.content.injector);

        this.componentRef = componentFactory.create(componentInjector);

        this.content.insert(this.componentRef.hostView);
    }

    ngOnDestroy(): void {
        this.componentRef.destroy();
    }

}