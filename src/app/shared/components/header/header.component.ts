import { Component, inject, OnInit } from '@angular/core';

import { HeaderService } from './header.service';
import { IStatisticsData } from './header.interface';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'header-component',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {
  private service = inject(HeaderService);
  private toast = inject(ToastrService);

  statisticsData: IStatisticsData = {
    quantPessoasDesaparecidas: 0,
    quantPessoasEncontradas: 0
  }

  ngOnInit() {
    this.getMissingPersonList();
  }

  getMissingPersonList() {
    this.service.getStatisticsData().subscribe({
      next: res => {
        this.statisticsData = res;
      },
      error: err =>
        this.toast.error('Erro ao buscar dados: ' + err.message),
    });
  }
}
