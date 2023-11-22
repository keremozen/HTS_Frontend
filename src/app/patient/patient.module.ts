import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PatientComponent } from './patient/patient.component';
import { NotesComponent } from './notes/notes.component';
import { DocumentsComponent } from './documents/documents.component';
import { TreatmentProcessesComponent } from './treatment-processes/treatment-processes.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CompanionInfoComponent } from './treatment-processes/companion-info/companion-info.component';
import { HospitalConsultationComponent } from './treatment-processes/hospital-consultation/hospital-consultation.component';
import { OperationalInfoComponent } from './treatment-processes/operational-info/operational-info.component';
import { QuotationComponent } from './treatment-processes/quotation/quotation.component';
import { OperationComponent } from './treatment-processes/operation/operation.component';
import { ProformaComponent } from './treatment-processes/proforma/proforma.component';
import { PaymentDialogComponent } from './treatment-processes/payment-dialog/payment-dialog.component';
import { PaymentListComponent } from './treatment-processes/payment-list/payment-list.component';
import { CreateENabizProformaComponent } from './treatment-processes/create-enabiz-proforma/create-enabiz-proforma.component';


@NgModule({
  declarations: [
    PatientListComponent,
    PatientComponent,
    NewPatientComponent,
    NotesComponent,
    DocumentsComponent,
    TreatmentProcessesComponent,
    CompanionInfoComponent,
    HospitalConsultationComponent,
    OperationalInfoComponent,
    QuotationComponent,
    OperationComponent,
    ProformaComponent,
    PaymentDialogComponent,
    PaymentListComponent,
    CreateENabizProformaComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    PatientRoutingModule
    
  ],
  providers: [
    DialogService
  ]
})
export class PatientModule { }
