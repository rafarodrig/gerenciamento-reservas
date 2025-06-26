# Sistema de Ensalamento das Unidades I e II do Senac-Rs

## Resumo do Projeto

Esse projeto foi desenvolvido perante a necessidade de um método mais ágil de gerenciar a alocação das salas de aula para eventos e cursos acadêmicos oferecidos pelo Uni Senac do centro histórico de Porto Alegre. Atualmente os funcionários responsáveis pelo ensalamento se utilizam de planilhas do Excel para manter os registros das reservas de salas, estúdios e auditórios de dois prédios do Senac (unidades 1 e 2). Esse método empregado é ineficiente, podendo ser extremamente demorado e suscetível a erros. Com isso em mente, a equipe de desenvolvimento desenvolveu uma aplicação web que tem por objetivo atender as necessidades principais e oferecer outras funcionalidades que ajudarão no gerenciamento das dependências do Uni Senac.

## Definição do Problema

O problema do ensalamento foi apresentado na disciplina de projeto de desenvolvimento 1 e se tratava da ineficiência de fazer a alocação de salas de aula por planilhas do Excel (Figura 1 e 2) dos diversos eventos e cursos que acontecem diariamente nos turnos da manhã, tarde e noite nas dependências do Uni Senac. Esse método de ensalamento é especialmente demorado no início de cada período letivo, pois os funcionários responsáveis pelo ensalamento precisam cadastrar todas as aulas dos cursos de graduação, pós-graduação e da modalidade FIC (Formação Inicial e Continuada). Durante esse cadastro, os funcionários precisam consultar outras planilhas para confirmar quais salas são capazes de suprir as necessidades de quais disciplinas e resolver os conflitos de acordo. Esses e outros desafios do ensalamento atualmente implementado estão descritos abaixo:

- Falta de agilidade para achar salas disponíveis que supram os requisitos – por exemplo: lotação, quantidade de máquinas e tipo e máquinas – dos eventos e cursos.
- Esforço repetitivo do registro das aulas das disciplinas dos cursos de graduação, pós-graduação e FIC;
- Necessidade de consultar outras planilhas (por exemplo: planilha de salas);

**Figuras ilustrativas do processo atual:**

