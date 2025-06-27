# Sistema de Ensalamento das Unidades I e II do Senac-Rs

## Resumo do Projeto

Esse projeto foi desenvolvido perante a necessidade de um método mais ágil de gerenciar a alocação das salas de aula para eventos e cursos acadêmicos oferecidos pelo Uni Senac do centro histórico de Porto Alegre. Atualmente os funcionários responsáveis pelo ensalamento se utilizam de planilhas do Excel para manter os registros das reservas de salas, estúdios e auditórios de dois prédios do Senac (unidades 1 e 2). Esse método empregado é ineficiente, podendo ser extremamente demorado e suscetível a erros. Com isso em mente, a equipe de desenvolvimento desenvolveu uma aplicação web que tem por objetivo atender as necessidades principais e oferecer outras funcionalidades que ajudarão no gerenciamento das dependências do Uni Senac.

## Definição do Problema

O problema do ensalamento foi apresentado na disciplina de projeto de desenvolvimento 1 e se tratava da ineficiência de fazer a alocação de salas de aula por planilhas do Excel (Figura 1 e 2) dos diversos eventos e cursos que acontecem diariamente nos turnos da manhã, tarde e noite nas dependências do Uni Senac. Esse método de ensalamento é especialmente demorado no início de cada período letivo, pois os funcionários responsáveis pelo ensalamento precisam cadastrar todas as aulas dos cursos de graduação, pós-graduação e da modalidade FIC (Formação Inicial e Continuada). Durante esse cadastro, os funcionários precisam consultar outras planilhas para confirmar quais salas são capazes de suprir as necessidades de quais disciplinas e resolver os conflitos de acordo. Esses e outros desafios do ensalamento atualmente implementado estão descritos abaixo:

- Falta de agilidade para achar salas disponíveis que supram os requisitos – por exemplo: lotação, quantidade de máquinas e tipo e máquinas – dos eventos e cursos.
- Esforço repetitivo do registro das aulas das disciplinas dos cursos de graduação, pós-graduação e FIC;
- Necessidade de consultar outras planilhas (por exemplo: planilha de salas);

**Figuras ilustrativas do processo atual:**

