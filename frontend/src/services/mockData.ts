export const MOCK_DATA = {
  // Q1: Auditoria de Exames
  q1Exames: [
    { nomeExame: "Sorologia (IgM)", Qtd_Realizada: 4500 },
    { nomeExame: "PCR - Dengue", Qtd_Realizada: 3200 },
    { nomeExame: "NS1 (Teste Rápido)", Qtd_Realizada: 5100 },
    { nomeExame: "Hemograma", Qtd_Realizada: 6000 },
    { nomeExame: "Isolamento Viral", Qtd_Realizada: 800 },
  ],

  // Q2: Pacientes Hospitalizados (Lista nominal)
  q2Hospitalizados: Array.from({ length: 120 }, (_, i) => ({
    idPaciente: 1000 + i,
    sexo: i % 2 === 0 ? 'M' : 'F',
    Municipio_Residencia: 'Rio de Janeiro',
    dataSintoma: '2024-03-10',
    hospitalizacao: '1'
  })),

  // Q3: Evolução por Sexo (Agregação)
  q3Evolucao: [
    { sexo: "M", evolucao: "Cura", Quantidade: 1200 },
    { sexo: "F", evolucao: "Cura", Quantidade: 1450 },
    { sexo: "M", evolucao: "Obito pelo agravo", Quantidade: 15 },
    { sexo: "F", evolucao: "Obito pelo agravo", Quantidade: 10 },
    { sexo: "M", evolucao: "Em investigacao", Quantidade: 300 },
    { sexo: "F", evolucao: "Em investigacao", Quantidade: 320 },
  ],

  // Q4: Hospitalizações por Município (Ranking)
  q4HospMun: [
    { nomeMunicipio: "Rio de Janeiro", siglaUF: "RJ", Total_Casos: 15000, Total_Hospitalizacoes: 450 },
    { nomeMunicipio: "Niterói", siglaUF: "RJ", Total_Casos: 5000, Total_Hospitalizacoes: 80 },
    { nomeMunicipio: "Duque de Caxias", siglaUF: "RJ", Total_Casos: 8200, Total_Hospitalizacoes: 320 },
    { nomeMunicipio: "Nova Iguaçu", siglaUF: "RJ", Total_Casos: 7500, Total_Hospitalizacoes: 210 },
    { nomeMunicipio: "São Gonçalo", siglaUF: "RJ", Total_Casos: 6800, Total_Hospitalizacoes: 190 },
    { nomeMunicipio: "Petrópolis", siglaUF: "RJ", Total_Casos: 1200, Total_Hospitalizacoes: 15 },
  ],

  // Q5: Alerta (Municipios > 50 casos)
  q5Alerta: [
    { nomeMunicipio: "Duque de Caxias", siglaUF: "RJ" },
    { nomeMunicipio: "Rio de Janeiro", siglaUF: "RJ" },
    { nomeMunicipio: "Nova Iguaçu", siglaUF: "RJ" },
    { nomeMunicipio: "São Gonçalo", siglaUF: "RJ" },
    { nomeMunicipio: "Belford Roxo", siglaUF: "RJ" },
  ],

  // Q6: Curva Epidemiológica (Sazonalidade)
  q6Volume: [
    { Periodo: "2024-01", Total_Casos: 1200 },
    { Periodo: "2024-02", Total_Casos: 2500 },
    { Periodo: "2024-03", Total_Casos: 5800 },
    { Periodo: "2024-04", Total_Casos: 4100 },
    { Periodo: "2024-05", Total_Casos: 1800 },
    { Periodo: "2024-06", Total_Casos: 900 },
  ],

  // Q7: Reagentes (Lista de IDs positivos) - Simulando 3500 casos positivos
  q7Reagentes: Array.from({ length: 3500 }, (_, i) => ({ idNotificacao: i })),

  // Q8: Idosos (Lista de risco)
  q8Idosos: [
    { idPaciente: 501, anoNasc: 1945, classificacaoFinal: "Dengue Classico" },
    { idPaciente: 502, anoNasc: 1938, classificacaoFinal: "Dengue com Sinais de Alarme" },
    { idPaciente: 503, anoNasc: 1950, classificacaoFinal: "Dengue Classico" },
    { idPaciente: 504, anoNasc: 1942, classificacaoFinal: "Dengue Grave" },
    { idPaciente: 505, anoNasc: 1935, classificacaoFinal: "Em Investigacao" },
    { idPaciente: 506, anoNasc: 1949, classificacaoFinal: "Dengue Classico" },
  ]
};