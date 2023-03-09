import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class MessageHelperService {

    constructor(
        private messageService: MessageService
    ) {
    }

    success(detail: string, life: number = 3000) {
        debugger;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: detail, life: life });
    }


}