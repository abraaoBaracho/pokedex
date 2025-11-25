# Pokédex Pokémon HeartGold e SoulSilver

## Visão Geral do Projeto

Este projeto é uma **Pokédex interativa** desenvolvida em **React** e **TypeScript**, inspirada no design e na limitação de Pokémon da região de **Johto e Kanto** presentes nos jogos **Pokémon HeartGold e SoulSilver (Geração IV)**.

A aplicação permite aos usuários pesquisar Pokémon por nome ou número de ID (limitado a 493 - Arceus), visualizar seus dados essenciais (nome, ID, tipos) e alternar entre as *sprites* normais e *shiny* (brilhantes) da Geração IV. Além disso, a Pokédex reproduz o som característico (o "cry") de cada Pokémon.

## Funcionalidades Principais

*   **Interface Inspirada em HeartGold/SoulSilver:** Design e *sprites* que remetem à experiência da Geração IV.
*   **Busca de Pokémon:** Pesquisa por nome ou número de ID (até 493).
*   **Visualização de Dados:** Exibe nome, ID, Tipo 1 e Tipo 2 do Pokémon.
*   **Sprites da Geração IV:** Utiliza as *sprites* frontais dos Pokémon de *HeartGold/SoulSilver*.
*   **Modo Shiny:** Botão para alternar a visualização entre a *sprite* normal e a *sprite* *shiny*.
*   **Reprodução do Cry:** Toca o som (cry) do Pokémon ao ser carregado.
*   **Navegação Sequencial:** Botões para avançar e retroceder para o Pokémon anterior ou seguinte na Pokédex.

## Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias:

| Tecnologia | Descrição |
| :--- | :--- |
| **React** | Biblioteca JavaScript para construção da interface de usuário. |
| **TypeScript** | Superset do JavaScript que adiciona tipagem estática. |
| **Axios** | Cliente HTTP baseado em Promises para fazer requisições à API. |
| **PokeAPI** | API RESTful utilizada para obter todos os dados dos Pokémon. |

## Instalação e Execução

Para configurar e executar o projeto localmente, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o **Node.js** e o **npm** (ou **yarn/pnpm**) instalados em sua máquina.

### 1. Clonar o Repositório

```bash
git clone https://github.com/abraaoBaracho/pokedex.git
cd [pokedex]
```

### 2. Instalar Dependências

Instale as dependências do projeto (principalmente `axios` e as dependências do React):

```bash
npm install
# ou
yarn install
```

### 3. Executar a Aplicação

Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará acessível em `http://localhost:5173` (ou na porta indicada pelo seu ambiente de desenvolvimento).

## Estrutura do Código (Componente `App.tsx`)

O arquivo principal `App.tsx` contém a lógica completa da Pokédex:

*   **`PokemonData` Type:** Define a estrutura de dados para armazenar as informações do Pokémon.
*   **`useState` Hooks:** Gerenciam o estado da aplicação (Pokédex aberta/fechada, Pokémon atual, termo de busca, modo *shiny*).
*   **`useEffect` Hook:** Gerencia o intervalo de animação do botão de abertura da Pokédex.
*   **`getPokemon(pokeSearch)`:** Função assíncrona que faz a requisição à **PokeAPI**, filtra os dados para a Geração IV (ID <= 493) e atualiza o estado do Pokémon.
*   **`pokemonCry()`:** Função para reproduzir o som do Pokémon.
*   **Funções de Navegação:** `getNextPokemon()` e `getPrevPokemon()` para navegação sequencial.
*   **`isShyne()`:** Função para alternar entre as *sprites* normal e *shiny*.
## Organização de Arquivos

* ├── public/
* │   ├── dex_fechada.png
* │   ├── dex_botao1.png
* │   ├── dex_botao2.png
* │   ├── pokedex.png
* │   ├── shiny.png
* │   ├── close.png
* │   ├── notFound.png
* │   └── ...
* ├── src/
* │   ├── App.tsx
* │   ├── App.css
* │   └── main.tsx
* ├── package.json
* ├── tsconfig.json
* └── vite.config.js


## API Utilizada

Este projeto utiliza a **PokeAPI** para obter dados de Pokémon.

*   **Endpoint Principal:** `https://pokeapi.co/api/v2/pokemon/{id_ou_nome}`
*   **Sprites Específicas:** As *sprites* são extraídas do caminho `sprites.versions.generation-iv.heartgold-soulsilver` para garantir a autenticidade visual da Geração IV.

## Contribuição

Contribuições são bem-vindas! Se você tiver sugestões ou quiser relatar um *bug*, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.

## Licença

Este projeto é livre para uso e estudo.
Você pode modificar, melhorar e publicar.

