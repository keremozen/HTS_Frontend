import { LocalizationService } from "@abp/ng.core";
import { Directive, Injector } from "@angular/core";
import { Confirmation, ConfirmationService } from "primeng/api";
import { MessageHelperService } from "../helpers/message-helper";

@Directive()
export abstract class AppComponentBase  {
    _injector: Injector;
    localization: LocalizationService;
    confirmation: ConfirmationService;
    //message: MessageHelperService;

    protected constructor(
        injector: Injector
    ) {
        this._injector = injector;
        this.localization = injector.get(LocalizationService);
        this.confirmation= injector.get(ConfirmationService);
        //this.message = injector.get(MessageHelperService);
    }

    /*l(key: string): string {
       return this.localization.instant(key);
    }*/
    
    l(key: string, ...args: string[]): string {
        debugger;
        return this.localization.instant(key, ...args);
    }

    confirm(confirmation: Confirmation) {
        this.confirmation.confirm(confirmation);
    }

}