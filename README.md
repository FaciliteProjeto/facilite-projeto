# Sistema de Gestão - Rede Facilite Automóveis  

## Descrição  

A expansão dos negócios em um mercado competitivo exige não apenas uma visão estratégica, mas também ferramentas que suportem a eficiência e a automação dos processos internos. A **Rede Facilite Automóveis**, uma revendedora de automóveis que comercializa veículos novos e usados, busca atender às demandas crescentes de sua operação ao implementar um sistema automatizado que otimize suas atividades comerciais e administrativas.  

Este documento apresenta uma análise detalhada dos requisitos para o desenvolvimento de um sistema que atenda às necessidades específicas da Rede Facilite Automóveis. O objetivo é proporcionar um ambiente digital integrado que facilite o gerenciamento de veículos, clientes, vendedores, pedidos e operações de compra e venda, assegurando maior controle, agilidade e confiabilidade nas transações.  

Além disso, o sistema deverá alinhar-se à estrutura atual da empresa, considerando a área financeira e outros setores já suportados por sistemas especializados. Esta análise servirá como base para o planejamento e a implementação de uma solução que impulsione a eficiência operacional e contribua para o crescimento sustentável da Rede Facilite Automóveis no mercado nacional.  

---

## Regras de Negócio  

O sistema automatizado da **Rede Facilite Automóveis** deve contemplar as seguintes funcionalidades na primeira etapa de desenvolvimento:  
- Controle dos veículos disponíveis para venda.  
- Controle das operações realizadas (compra e venda), permitindo identificar os clientes e veículos envolvidos. Considera-se a possibilidade de troca e compra e venda simultâneas como operações separadas.  
- Controle dos pedidos feitos às montadoras em nome dos clientes.  
- Controle dos clientes (nenhuma operação pode ser realizada sem cliente cadastrado).  
- Controle dos vendedores (nenhuma operação pode ser realizada sem vendedor cadastrado).  
- Controle das montadoras parceiras.  
- Operações básicas de inclusão, alteração, busca e exclusão para todos os itens acima.  

Os financiamentos e o controle financeiro, contas a pagar/receber e recursos humanos são gerenciados pela área financeira da Rede, que utiliza sistemas específicos para cada finalidade.  

### Atributos Principais  

- **Clientes**: CPF, nome, endereço (bairro, cidade, estado), telefone residencial, celular, renda.  
- **Vendedores**: Código, usuário (demais dados registrados no sistema de recursos humanos).  
- **Veículos**: Número do chassi, placa, marca, modelo, ano de fabricação, ano do modelo, cor, valor.  
- **Operação de Compra**: Número, data, cliente, vendedor, veículo, valor.  
- **Operação de Venda**: Número, data, cliente, vendedor, veículo, valor de entrada, valor financiado, valor total.  
- **Pedidos**: Número, data, cliente, vendedor, montadora, modelo, ano, cor, acessórios, valor.  
- **Montadoras**: CNPJ, razão social, marca, contato, telefone comercial, celular.  

---

## Tecnologias Utilizadas  

- **Figma**  
- **TypeScript**  
- **Docker**  
- **NestJS**  
- **Next.js**  
- **PostgreSQL**  

---

## Design do Sistema  

Utilizamos o **Figma** para o desenvolvimento do design do sistema, uma ferramenta de design colaborativa amplamente reconhecida no desenvolvimento de interfaces de usuário (UI) e experiências de usuário (UX). Sua aplicação no projeto para a Rede Facilite Automóveis busca atender a uma série de objetivos estratégicos e técnicos, garantindo eficiência, consistência visual e integração entre os membros da equipe de desenvolvimento.  

---

## Back-End  

No back-end, optamos por utilizar o **Node.js** juntamente com o framework **NestJS**, reconhecido por sua abordagem modular e excelente suporte a arquiteturas baseadas em microsserviços. Para a interação com o banco de dados, adotamos o **Prisma ORM**, que facilita o mapeamento de dados e a geração de esquemas de forma eficiente. Além disso, seguimos boas práticas de desenvolvimento, incluindo a implementação de testes automatizados com **Jest**, garantindo alta confiabilidade e qualidade no código.  

---

## Front-End  

O desenvolvimento do front-end com **Next.js** e a integração eficiente com a API utilizando **Axios** garantiram a criação de uma aplicação moderna, escalável e com excelente desempenho. O uso de componentes reutilizáveis e o design responsivo asseguram que o sistema seja fácil de manter e ofereça uma experiência de usuário consistente e agradável. Com essas tecnologias e práticas, estamos criando uma base sólida para a evolução contínua da aplicação.  
