import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { IPatientNote, PatientNote } from 'src/app/models/patient/patientNote.model';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotesComponent extends AppComponentBase {

  notes: IPatientNote[] = [];
  selectedNotes: IPatientNote[];
  noteDialog: boolean = false;
  note: IPatientNote;
  showRevokedRecords: boolean = false;
  revokedRecordCount:number = 0;

  constructor(
    injector: Injector
  ) {
    super(injector);

  }

  openNew() {
    this.note = new PatientNote();
    this.noteDialog = true;
  }

  saveNote() {
    this.note.Created = new Date();
    this.note.CreatedBy = "Kerem Özen";
    this.notes.push(this.note);
    this.success(this.l('::Message:SuccessfulSave', this.l('::Notes:NameSingular')));
    this.hideDialog();
  }

  hideDialog() {
    this.note = null;
    this.noteDialog = false;
  }

  revokeSelected() {
    if (this.selectedNotes.length > 0) {
      this.confirm({
        message: this.l('::Message:RevokeMultipleConfirmation'),
        header: this.l('::Confirm'),
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.notes = this.notes.filter(val => !this.selectedNotes.map(n => n.Id).includes(val.Id));
          this.success(this.l('::Message:SuccessfulMultipleRevokation', this.l('::Notes:NamePlural')));
        }
      });
    }
  }

  revokeNote(noteToBeRevoked: IPatientNote) {
    this.confirm({
      message: this.l('::Message:RevokeConfirmation'),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.notes = this.notes.filter(val => val.Id !== noteToBeRevoked.Id);
        this.success(this.l('::Message:SuccessfulRevokation', this.l('::Notes:NameSingular')));
      }
    });
  }
}