![planilha unidade 1](https://github.com/user-attachments/assets/ef641b58-6ea2-492a-8df3-bea262ecc749)

<p align="center"><strong>Figura 1 – Planilha do Excel da unidade 1.</strong></p>



![planilha unidade 2](https://github.com/user-attachments/assets/f2828388-fd45-4018-81d3-3a97807165bd)
<p align="center"><strong>Figura 1 – Planilha do Excel da unidade 2.</strong></p>

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

### 4. Ambiente de Desenvolvimento - Visual Studio Code

**Descrição:**  
O Visual Studio Code é um editor de código-fonte leve, com suporte a depuração, controle de versão e uma vasta gama de extensões.

**Justificativa:**  
Sua integração com GitHub, terminal embutido, IntelliSense e suporte a múltiplas linguagens tornam o VS Code uma ferramenta ideal para desenvolvimento full stack com Laravel e React.

**Referência:**

- [https://code.visualstudio.com](https://code.visualstudio.com)

---

### 5. Controle de Versão - GitHub

**Descrição:**  
GitHub é uma plataforma de hospedagem de código baseada em Git, com recursos de colaboração, versionamento e integração contínua.

**Justificativa:**  
Foi utilizado para gerenciar o código-fonte do projeto de forma segura e colaborativa, permitindo o trabalho em equipe e o rastreamento de alterações e melhorias ao longo do desenvolvimento.

**Referência:**

- Chacon, S., & Straub, B. (2014). _Pro Git_.
- [https://github.com](https://github.com)

---

### 6. Servidor Local - XAMPP (Apache + MySQL + PHP)

**Descrição:**  
XAMPP é um pacote que inclui Apache, MySQL e PHP, fornecendo um ambiente de desenvolvimento completo e portátil.

**Justificativa:**  
Utilizado no ambiente local para simular o servidor de produção e facilitar os testes da aplicação. O MySQL, por sua vez, é o SGBD escolhido por sua estabilidade, desempenho e integração nativa com Laravel através do Eloquent ORM.

**Referência:**

- [https://www.apachefriends.org](https://www.apachefriends.org)
- Coronel, C., & Morris, S. (2018). _Database Systems: Design, Implementation, & Management_.

---

### 7. Gerenciadores de Pacotes - Composer & NPM

**Descrição:**

- **Composer**: gerenciador de dependências PHP.
- **NPM**: gerenciador de pacotes JavaScript.

**Justificativa:**  
Esses gerenciadores foram fundamentais para instalar e manter bibliotecas e frameworks essenciais ao funcionamento da aplicação, garantindo padronização, segurança e reprodutibilidade.

**Referência:**

- [https://getcomposer.org](https://getcomposer.org)
- [https://www.npmjs.com](https://www.npmjs.com)

---

## Descrição da Solução

A solução proposta para enfrentar o problema de ineficiência na alocação de salas do Uni Senac – Centro Histórico de Porto Alegre consiste no desenvolvimento de uma **aplicação web**, executada localmente na rede interna da instituição. A aplicação foi projetada para substituir o uso de planilhas do Excel por uma interface intuitiva, segura e dinâmica, que centraliza todas as funcionalidades necessárias para o gerenciamento de espaços físicos, como salas, estúdios e auditórios.

A aplicação organiza as informações de forma estruturada e acessível por meio de diferentes interfaces, voltadas especificamente para o cadastro, consulta e manutenção das reservas. Um dos principais módulos é a **página de cadastro de reservas**, que permite aos usuários registrar reservas de salas para eventos, cursos de graduação, pós-graduação e formações FIC. Essa funcionalidade foi projetada para ser flexível, contemplando diferentes turnos e exigências específicas (como capacidade da sala, número de computadores, tipo de equipamento, etc.). Além disso, este módulo integra opções para cadastrar, editar e excluir **turmas**, facilitando o controle dos cursos e suas necessidades específicas.

Complementando essa funcionalidade, a **página de consulta de reservas** permite visualizar todas as reservas registradas, com filtros por data, turno, unidade e turma. Essa interface também permite a edição e exclusão de reservas de forma prática, garantindo agilidade nas alterações frequentes no início e ao longo do semestre letivo.

Outro componente fundamental da aplicação é a **página de gerenciamento de salas**, que oferece funcionalidades para cadastrar novas salas, atualizar informações (como capacidade, número de máquinas, equipamentos disponíveis) e remover espaços que não estejam mais em uso. Isso possibilita à equipe responsável pelo ensalamento manter um inventário sempre atualizado, promovendo alocações mais precisas e evitando conflitos.

Do ponto de vista técnico, a aplicação foi desenvolvida com **Laravel** no backend, garantindo robustez, segurança e organização do código com base no padrão MVC. O **frontend** foi construído com **React.js**, possibilitando uma interface moderna, reativa e de fácil navegação. A comunicação entre frontend e backend é feita por meio de **APIs RESTful**, permitindo escalabilidade e manutenção simplificada.

Para garantir a integridade e a segurança dos dados, a aplicação conta com mecanismos como **validação de dados no backend e frontend**, proteção contra CSRF, autenticação de usuários (com níveis de permissão, se necessário) e auditoria básica das alterações. O uso do **MySQL** como sistema de banco de dados relacional garante consistência e desempenho adequado para o volume esperado de dados.

A aplicação é executada localmente, utilizando **XAMPP**, que fornece o servidor Apache, PHP e MySQL de forma integrada, o que facilita o desenvolvimento, implantação e manutenção dentro do ambiente interno da instituição.

Abaixo, apresenta-se uma visão geral da arquitetura e fluxo da solução implementada:

![Visão geral da solução](image)

Além disso, diversas telas foram implementadas para viabilizar as funcionalidades descritas:

- **Tela de Cadastro de Reserva**  

![Tela de Cadastro de Reservas](https://github.com/user-attachments/assets/f898943b-80cc-4efc-b05e-29dd7391ac57)

  Permite registrar uma nova reserva e, simultaneamente, cadastrar ou selecionar a turma associada à reserva.

- **Tela de Consulta de Reservas**  

![Tela de Cosulta de Reservas](https://github.com/user-attachments/assets/4f4c860b-8b51-4ee4-bc81-b23ca6d97160)

  Exibe uma tabela filtrável e editável com todas as reservas registradas, separadas por data, turno e unidade.

- **Tela de Gerenciamento de Salas**  
  ![Tela de Cosulta de Reservas]()

  Interface para cadastrar, editar e excluir informações das salas, incluindo atributos como capacidade, tipo e localização.

Essa solução visa automatizar por completo o processo de ensalamento, reduzindo o tempo gasto com tarefas manuais, minimizando erros humanos e proporcionando uma visualização clara da ocupação dos espaços acadêmicos do Senac. Dessa forma, atende de maneira eficaz aos requisitos apresentados pelos usuários finais e às necessidades da instituição.

## Arquitetura

## Validação

### Estratégia

### Consolidação dos Dados Coletados

## Conclusões

## Referências Bibliográficas
