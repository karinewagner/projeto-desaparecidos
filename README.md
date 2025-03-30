# Projeto Desaparecidos

![Badge](https://img.shields.io/badge/Status-Desenvolvimento%20Concluído-green) ![License](https://img.shields.io/badge/License-MIT-blue)

Este projeto foi desenvolvido como parte de um processo seletivo para a vaga de Desenvolvedor Front-End, realizado pelo SEPLAG em 2025. Ele consiste em uma aplicação web para consulta de pessoas desaparecidas, utilizando dados da API da Polícia Judiciária Civil de Mato Grosso.

#### 🔗 Link para visualização do projeto: https://projeto-desaparecidos.netlify.app/

## 🚀 Tecnologias Utilizadas

- **Angular 19.2.4** - Framework principal para desenvolvimento da aplicação.
- **Tailwind CSS** - Para estilização responsiva e moderna.
- **HttpClient do Angular** - Para requisições HTTP e consumo da API.
- **Lazy Loading Routes** - Para carregamento eficiente das páginas.
- **Docker** - Para empacotamento da aplicação em um container isolado.

## 📌 Funcionalidades

### 1️⃣ Tela Inicial
- 📌 Exibe uma lista de pessoas desaparecidas ou localizadas em forma de cards.
- 📷 Cada card contém a imagem e informações básicas sobre o caso.
- 🔄 Implementação de paginação para exibir pelo menos 10 registros por vez.
- 🔍 Barra de pesquisa para filtrar os resultados com base nos parâmetros da API.

### 2️⃣ Tela de Detalhamento
- 🔗 Ao clicar no botão de mais detalhes em um card, o usuário é redirecionado para a tela de detalhes do desaparecido.
- 📝 Exibe informações adicionais sobre a pessoa.
- 🎨 Destaque visual para a situação do desaparecido (desaparecido/localizado).

### 3️⃣ Tela de Inclusão de Informações
- 📨 Permite ao cidadão enviar informações sobre uma pessoa desaparecida.
- 🔢 Implementação de máscaras de formatação para entrada de dados.
- 🖼 Upload de fotografias.

## 🛠 Instalação e Execução

### ⚡ Pré-requisitos
Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.dev/tools/cli)
- [Docker](https://www.docker.com/)

### 🔧 Rodando o projeto localmente

1️⃣ Clone o repositório:
```bash
git clone https://github.com/karinewagner/projeto-desaparecidos.git
```
2️⃣ Acesse o diretório do projeto:
```bash
cd projeto-desaparecidos
```
3️⃣ Instale as dependências:
```bash
npm install
```
4️⃣ Inicie o servidor de desenvolvimento:
```bash
ng serve
```
5️⃣ Acesse no navegador:
```bash
http://localhost:4200/
```

### 🐳 Rodando com Docker
1️⃣ Construa a imagem Docker:
```bash
docker build -t projeto-desaparecidos .
```

2️⃣ Execute o container:
```bash
docker run -p 4200:4200 projeto-desaparecidos
```

📬 Contato

Para dúvidas ou sugestões, entre em contato pelo e-mail: [karinedwagner@gmail.com](mailto:karinedwagner@gmail.com)
