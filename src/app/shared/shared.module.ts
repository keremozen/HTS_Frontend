import { CoreModule } from '@abp/ng.core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { FormsModule } from '@angular/forms';

/* PrimeNg Modules */
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { CheckboxModule } from 'primeng/checkbox';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { ListboxModule } from 'primeng/listbox';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ChipModule} from 'primeng/chip';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';

/**************/

@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    FormsModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    DynamicDialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    InputMaskModule,
    ConfirmDialogModule,
    InputTextareaModule,
    AccordionModule,
    FieldsetModule,
    CardModule,
    MenubarModule,
    CheckboxModule,
    TabMenuModule,
    TabViewModule,
    ListboxModule,
    MessagesModule,
    MessageModule,
    TagModule,
    ChartModule,
    ChipModule,
    DataViewModule
  ],
  exports: [
    CoreModule,
    FormsModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    DynamicDialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    InputMaskModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    InputMaskModule,
    ConfirmDialogModule,
    InputTextareaModule,
    AccordionModule,
    FieldsetModule,
    CardModule,
    MenubarModule,
    CheckboxModule,
    TabMenuModule,
    TabViewModule,
    ListboxModule,
    MessagesModule,
    MessageModule,
    TagModule,
    ChartModule,
    ChipModule,
    DataViewModule,
    DataViewLayoutOptions
  ],
  providers: [ConfirmationService, MessageService]
})
export class SharedModule { }
