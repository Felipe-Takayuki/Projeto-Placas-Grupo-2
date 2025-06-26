import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  onSubmit() {
    if (!this.validarCampos()) return;

    const dados = {
      nome: this.nome.trim(),
      email: this.email.trim(),
      senha: this.senha
    };

    console.log('Dados enviados:', dados);
    alert('✅ Cadastro realizado com sucesso!');
    this.limparFormulario();
  }

  
  validarCampos(): boolean {
    if (!this.nome.trim() || !this.email.trim() || !this.senha || !this.confirmarSenha) {
      alert('⚠️ Por favor, preencha todos os campos!');
      return false;
    }

    if (!this.validarEmail(this.email)) {
      alert('⚠️ Por favor, insira um email válido!');
      return false;
    }

    if (this.senha.length < 6) {
      alert('⚠️ A senha deve ter pelo menos 6 caracteres!');
      return false;
    }

    if (this.senha !== this.confirmarSenha) {
      alert('⚠️ As senhas não coincidem!');
      return false;
    }

    return true;
  }

 
  validarEmail(email: string): boolean {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  }

 
  limparFormulario() {
    this.nome = '';
    this.email = '';
    this.senha = '';
    this.confirmarSenha = '';
  }
}
