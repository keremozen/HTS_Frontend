import { Component, EventEmitter, Injector, Input, Output, ViewEncapsulation } from '@angular/core';
import { ProformaDto, ProformaPricingListDto } from '@proxy/dto/proforma';
import { EntityEnum_ProformaStatusEnum } from '@proxy/enum';
import { ProformaService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuotationComponent extends AppComponentBase {

  @Input() patientTreatmentId: number;
  proformaList: ProformaPricingListDto[] = [];
  loading: boolean = false;
  public proformaStatusEnum = EntityEnum_ProformaStatusEnum;
  @Output() onQuotationChange: EventEmitter<any> = new EventEmitter();

  constructor(
    injector: Injector,
    private proformaService: ProformaService
  ) {
    super(injector);

  }

  ngOnInit(): void {

    this.fetchData();

  }

  fetchData() {
    this.proformaService.getPricingListByPTPId(this.patientTreatmentId).subscribe({
      next: (res) => {
        this.proformaList = res as ProformaPricingListDto[];
      }
    });
  }

  onSendToPatientClick(proforma: ProformaPricingListDto) {

  }

  onApproveClick(proforma: ProformaPricingListDto) {

    if (proforma.proformaStatusId == this.proformaStatusEnum.MFBWaitingApproval) {
      this.confirm({
        key: 'quotationConfirm',
        message: this.l('::Quotation:ProformaTable:Message:ConfirmApprove'),
        header: this.l('::Confirm'),
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.proformaService.approveMFB(+proforma.id).subscribe({
            complete: () => {
              this.fetchData();
              this.onQuotationChange.emit();
            }
          });
        }
      });
    }
    if (proforma.proformaStatusId == this.proformaStatusEnum.WaitingForPatientApproval) {
      this.confirm({
        key: 'quotationConfirm',
        message: this.l('::Quotation:ProformaTable:Message:ConfirmApprove'),
        header: this.l('::Confirm'),
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          /*this.proformaService.approvePatient(+proforma.id).subscribe({
            complete: () => {
              this.fetchData();
            }
          });*/
        }
      });
    }
  }

  onRejectClick(proforma: ProformaPricingListDto) {

  }

  onPaymentClick(proforma: ProformaPricingListDto) {



  }

  onProformaCodeClick(proforma: ProformaPricingListDto) {
    
  }


}