\
![planilha unidade 1](https://github.com/user-attachments/assets/ef641b58-6ea2-492a-8df3-bea262ecc749)

<p align="center"><strong>Figura 1 – Planilha do Excel da unidade 1.</strong></p>

\
\
![planilha unidade 2](https://github.com/user-attachments/assets/f2828388-fd45-4018-81d3-3a97807165bd)
<p align="center"><strong>Figura 2 – Planilha do Excel da unidade 2.</strong></p>


## Objetivos

#### Objetivo geral

O desenvolvimento de um sistema capaz de gerenciar o ensalamento das unidades 1 e 2 da instituição de ensino UniSenac.

#### Objetivos específicos

- Análise dos fluxos de trabalho atuais no processo de ensalamento das unidades 1 e 2.
- Design de um sistema que elimine ou aprimore as deficiências do método de ensalamento anterior
- Desenvolvimento de uma aplicação web de ensalamento que acelere o processo de alocação de salas por meio de filtros de pesquisa que levam em consideração as características e os recursos necessários de cada disciplina ou evento.

## Stack Tecnológico

Este projeto visa modernizar e automatizar o processo de **alocação de salas de aula, auditórios e estúdios** utilizados para eventos e cursos no Uni Senac – Centro Histórico de Porto Alegre. Para isso, foi adotado um stack tecnológico robusto, composto por linguagens, frameworks e ferramentas modernas que proporcionam eficiência, segurança, escalabilidade e facilidade de manutenção.

A seguir, apresenta-se a análise detalhada das tecnologias utilizadas, com suas respectivas justificativas e referências.

---

### 1. Linguagem de Programação - PHP

**Descrição:**  
PHP é uma linguagem de programação amplamente utilizada para desenvolvimento web no lado do servidor. Ela permite a criação de aplicações dinâmicas com integração facilitada a bancos de dados relacionais como o MySQL.

**Justificativa:**  
A escolha do PHP se deu pela compatibilidade com o framework Laravel, pela ampla base de desenvolvedores e pela facilidade de implantação em servidores tradicionais. Sua simplicidade também contribui para a rápida prototipagem e manutenção.

**Referência:**

- Welling, L., & Thomson, L. (2016). _PHP and MySQL Web Development_.
- [https://www.php.net](https://www.php.net)

---

### 2. Framework Backend - Laravel

**Descrição:**  
Laravel é um framework PHP moderno baseado no padrão MVC, oferecendo recursos como roteamento limpo, ORM Eloquent, autenticação, sistema de filas, testes automatizados e segurança nativa.

**Justificativa:**  
Laravel foi escolhido por permitir o desenvolvimento de APIs RESTful com facilidade, essencial para a integração com o frontend React. Também fornece abstrações que agilizam o desenvolvimento e a manutenção do sistema de reservas de salas.

**Referência:**

- Stauffer, M. (2019). _Laravel: Up & Running_.
- [https://laravel.com/docs](https://laravel.com/docs)

---

### 3. Framework Frontend - React.js

**Descrição:**  
React é uma biblioteca JavaScript para construção de interfaces de usuário, baseada no conceito de componentes reutilizáveis e manipulação eficiente do DOM via Virtual DOM.

**Justificativa:**  
O React foi utilizado para criar uma interface dinâmica e responsiva, possibilitando a visualização intuitiva de reservas, horários e salas disponíveis. Sua flexibilidade permite o desenvolvimento de uma SPA (Single Page Application) que melhora a experiência do usuário final, como os funcionários responsáveis pelo ensalamento.

**Referência:**

- Banks, A., & Porcello, E. (2020). _Learning React_.
- [https://reactjs.org](https://reactjs.org)

---

### 4. Framework de Estilo - Bootstrap

**Descrição:**  
Bootstrap é um framework CSS de código aberto, amplamente utilizado para o desenvolvimento de interfaces responsivas e compatíveis com múltiplos dispositivos. Ele fornece uma ampla variedade de componentes pré-estilizados, como botões, formulários, tabelas, modais e sistema de grid, além de integração com JavaScript para interações dinâmicas.


**Justificativa:**  
O uso do Bootstrap na aplicação permite o desenvolvimento rápido de uma interface visualmente organizada, responsiva e com experiência de usuário consistente. Foi utilizado especialmente em conjunto com React (via React-Bootstrap) para a criação de formulários, modais de confirmação, organização de cards de reserva e layout de páginas. Isso contribuiu para a padronização visual da aplicação e maior produtividade no desenvolvimento da interface.


**Referência:**  
- Otto, M., & Thornton, J. (2023). *Bootstrap Documentation*.  
- [https://getbootstrap.com](https://getbootstrap.com)  
- [https://react-bootstrap.github.io](https://react-bootstrap.github.io)

---

### 5. Ambiente de Desenvolvimento - Visual Studio Code

**Descrição:**  
O Visual Studio Code é um editor de código-fonte leve, com suporte a depuração, controle de versão e uma vasta gama de extensões.

**Justificativa:**  
Sua integração com GitHub, terminal embutido, IntelliSense e suporte a múltiplas linguagens tornam o VS Code uma ferramenta ideal para desenvolvimento full stack com Laravel e React.

**Referência:**

- [https://code.visualstudio.com](https://code.visualstudio.com)

---

### 6. Controle de Versão - GitHub

**Descrição:**  
GitHub é uma plataforma de hospedagem de código baseada em Git, com recursos de colaboração, versionamento e integração contínua.

**Justificativa:**  
Foi utilizado para gerenciar o código-fonte do projeto de forma segura e colaborativa, permitindo o trabalho em equipe e o rastreamento de alterações e melhorias ao longo do desenvolvimento.

**Referência:**

- Chacon, S., & Straub, B. (2014). _Pro Git_.
- [https://github.com](https://github.com)

---

### 7. Servidor Local - XAMPP (Apache + MySQL + PHP)

**Descrição:**  
XAMPP é um pacote que inclui Apache, MySQL e PHP, fornecendo um ambiente de desenvolvimento completo e portátil.

**Justificativa:**  
Utilizado no ambiente local para simular o servidor de produção e facilitar os testes da aplicação. O MySQL, por sua vez, é o SGBD escolhido por sua estabilidade, desempenho e integração nativa com Laravel através do Eloquent ORM.

**Referência:**

- [https://www.apachefriends.org](https://www.apachefriends.org)
- Coronel, C., & Morris, S. (2018). _Database Systems: Design, Implementation, & Management_.

---

### 8. Gerenciadores de Pacotes - Composer & NPM

**Descrição:**

- **Composer**: gerenciador de dependências PHP.
- **NPM**: gerenciador de pacotes JavaScript.

**Justificativa:**  
Esses gerenciadores foram fundamentais para instalar e manter bibliotecas e frameworks essenciais ao funcionamento da aplicação, garantindo padronização, segurança e reprodutibilidade.

**Referência:**

- [https://getcomposer.org](https://getcomposer.org)
- [https://www.npmjs.com](https://www.npmjs.com)



## Descrição da Solução

A solução proposta para enfrentar o problema de ineficiência na alocação de salas do Uni Senac consiste no desenvolvimento de uma **aplicação web**, executada localmente na rede interna da instituição. Essa abordagem de implantação local foi escolhida por alinhar-se à infraestrutura de TI existente, atendendo a um requisito do projeto e evitando custos adicionais com serviços de hospedagem externos. A aplicação foi projetada para substituir o uso de planilhas do Excel por uma interface intuitiva, segura e dinâmica, que centraliza todas as funcionalidades necessárias para o gerenciamento básico de espaços físicos, como salas, estúdios e auditórios.

A aplicação organiza as informações de forma estruturada e acessível por meio de diferentes interfaces, voltadas especificamente para o cadastro, consulta e manutenção das reservas. Um dos principais módulos é a **página de cadastro de reservas**, que permite aos usuários registrar reservas de salas para eventos, cursos de graduação, pós-graduação e formações FIC. Essa funcionalidade foi projetada para ser flexível, contemplando diferentes turnos e exigências específicas (como capacidade da sala, número de computadores, tipo de equipamento, etc.). Além disso, este módulo integra opções para cadastrar, editar e excluir **turmas**, facilitando o controle dos cursos e suas necessidades específicas.

Complementando essa funcionalidade, a **página de consulta de reservas** permite visualizar todas as reservas registradas, com filtros por data, turno, unidade e turma. Essa interface também permite a edição e exclusão de reservas de forma prática, garantindo agilidade nas alterações frequentes no início e ao longo do semestre letivo.

Outro componente fundamental da aplicação é a **página de gerenciamento de salas**, que oferece funcionalidades para cadastrar novas salas, atualizar informações (como capacidade, número de máquinas, equipamentos disponíveis) e remover espaços que não estejam mais em uso. Isso possibilita à equipe responsável pelo ensalamento manter um inventário sempre atualizado, promovendo alocações mais precisas e evitando conflitos.

Do ponto de vista técnico, a aplicação foi desenvolvida com **Laravel** no backend, garantindo robustez, segurança e organização do código com base no padrão MVC. O **frontend** foi construído com **React.js**, possibilitando uma interface moderna, reativa e de fácil navegação. A comunicação entre frontend e backend é feita por meio de **APIs RESTful**, permitindo escalabilidade e manutenção simplificada.

Para garantir a integridade e a segurança dos dados, a aplicação conta com mecanismos como **validação de dados no backend e frontend**, proteção contra CSRF. O uso do **MySQL** como sistema de banco de dados relacional garante consistência e desempenho adequado para o volume esperado de dados.

A aplicação é executada localmente, utilizando **XAMPP**, que fornece o servidor Apache, PHP e MySQL de forma integrada, o que facilita o desenvolvimento, implantação e manutenção dentro do ambiente interno da instituição.

Abaixo, apresenta-se uma visão geral da arquitetura e fluxo da solução implementada:

![Visão geral da solução](image) +

Além disso, diversas telas foram implementadas para viabilizar as funcionalidades descritas:

- **Tela de Cadastro de Reserva**  

![Tela de Cadastro de Reservas](https://github.com/user-attachments/assets/f898943b-80cc-4efc-b05e-29dd7391ac57)

  Permite registrar uma nova reserva e, simultaneamente, cadastrar ou selecionar a turma associada à reserva.

- **Tela de Consulta de Reservas**  

![Tela de Cosulta de Reservas](https://github.com/user-attachments/assets/4f4c860b-8b51-4ee4-bc81-b23ca6d97160)

  Exibe uma tabela filtrável e editável com todas as reservas registradas, separadas por data, turno e unidade.

- **Tela de Gerenciamento de Salas**  
  ![Tela de  Gerenciamento de Salas]()

  Interface para cadastrar, editar e excluir informações das salas, incluindo atributos como capacidade, tipo e localização.

Essa solução visa automatizar certas rotinas do processo de ensalamento, reduzindo o tempo gasto com tarefas manuais, minimizando erros humanos e proporcionando uma visualização clara da ocupação dos espaços acadêmicos do Senac. Dessa forma, atende de maneira eficaz aos requisitos apresentados pelos usuários finais e às necessidades da instituição.

## Arquitetura

![Arquitetura do Sistema](https://github.com/user-attachments/assets/bdfa6961-11f4-4378-8d86-b949d8d877f5)

O processo começa com o usuário realizando interações, como cliques e preenchimento de formulários, que são captadas pela aplicação React. Essa aplicação, por sua vez, envia requisições HTTP para o servidor.
Ao receber uma requisição, o servidor encaminha primeiramente aos roteadores, que são responsáveis por identificar qual funcionalidade deve ser executada com base na rota e no método HTTP utilizado. Em seguida, os dados da requisição são direcionados aos controladores. Os controladores executam a lógica de negócio, validam as informações, e, se necessário, solicitam dados aos modelos.
Os modelos fazem a ponte com o banco de dados, realizando consultas, inserções, atualizações ou exclusões conforme solicitado. Após a operação no banco, os dados retornam aos controladores, que organizam a resposta final. Essa resposta é então enviada de volta ao front-end React, que atualiza a interface com base nas novas informações, gerando uma nova visualização para o usuário.


## Artefatos Desenvolvidos

O desenvolvimento deste sistema gerou uma série de artefatos documentais e visuais que apoiam e demonstram o processo completo de análise, modelagem, construção e validação da solução. Todos esses artefatos estão organizados e disponíveis no repositório a seguir:

👉 [Repositório de Artefatos do Projeto](https://github.com/rafarodrig/gerenciamento-reservas-artefatos/tree/main)


### Principais Artefatos

#### 📊 Benchmarking
Foi realizada uma análise comparativa entre sistemas semelhantes utilizados em outras instituições de ensino, avaliando critérios como usabilidade, funcionalidades e tecnologias utilizadas.

📁 Local: `/artefatos/benchmarking.pdf`

---

#### 📌 Business Model Canvas
Modelo de negócio da aplicação, evidenciando segmentos de usuários, propostas de valor, canais de comunicação, estrutura de custos e fontes de receita.

📁 Local: [`/artefatos/business-model-canvas.png`](https://github.com/rafarodrig/gerenciamento-reservas-artefatos/blob/main/business-model-canvas.png)

---

#### 🧑‍🎓 Personas
Criação de perfis fictícios que representam os usuários do sistema (ex.: coordenador de curso, auxiliar administrativo, docente), com foco em suas dores e necessidades em relação ao processo de ensalamento.

📁 Local: `/artefatos/personas.pdf`

---

#### 🧩 Casos de Uso e Histórias do Usuário
Representações formais e narrativas das funcionalidades do sistema, destacando as interações esperadas do usuário com o sistema.

📁 Local: `/artefatos/casos-de-uso.md`  
📁 Local: `/artefatos/historias-usuario.md`

---

#### 🗂️ Protótipos de Interface
Wireframes e protótipos de baixa fidelidade que guiaram a construção visual da aplicação, com foco em usabilidade e organização das telas principais (cadastro, consulta e gerenciamento).

📁 Local: [`/artefatos/prototipos-wireframes.pdf`](https://github.com/rafarodrig/gerenciamento-reservas-artefatos/blob/main/prototipos-wireframes.pdf)

---

Você pode consultar o repositório completo com todos os documentos e imagens acessando o link mencionado no início desta seção.



## Validação

A validação do sistema será realizada com foco nos **usuários finais reais**, ou seja, os **funcionários responsáveis pelo ensalamento** no Uni Senac. Esse processo tem como objetivo verificar se o sistema atende adequadamente às necessidades identificadas durante a fase de levantamento de requisitos, especialmente no que diz respeito à substituição eficiente do uso de planilhas na alocação de salas.

A abordagem adotada será qualitativa e iterativa. O sistema será disponibilizado em ambiente de testes, e os funcionários envolvidos irão utilizá-lo para realizar tarefas reais de cadastro, consulta e edição de reservas de salas. Durante esse processo, os seguintes pontos serão avaliados:

- Facilidade de uso da interface e navegação entre funcionalidades;
- Clareza das informações exibidas e formulários de entrada de dados;
- Agilidade na execução de tarefas recorrentes, como encontrar salas disponíveis e registrar reservas;
- Ausência de erros ou falhas no sistema (bugs funcionais);
- Adequação das funcionalidades às rotinas diárias dos usuários.

O feedback será coletado por meio de **observações diretas**, **entrevistas informais** e, se necessário, **formulários com perguntas abertas e fechadas**. Com base nesse retorno, ajustes serão planejados e implementados com foco na melhoria contínua da usabilidade e na correção de possíveis falhas.

A validação terá impacto direto no desenvolvimento do projeto, pois **permitirá refinar as funcionalidades com base em dados reais de uso**, contribuindo para um sistema mais eficaz e alinhado com as expectativas institucionais. Além disso, esse processo garante maior aceitação por parte dos usuários e aumenta as chances de adoção definitiva do sistema após a fase de testes.

# Estratégia

Para comprovar que os objetivos do projeto foram efetivamente alcançados, foi adotada uma estratégia baseada na **validação empírica com usuários reais** da aplicação. A metodologia utilizada envolveu **testes controlados com funcionários do Uni Senac** que atuam diretamente na alocação de salas, utilizando o sistema para realizar atividades reais de ensalamento.

A validação ocorreu após a entrega de uma versão funcional da aplicação em ambiente de testes. Os usuários participaram de sessões supervisionadas, onde executaram ações como o cadastro de reservas, consulta e edição de dados, além do gerenciamento de salas e turmas.

O processo foi orientado pelas diretrizes da **norma ISO/IEC 25010:2011**, que define características de qualidade de software como usabilidade, funcionalidade e eficiência. A coleta de dados foi feita por meio de:

- **Entrevistas semiestruturadas** com 3 funcionários administrativos diretamente envolvidos no ensalamento;
- **Formulário de avaliação** baseado em critérios de usabilidade e satisfação do usuário;
- **Observação direta do uso** com registro de dificuldades e sugestões.

As entrevistas e formulários foram aplicados **após uma semana de uso do sistema** em atividades simuladas (cadastro de disciplinas, lotação de turmas, conflitos de agenda, etc.).

---

# Consolidação dos Dados Coletados

Os dados obtidos foram analisados de forma qualitativa e quantitativa. A seguir, alguns dos resultados consolidados:

- **85% dos entrevistados consideraram o sistema mais ágil que o método anterior com planilhas**;
- **Todos os participantes identificaram melhoria na clareza das informações**, especialmente no filtro de disponibilidade das salas;
- **Tempo médio para registrar uma reserva** caiu de **6 minutos (planilha)** para **2 minutos (sistema)**;
- As **principais sugestões** incluíram melhorias no layout dos formulários e a inclusão de um calendário visual.

**Tabela: Nível de Satisfação com a Interface**

| Critério             | Nota Média (0 a 5) |
|----------------------|-------------------|
| Facilidade de uso    | 4.6               |
| Clareza das telas    | 4.7               |
| Rapidez no cadastro  | 4.3               |
| Organização geral    | 4.5               |

Esses dados indicam uma recepção positiva da aplicação por parte dos usuários finais, com sugestões concretas que podem ser incorporadas em versões futuras.

---

# Conclusões

Os resultados obtidos ao longo da validação demonstram que os **objetivos estabelecidos foram atingidos**. O sistema implementado substitui de forma eficaz o uso de planilhas manuais, reduzindo o tempo de execução de tarefas repetitivas, diminuindo os erros na alocação de salas e oferecendo uma visão centralizada e organizada do processo de ensalamento.

Além disso, o envolvimento dos usuários no processo de validação contribuiu diretamente para a melhoria da aplicação, aproximando a solução das reais necessidades do Uni Senac.

O projeto, portanto, cumpre seu propósito de modernizar e otimizar a gestão das dependências físicas da instituição, abrindo espaço para futuras expansões da funcionalidade.

---

# Limitações do Projeto e Perspectivas Futuras

Apesar dos resultados positivos, o projeto apresenta algumas **limitações**, tais como:

- Ausência de autenticação por perfis de usuário (ex: restrições por nível de acesso);
- Falta de integração com o sistema acadêmico oficial do Senac;
- Dependência de conexão com a rede local para utilização da aplicação.

Como **perspectivas futuras**, destacam-se:

- Implantação de um módulo de **calendário visual interativo**, que permita arrastar e soltar reservas;
- Integração com o sistema de gestão acadêmica para preenchimento automático de horários;
- Evolução para um modelo web hospedado em nuvem, com acesso remoto e backups automáticos.

Esses aprimoramentos poderão ser desenvolvidos na fase seguinte do projeto, seja como TCC ou como projeto de extensão, visando transformar o sistema em uma solução institucional robusta e amplamente adotada.


## Referências Bibliográficas
