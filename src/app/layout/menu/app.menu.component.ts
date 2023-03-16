import { ABP, RoutesService, TreeNode } from '@abp/ng.core';
import { Component, Injector, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';
import { PrimeApplicationLayoutComponent } from '../prime-application-layout/prime-application-layout.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent extends AppComponentBase implements OnInit {

    items: MenuItem[] = [];

    constructor(
        injector: Injector,
        public app: PrimeApplicationLayoutComponent,
        public routes: RoutesService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.items = [];
        this.routes.tree$.subscribe(res => {
            res.forEach(route => {
                let menuItem = this.convertRouteToMenuItem(route);
                if (menuItem) {
                    this.items.push(menuItem);
                }
            });
        });
    }

    convertRouteToMenuItem(route: TreeNode<ABP.Route>): MenuItem {
        let menuItem: MenuItem;
        if (!route.invisible) {
            menuItem = {};
            menuItem.label = this.l(route.name);
            menuItem.icon = route.iconClass;
            menuItem.routerLink = route.path;
            menuItem.routerLinkActiveOptions = {exact: true};
            if (route.children && route.children.length > 0) {
                menuItem.items = [];
                route.children.forEach(childRoute => {
                    let childMenuItem = this.convertRouteToMenuItem(childRoute);
                    if (childMenuItem) {
                        menuItem.items.push(childMenuItem);
                    }
                });
            }
        }
        return menuItem;
    }
}
