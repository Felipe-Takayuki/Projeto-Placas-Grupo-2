interface IPlaca{
    id:number
    number:string
    motorista:string
    cargo: ICargos
    funcao_cargo: string
    modelo_veiculo: string 
    cor_veiculo: string
}

enum ICargos{
   FUNCIONARIO_FATEC = 'FUNCIONARIO FATEC',
   FUNCIONARIO_SENAI = 'FUNCIONARIO SENAI',
   FUNCIONARIO_FUNDACAO = 'FUNCIONARIO FUNDACAO',
   CONVIDADO =  'CONVIDADO',
   SERVICO = 'SERVICO',
   VISITANTE = 'VISITANTE'
}