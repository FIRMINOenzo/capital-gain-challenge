# Capital Gains Calculator

Aplicação para cálculo de imposto sobre ganhos de capital em operações de compra e venda de ações.

## 📋 Índice

- [Decisões de Arquitetura](#-decisões-de-arquitetura)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Instalação](#-instalação)
- [Como Rodar o Projeto](#-como-rodar-o-projeto)
- [Como Rodar os Testes](#-como-rodar-os-testes)

## 🏛️ Decisões de Arquitetura

O projeto foi estruturado seguindo os princípios de **Clean Architecture** de forma simplificada, focando em:

### 1. **Separação em Camadas**

O código está organizado em camadas bem definidas, promovendo baixo acoplamento e alta coesão:

- **Domain (Domínio)**: Contém as regras de negócio puras

  - **Entities**: Entidades principais (`Portfolio`, `Transaction`)
  - **Value Objects**: Objetos de valor imutáveis (`MarketOperation`, `OperationCost`, `Quantity`)
  - **Enums**: Enumerações do domínio (`MarketOperationEnum`)
  - **Errors**: Exceções customizadas do domínio

- **Application (Aplicação)**: Casos de uso e orquestração

  - **Use Cases**: Lógica de aplicação (`CalculateCapitalGainsUseCase`)

- **Infrastructure (Infraestrutura)**: Detalhes de implementação
  - **I/O**: Leitura e escrita de dados (`InputReader`, `OutputWriter`)
  - **Dependency Injection**: Registry pattern para injeção de dependências

### 2. **Princípios SOLID Aplicados**

- **Single Responsibility**: Cada classe tem uma única responsabilidade bem definida
- **Open/Closed**: Entidades estão abertas para extensão mas fechadas para modificação
- **Dependency Inversion**: Dependências apontam para abstrações, não para implementações concretas

### 3. **Value Objects**

Uso extensivo de Value Objects para encapsular regras de negócio e garantir imutabilidade:

- `MarketOperation`: Valida e encapsula operações de mercado (buy/sell)
- `OperationCost`: Garante que custos são sempre valores positivos
- `Quantity`: Valida quantidades de ações

### 4. **Dependency Injection**

Implementação de um Registry pattern simples para injeção de dependências, permitindo:

- Fácil substituição de implementações
- Melhor testabilidade
- Baixo acoplamento entre componentes

### 5. **Imutabilidade**

Entidades e value objects são projetados para serem imutáveis ou controlarem suas mutações, garantindo:

- Previsibilidade do estado
- Facilidade para testar
- Menos bugs relacionados a efeitos colaterais

## ▶️ Como Rodar o Projeto

### Modo de Desenvolvimento

```bash
npm run dev
```

Este comando utiliza `ts-node` para executar diretamente o arquivo TypeScript sem necessidade de compilação.

**Entrada de dados**: O programa lê dados da entrada padrão (stdin). Você pode:

1. **Digitar manualmente** (pressione `Ctrl+D` no Linux/Mac ou `Ctrl+Z` no Windows quando terminar):

```bash
npm run dev
```

2. **Redirecionar um arquivo**:

```bash
npm run dev < input.json
```

3. **Usar pipe**:

```bash
echo '[{"operation":"buy", "unit-cost":10, "quantity":100}]' | npm run dev
```

### Modo de Produção

```bash
# Compila o TypeScript para JavaScript
npm run start
```

Este comando:

1. Compila o código TypeScript para JavaScript (pasta `dist/`)
2. Executa o arquivo compilado com Node.js

## 🧪 Como Rodar os Testes

### Todos os Testes

```bash
npm test
```

Este comando executa:

- ✅ Testes de unidade das entidades
- ✅ Testes de unidade dos value objects
- ✅ Testes de unidade dos casos de uso
- ✅ Testes de integração

### Testes com Cobertura

```bash
npm test -- --coverage
```

## 📝 Formato de Entrada/Saída

### Entrada

A aplicação espera um array JSON de transações via stdin:

```json
[
  { "operation": "buy", "unit-cost": 10.0, "quantity": 100 },
  { "operation": "sell", "unit-cost": 15.0, "quantity": 50 },
  { "operation": "sell", "unit-cost": 15.0, "quantity": 50 }
]
```

### Saída

Para cada transação, retorna o imposto calculado:

```json
[{ "tax": "0.0" }, { "tax": "0.0" }, { "tax": "1000.0" }]
```

## 🧩 Exemplo de Uso

```bash
echo '[{"operation":"buy", "unit-cost":10.00, "quantity":100},{"operation":"sell", "unit-cost":15.00, "quantity":50}]' | npm run dev
```

Saída:

```json
[{ "tax": "0.0" }, { "tax": "0.0" }]
```

---
