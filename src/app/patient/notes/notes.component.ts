import { Component, Injector } from '@angular/core';
import { INote } from 'src/app/models/patient/note.model';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent extends AppComponentBase {

  notes: INote[] = [];
  selectedNotes: INote[];

  constructor(
    injector: Injector
  ) {
    super(injector);

  }
}
