import { Component, Injector } from '@angular/core';
import { BranchDto, SaveBranchDto } from '@proxy/dto/branch';
import { BranchService } from '@proxy/service/branch.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


@Component({
    selector: 'app-branch',
    templateUrl: './branch.component.html',
    styleUrls: ['./branch.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class BranchComponent extends AppComponentBase {

    branchDialog: boolean;
    branchList: BranchDto[];
    branch: SaveBranchDto;
    isEdit: boolean;
    branchToBeEdited: BranchDto;
    loading: boolean;
    totalRecords: number = 0;

    constructor(
        injector: Injector,
        private branchService: BranchService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.branchService.getList().subscribe({
          next: data => {
            this.branchList = data.items;
            this.totalRecords = data.totalCount;
          },
          error: () => {
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          }
        });
    }

    openNewBranch() {
        this.isEdit = false;
        this.branch = {} as SaveBranchDto;
        this.branch.isActive = true;
        this.branchDialog = true;
    }


    editBranch(branch: BranchDto) {
        this.isEdit = true;
        this.branchToBeEdited = branch;
        this.branch = { ...branch as SaveBranchDto };
        this.branchDialog = true;
    }


    deleteBranch(branch: BranchDto) {
        this.confirm({
            message: this.l('::Message:DeleteConfirmation', branch.name),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.branchService.delete(branch.id).subscribe({
                    complete: () => {
                        this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:Branch:Name')));
                        this.fetchData();
                        this.hideDialog();
                    }
                });
            }
        });
    }

    saveBranch() {
        if (!this.isEdit) {
            this.branchService.create(this.branch).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:Branch:Name')));
                }
            });
        }
        else {
            this.branchService.update(this.branchToBeEdited.id, this.branch).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:Branch:Name')));
                }
            });
        }
    }

    hideDialog() {
        this.branch = null;
        this.branchToBeEdited = null;
        this.branchDialog = false;
    }

}
