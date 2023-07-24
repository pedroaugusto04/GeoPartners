import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Partner } from '../model/partner';
import { TableBestPartnersService } from './services/table-best-partners.service';
import { TableService } from './services/table.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeometriesDTO } from '../model/geometries-dto';


@Component({
  selector: 'app-table-partners',
  templateUrl: './table-partners.component.html',
  styleUrls: ['./table-partners.component.scss']
})


export class TablePartnersComponent implements OnInit {

  @Input() title?: string;
  @Input() displayedColumns?: string[];
  @Input() tableType?: string; // default / best_partners_table
  partners!: Observable<Partner[]>;
  form: FormGroup;
  tableServiceMode: any;

  constructor(private tableService: TableService, private tableBestPartnersService: TableBestPartnersService, private formBuilder: FormBuilder
    , private router: Router, private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      tradingName: ['']
    })
  }

  ngOnInit() {
    if (this.tableType === 'default') {
      this.tableServiceMode = this.tableService;
      this.partners = this.tableServiceMode.getAll();
    } else if (this.tableType === 'best_partners_table') {
      this.tableServiceMode = this.tableBestPartnersService;
    }
  }

  filterByName(form: FormGroup) {
    this.partners = this.tableServiceMode.filterByName(form);
  }


  onEdit(id: string) {
    this.router.navigate(['update', id], { relativeTo: this.route });
  }

  onDelete(id: string) {
    this.partners = this.tableServiceMode.onDelete(id, this.partners);
  }

  getBestPartners(record: GeometriesDTO): Observable<Partner[]> {
    const bestPartners: Observable<Partner[]> = this.tableServiceMode.getBestPartners(record);
    this.partners = bestPartners;
    return this.partners;
  }
}
