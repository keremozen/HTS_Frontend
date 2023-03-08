import { LocalizationService } from "@abp/ng.core";
import { Directive, Injector } from "@angular/core";
import { Confirmation, ConfirmationService } from "primeng/api";

@Directive()
export abstract class AppComponentBase  {
    _injector: Injector;
    localization: LocalizationService;
    confirmation: ConfirmationService;

    protected constructor(
        injector: Injector

    ) {
        this._injector = injector;
        this.localization = injector.get(LocalizationService);
        this.confirmation= injector.get(ConfirmationService);
    }

    l(key: string): string {
        debugger;
       return this.localization.instant(key);
    }

    confirm(confirmation: Confirmation) {
        this.confirmation.confirm(confirmation);
    }

}