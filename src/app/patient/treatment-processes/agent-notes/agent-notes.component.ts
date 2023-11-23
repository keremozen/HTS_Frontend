import { NG_BOOTSTRAP_CONFIG_PROVIDERS } from '@abp/ng.theme.shared';
import { Component, EventEmitter, Injector, Input, Output, ViewEncapsulation } from '@angular/core';
import { HospitalAgentNoteDto, SaveHospitalAgentNoteDto } from '@proxy/dto/hospital-agent-note';
import { EntityEnum_HospitalAgentNoteStatusEnum } from '@proxy/enum';
import { HospitalAgentNoteService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-agent-notes',
  templateUrl: './agent-notes.component.html',
  styleUrls: ['./agent-notes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgentNotesComponent extends AppComponentBase {

  @Input() readonly: boolean = false;
  @Input() hospitalResponseId: number;
  @Output() onNoteAdded: EventEmitter<any> = new EventEmitter();
  isCommitDbOnSave: boolean = false;
  allNotes: HospitalAgentNoteDto[] = [];
  notesToBeDisplayed: HospitalAgentNoteDto[] = [];
  selectedNotes: HospitalAgentNoteDto[];
  noteDialog: boolean = false;
  note: SaveHospitalAgentNoteDto;
  showRevokedRecords: boolean = false;
  revokedRecordCount: number = 0;
  loading: boolean;
  totalRecords: number;
  public agentNoteStatusEnum = EntityEnum_HospitalAgentNoteStatusEnum;
  isAllowedToManage: boolean = false;

  constructor(
    injector: Injector,
    private agentNoteService: HospitalAgentNoteService
  ) {
    super(injector);
   
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    if (this.hospitalResponseId) {
      this.isAllowedToManage = this.permission.getGrantedPolicy("HTS.HospitalConsultation") ||
      this.permission.getGrantedPolicy("HTS.ProformaManagement") ||
      this.permission.getGrantedPolicy("HTS.MFBApproval");
      this.isCommitDbOnSave = true;
      this.loading = true;
      this.agentNoteService.getList(this.hospitalResponseId).subscribe({
        next: (notes) => {
          this.allNotes = notes.items;
          this.revokedRecordCount = notes.items.filter(n => n.statusId === this.agentNoteStatusEnum.Revoked).length;
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
    else {
      this.isAllowedToManage = true;
      this.isCommitDbOnSave = false;
      this.allNotes = [];
      this.revokedRecordCount = 0;
      this.notesToBeDisplayed = [];
      this.totalRecords = 0;
    }
  }

  manageNotesToBeDisplayed() {
    if (!this.showRevokedRecords) {
      this.notesToBeDisplayed = [...this.allNotes.filter(n => n.statusId !== this.agentNoteStatusEnum.Revoked)];
    }
    else {
      this.notesToBeDisplayed = [...this.allNotes];
    }
    this.totalRecords = this.notesToBeDisplayed.length;
  }

  openNew() {
    this.note = {} as SaveHospitalAgentNoteDto;
    this.noteDialog = true;
  }

  saveNote() {
    if (this.isCommitDbOnSave) {
      this.note.hospitalResponseId = this.hospitalResponseId;
      this.agentNoteService.create(this.note).subscribe({
        complete: () => {
          this.fetchData();
          this.success(this.l('::Message:SuccessfulSave', this.l('::HospitalAgentNotes:NameSingular')));
          this.hideDialog();
        }
      });
    }
    else {
      this.allNotes.push(this.note as HospitalAgentNoteDto);
      this.addIdsToNotes();
      this.revokedRecordCount = this.allNotes.filter(n => n.statusId === this.agentNoteStatusEnum.Revoked).length;
      this.manageNotesToBeDisplayed();
      this.onNoteAdded.emit(this.allNotes);
      this.hideDialog();
    }
  }

  addIdsToNotes() {
    let id = 1;
    this.allNotes.forEach(note => {
      note.creator = id;
      id++;
    });
  }

  revokeNote(noteToBeRevoked: HospitalAgentNoteDto) {
    this.confirm({
      key: 'noteConfirm',
      message: this.l('::Message:RevokeConfirmation'),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.isCommitDbOnSave) {
          this.agentNoteService.updateStatusByIdAndStatusId(+noteToBeRevoked.id, this.agentNoteStatusEnum.Revoked).subscribe({
            complete: () => {
              this.fetchData();
              this.success(this.l('::Message:SuccessfulRevokation', this.l('::HospitalAgentNotes:NameSingular')));
            }
          });
        }
        else {
          this.allNotes = this.allNotes.filter(n => n.creator != noteToBeRevoked.creator);
          this.revokedRecordCount = this.allNotes.filter(n => n.statusId === this.agentNoteStatusEnum.Revoked).length;
          this.manageNotesToBeDisplayed();
          this.onNoteAdded.emit(this.allNotes);
        }
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
