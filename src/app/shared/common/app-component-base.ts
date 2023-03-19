import { LocalizationService } from "@abp/ng.core";
import { ThemeSharedTestingModule } from "@abp/ng.theme.shared/testing";
import { Directive, Injector } from "@angular/core";
import { Confirmation, ConfirmationService, MessageService } from "primeng/api";

@Directive()
export abstract class AppComponentBase  {
    _injector: Injector;
    localization: LocalizationService;
    confirmation: ConfirmationService;
    message: MessageService;

    protected constructor(
        injector: Injector
    ) {
        this._injector = injector;
        this.localization = injector.get(LocalizationService);
        this.confirmation= injector.get(ConfirmationService);
        this.message = injector.get(MessageService);
    }

    /*l(key: string): string {
       return this.localization.instant(key);
    }*/
    
    l(key: string, ...args: string[]): string {
        return this.localization.instant(key, ...args);
    }

    confirm(confirmation: Confirmation) {
        this.confirmation.confirm(confirmation);
    }

    success(detail: string,title?: string,  life?: number) {
        if (!title) {
            title = this.l("::ToastTitle:Successful");
        }
        if (!life) {
            life = 3000;
        }
        this.message.add({ severity: 'success', summary: title, detail: detail, life: life });
    }

    error(detail: string,title?: string,  life?: number) {
        if (!title) {
            title = this.l("::ToastTitle:Error");
        }
        if (!life) {
            life = 3000;
        }
        this.message.add({ severity: 'error', summary: title, detail: detail, life: life });
    }

    info(detail: string,title?: string,  life?: number) {
        if (!title) {
            title = this.l("::ToastTitle:Info");
        }
        if (!life) {
            life = 3000;
        }
        this.message.add({ severity: 'info', summary: title, detail: detail, life: life });
    }

}