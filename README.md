
# Sistema de Ensalamento do Senac-RS

## 📄 Descrição Geral

Este repositório contém a documentação e os artefatos relacionados ao desenvolvimento de um **sistema de ensalamento** voltado às unidades I e II do **Centro Universitário Senac-RS**, localizado no centro histórico de Porto Alegre.

A aplicação visa substituir o processo manual, realizado atualmente via planilhas Excel, por um sistema web capaz de otimizar o processo de alocação de salas para aulas, eventos acadêmicos e demais atividades da instituição.

---

## 🧩 Definição do Problema

Atualmente, o processo de ensalamento é realizado através de planilhas, tornando-o:

* Demorado e suscetível a erros.
* Sujeito a conflitos de reserva.
* Dependente de diversas fontes e planilhas complementares.
* Pouco escalável diante da demanda institucional crescente.

Essa limitação impacta diretamente na eficiência da equipe administrativa e na organização das atividades letivas da instituição.

**Figuras ilustrativas do processo atual:**

![planilha unidade 1](https://github.com/user-attachments/assets/ef641b58-6ea2-492a-8df3-bea262ecc749)
Figura 1 – Planilha do Excel da unidade 1.

![planilha unidade 2](https://github.com/user-attachments/assets/f2828388-fd45-4018-81d3-3a97807165bd)
Figura 1 – Planilha do Excel da unidade 2.

---

## 🎯 Objetivos

### Objetivo Geral

Desenvolver um sistema web para gerenciamento do ensalamento das unidades 1 e 2 do UniSenac, otimizando a alocação de salas e eliminando os problemas inerentes ao processo atual.

### Objetivos Específicos

* Levantar e mapear os fluxos atuais de trabalho.
* Projetar um sistema com base nas deficiências observadas.
* Implementar uma aplicação web que automatize o processo de ensalamento.
* Validar a solução proposta com os usuários finais.

---

## 🛠️ Tecnologias Utilizadas

A definição tecnológica considerou critérios como escalabilidade, curva de aprendizagem e compatibilidade com a infraestrutura institucional.

| Categoria           | Tecnologia/Ferramenta   | Justificativa                                                    |
| ------------------- | ----------------------- | ---------------------------------------------------------------- |
| Linguagem Back-End  | Laravel                 | Familiaridade com a linguagem de programação php                 |
| Framework Front-End | React                   | Flexibilidade e facilidade de criação de interfaces responsivas. |
| Banco de Dados      | MySQL                  | Robustos e com suporte a transações e consultas complexas.       |
| IDE                 | Visual Studio Code      | Suporte amplo a extensões e produtividade.                       |
| Versionamento       | Git / GitHub            | Padrão da indústria para colaboração e controle de versões.      |
| Modelagem de Dados  | Draw\.io / dbdiagram.io | Ferramentas intuitivas para ERD e documentação visual.           |

---

## 🔧 Descrição da Solução

A solução proposta consiste em uma aplicação web composta por:

* Interface gráfica intuitiva para agendamento e visualização de salas.
* Sistema de autenticação para controle de acesso.
* Módulo de verificação automática de conflitos de horários.
* Integração com a base de dados para gerenciamento centralizado.
* Funcionalidade de filtro por requisitos de sala (capacidade, equipamentos etc.).

A arquitetura modular do sistema foi desenvolvida em camadas, separando as responsabilidades entre interface, lógica de negócios e persistência de dados.

---

## 🗂️ Artefatos do Projeto

* Business Model Canvas / MVP Canvas
* Personas e casos de uso
* Diagrama Entidade-Relacionamento (ER)
* Protótipos de interface
* Relatórios de reuniões e validações
* Backlog e histórias de usuário
* Relatórios de Sprint e testes

---

## ✅ Validação

A validação da solução será conduzida por meio de:

* Entrevistas com os usuários do setor administrativo.
* Aplicação de questionários de satisfação.
* Simulações de uso em cenários reais.
* Coleta e análise dos dados de desempenho e uso do sistema.

---

## 📊 Resultados Esperados

* Redução no tempo médio de agendamento.
* Eliminação de conflitos de reservas.
* Aumento da confiabilidade no processo de ensalamento.
* Facilidade de visualização e controle do uso das salas.

---

## ⚠️ Limitações e Perspectivas Futuras

* Integração com sistemas acadêmicos institucionais.
* Desenvolvimento de um aplicativo móvel.
* Inclusão de relatórios gerenciais em tempo real.
* Melhorias contínuas a partir de feedback dos usuários.

---

## 📚 Referências Bibliográficas

* WAZLAWICK, Raul Sidnei. *Metodologia de pesquisa para ciência da computação*. Rio de Janeiro: Elsevier, 2009.
* Documentação oficial das tecnologias utilizadas (React, Node.js, PostgreSQL, etc.)

---
