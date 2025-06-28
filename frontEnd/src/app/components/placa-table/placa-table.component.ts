import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { IPlaca} from '../placas/placas.model';


@Component({
  selector: 'app-placa-table',
  imports: [CommonModule, IconFieldModule, InputIconModule, FloatLabelModule, FormsModule, NgbPaginationModule ],
  templateUrl: './placa-table.component.html',
  styleUrl: './placa-table.component.scss',
  standalone: true
})
export class PlacaTableComponent {
  @Input() placas: IPlaca[] = [];
  @Output() editar = new EventEmitter<IPlaca>();
  @Output() excluir = new EventEmitter<IPlaca>();
  @Output() nova = new EventEmitter<void>();

  filtro: string = '';
  page = 1;
  itensPorPagina = 6;
  

  get placasFiltradas(): IPlaca[] {
    if (!this.filtro.trim()) {
      return this.placas;
    }
  
    const texto = this.filtro.toLowerCase();
  
    return this.placas.filter(item =>
      item.number.toLowerCase().includes(texto) 
    );
  }
  

  get placasPaginadas(): IPlaca[] {
    const start = (this.page - 1) * this.itensPorPagina;
    return this.placasFiltradas.slice(start, start + this.itensPorPagina);
  }
  

  editarPlaca(item: IPlaca) {
    this.editar.emit(item);
  }

  excluirPlaca(item: IPlaca) {
    this.excluir.emit(item);
  }

  get itensFantasmos(): any[] {
    const totalPaginas = Math.ceil(this.placasFiltradas.length / this.itensPorPagina);
    const estaNaUltimaPagina = this.page === totalPaginas;

    if (!estaNaUltimaPagina) return [];

    const faltando = this.itensPorPagina - this.placasPaginadas.length;
    return Array(faltando).fill(null);
  }
}
