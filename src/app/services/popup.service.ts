import { Injectable, ComponentFactoryResolver, Inject, ReflectiveInjector, ViewContainerRef, Type } from '@angular/core';
import { Idea } from '../models/idea';
import { RemoveIdeaPopupComponent } from '../components/popups/remove-idea-popup/remove-idea-popup.component';

@Injectable()
export class PopupService {
  factoryResolver: ComponentFactoryResolver;
  rootViewContainer: ViewContainerRef;

  constructor( @Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver;
  }

  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  addDynamicComponent(popup: Type<any>, okCallback: () => void, cancelCallback?: () => void) {
    const factory = this.factoryResolver.resolveComponentFactory(popup);
    const component = factory.create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(component.hostView);

    component.instance.okEmitter.subscribe(val => {
      component.destroy();
      okCallback();
    });
    component.instance.cancelEmitter.subscribe(val => {
      component.destroy();
      cancelCallback();
    });
  }

  removeIdeaPopup(idea: Idea, okCallback: () => void, cancelCallback: () => void = () => { }) {
    this.addDynamicComponent(RemoveIdeaPopupComponent, okCallback, cancelCallback);
  }
}
