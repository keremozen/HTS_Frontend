import { ABP, PermissionService, RoutesService, TreeNode } from '@abp/ng.core';
import { Component, Injector, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';
import { PrimeApplicationLayoutComponent } from '../prime-application-layout/prime-application-layout.component';
import { CommonService } from 'src/app/services/common.service';
import { HTSTaskDto } from '@proxy/dto/htstask';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent extends AppComponentBase implements OnInit {

    items: MenuItem[] = [];
    taskList: HTSTaskDto[] = [];

    constructor(
        injector: Injector,
        public app: PrimeApplicationLayoutComponent,
        public routes: RoutesService,
        public commonService: CommonService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.commonService.taskList.subscribe({
            next: (resTaskList) => {
                this.taskList = resTaskList;
                this.routes.tree$.subscribe(res => {
                    this.items = [];
                    res.forEach(route => {
                        let menuItem = this.convertRouteToMenuItem(route);
                        if (menuItem) {
                            menuItem.visible = menuItem.visible && (menuItem.items?.filter(m=>m.visible).length > 0 || route.path != undefined); 
                            this.items.push(menuItem);
                        }
                    });
                });
            }
        });
        
    }

    convertRouteToMenuItem(route: TreeNode<ABP.Route>): MenuItem {
        let menuItem: MenuItem;
        if (!route.invisible) {
            menuItem = {};
            if (route.path === '/tasks' && this.taskList.length > 0) {
                menuItem.badge = this.taskList.length.toString();
            }
            menuItem.label = this.l(route.name);
            menuItem.icon = route.iconClass;
            menuItem.routerLink = route.path;
            menuItem.routerLinkActiveOptions = { exact: true };
            menuItem.visible = !route.requiredPolicy || (route.requiredPolicy && this.permission.getGrantedPolicy(route.requiredPolicy));
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
