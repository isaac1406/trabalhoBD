export interface MunicipioAlerta {
  nomeMunicipio: string;
  siglaUF: string;
}

export interface HospitalizacaoMunicipio {
  nomeMunicipio: string;
  siglaUF: string;
  Total_Casos: number;
  Total_Hospitalizacoes: number;
}

export interface PacienteIdoso {
  idPaciente: number;
  anoNasc: number;
  classificacaoFinal: string;
}

export interface EvolucaoSexo {
  sexo: string;
  evolucao: string;
  Quantidade: number;
}