import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentsComponent extends AppComponentBase {
  documents: any[] = [];
  selectedDocuments: any[];

  constructor(
    injector: Injector
  ) {
    super(injector);

  }

  openNew() {
    
  }
}
