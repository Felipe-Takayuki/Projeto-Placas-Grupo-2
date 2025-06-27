export interface IEntrada {
    id:number,
    placa:string,
    data_hora:Date
    status_placa: IStatus_placa
}


enum IStatus_placa {
    APROVADO = 'APROVADO',
    REPROVADO = 'REPROVADO',
}