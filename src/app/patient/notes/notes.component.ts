import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { INote, Note } from 'src/app/models/patient/note.model';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotesComponent extends AppComponentBase {

  notes: INote[] = [];
  selectedNotes: INote[];
  noteDialog: boolean = false;
  note: INote;

  constructor(
    injector: Injector
  ) {
    super(injector);

  }

  openNew() {
    this.note = new Note();
    this.noteDialog = true;
  }
}
