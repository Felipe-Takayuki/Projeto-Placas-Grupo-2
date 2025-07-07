import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { ICargos, IPlaca } from '../placas/placas.model';

@Component({
  selector: 'app-placa-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './placa-modal.component.html',
  styleUrl: './placa-modal.component.scss',
  standalone: true
})
export class PlacaModalComponent implements OnChanges {
  @Input() placa: IPlaca | null = null;
  @Output() salvar = new EventEmitter<IPlaca>();
  @Output() cancelar = new EventEmitter<void>();

  veiculo: IPlaca = {} as IPlaca;
  cargos = Object.values(ICargos);

  dados: IPlaca = {
    id: 0,
    number: '',
    motorista: '',
    cargo: ICargos.VISITANTE,
    funcao_cargo: '',
    modelo_veiculo: '',
    cor_veiculo: '',
    permitido: true
  };

  ngOnChanges() {
    this.dados = this.placa
      ? { ...this.placa }
      : {
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
  onSalvar() {
    this.salvar.emit(this.dados);
  }

  onCancelar() {
    this.cancelar.emit();
  }

  abrirCalendario(input: HTMLInputElement) {
    if (input.showPicker) {
      input.showPicker();
    } else {
      input.focus();
    }
  }

}


