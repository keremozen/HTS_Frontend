import { Component, Injector, Input, ViewEncapsulation } from '@angular/core';
import { Patient } from '@proxy/dto';
import { PatientNoteDto, SavePatientNoteDto } from '@proxy/dto/patient-note';
import { EntityEnum_PatientNoteStatusEnum } from '@proxy/enum';
import { PatientNoteService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotesComponent extends AppComponentBase {

  @Input() patientId: number;
  allNotes: PatientNoteDto[] = [];
  notesToBeDisplayed: PatientNoteDto[] = [];
  selectedNotes: PatientNoteDto[];
  noteDialog: boolean = false;
  note: SavePatientNoteDto;
  showRevokedRecords: boolean = false;
  revokedRecordCount: number = 0;
  loading: boolean;
  totalRecords: number;
  public patientNoteStatusEnum = EntityEnum_PatientNoteStatusEnum;

  constructor(
    injector: Injector,
    private patientNoteService: PatientNoteService
  ) {
    super(injector);

  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    if (this.patientId) {
      this.patientNoteService.getList(this.patientId).subscribe({
        next: (notes) => {
          this.allNotes = notes.items;
          this.revokedRecordCount = notes.items.filter(n => n.patientNoteStatusId === this.patientNoteStatusEnum.Revoked).length;
          this.manageNotesToBeDisplayed();
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  manageNotesToBeDisplayed() {
    if (!this.showRevokedRecords) {
      this.notesToBeDisplayed = [...this.allNotes.filter(n => n.patientNoteStatusId !== EntityEnum_PatientNoteStatusEnum.Revoked)];
    }
    else {
      this.notesToBeDisplayed = [...this.allNotes];
    }
    this.totalRecords = this.notesToBeDisplayed.length;
  }

  openNew() {
    this.note = {} as SavePatientNoteDto;
    this.noteDialog = true;
  }

  saveNote() {
    this.note.patientId = this.patientId;
    this.patientNoteService.create(this.note).subscribe({
      complete: () => {
        this.fetchData();
        this.success(this.l('::Message:SuccessfulSave', this.l('::Notes:NameSingular')));
        this.hideDialog();
      }
    });
  }

  revokeNote(noteToBeRevoked: PatientNoteDto) {
    this.confirm({
      key: 'noteConfirm',
      message: this.l('::Message:RevokeConfirmation'),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patientNoteService.updateStatusByIdAndStatusId(+noteToBeRevoked.id, EntityEnum_PatientNoteStatusEnum.Revoked).subscribe({
          complete: () => {
            this.fetchData();
            this.success(this.l('::Message:SuccessfulRevokation', this.l('::Notes:NameSingular')));
          }
        });
      }
    });
  }

  onShowRevokedRecords() {
    this.manageNotesToBeDisplayed();
  }


  hideDialog() {
    this.note = null;
    this.noteDialog = false;
  }
}
