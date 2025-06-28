import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { PlacaTableComponent } from '../placa-table/placa-table.component';
import { PlacaModalComponent } from '../placa-modal/placa-modal.component';
import { ICargos, IPlaca, IPlacaCreate } from './placas.model';
import { PlacaService } from '../../service/placa/placa.service';

@Component({
  selector: 'app-placas',
  imports: [CommonModule, PlacaTableComponent, PlacaModalComponent],
  templateUrl: './placas.component.html',
  styleUrl: './placas.component.scss',
  standalone: true
})
export class PlacasComponent implements OnInit {
  placas: IPlaca[] = [];
  placaSelecionada: IPlaca | null = null;

  mostrarConfirmacao: boolean = false;
  placaParaExcluir: IPlaca | null = null;

  constructor(private placaService: PlacaService) { }

  ngOnInit() {
    this.carregarPlacas();
  }

  carregarPlacas() {
    this.placaService.getAll().subscribe({
      next: (dados: any[]) => {
        this.placas = dados.map(item => ({
          id: item.placa.id,
          number: item.placa.number,
          motorista: item.placa.motorista,
          cargo: item.placa.cargo,
          funcao_cargo: item.placa.funcao_cargo,
          modelo_veiculo: item.placa.modelo_veiculo,
          cor_veiculo: item.placa.cor_veiculo,
          permitido: !!item.entrada.permitido,
          data_entrada: item.entrada.data_entrada
        }));
        console.log('Placas transformadas:', this.placas);
      },
      error: (erro) => {
        console.error('Erro ao carregar placas:', erro);
      }
    });
  }
  

  novaPlaca() {
    this.placaSelecionada = {

      id: 0,
      number: '',
      motorista: '',
      cargo: ICargos.VISITANTE,
      funcao_cargo: '',
      modelo_veiculo: '',
      cor_veiculo: '',
      permitido: true

    };
  }

  editarPlaca(item: IPlaca) {
    this.placaSelecionada = { ...item };
  }

  abrirConfirmacaoExclusao(item: IPlaca) {
    this.placaParaExcluir = item;
    this.mostrarConfirmacao = true;
  }

  cancelarExclusao() {
    this.placaParaExcluir = null;
    this.mostrarConfirmacao = false;
  }

  realizarExclusao() {
    if (!this.placaParaExcluir) return;

    this.placaService.delete(this.placaParaExcluir.id).subscribe({
      next: () => {
        this.carregarPlacas();
        this.cancelarExclusao();
      },
      error: erro => console.error('Erro ao excluir placa:', erro)
    });
  }


  salvarPlaca(item: IPlaca) {
    if (!item.id || item.id === 0) {
      const dadosParaCriar: IPlacaCreate = {
        number: item.number,
        motorista: item.motorista,
        cargo: item.cargo,
        funcao_cargo: item.funcao_cargo,
        modelo_veiculo: item.modelo_veiculo,
        cor_veiculo: item.cor_veiculo,
        permitido: item.permitido
      };

      this.placaService.create(dadosParaCriar).subscribe({
        next: (res: IPlaca) => {
          console.log('Placa criada:', res);
          this.carregarPlacas();
          this.placaSelecionada = null;
        },
        error: (err) => console.error('Erro ao criar placa:', err)
      });
    } else {
      this.placaService.update(item.id, item).subscribe({
        next: (res: IPlaca) => {
          console.log('Placa atualizada:', res);
          this.carregarPlacas();
          this.placaSelecionada = null;
        },
        error: (err) => console.error('Erro ao atualizar placa:', err)
      });
    }
  }

}

