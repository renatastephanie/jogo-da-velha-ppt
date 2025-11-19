# 🕹️ Arcade Clássico: Jogo da Velha & Pedra, Papel e Tesoura

## ✨ Visão Geral

Este projeto é uma demonstração de habilidades em desenvolvimento *front-end* e lógica de programação em JavaScript. Ele combina dois jogos clássicos em uma única aplicação web com um design moderno e temático neon.

O objetivo principal é servir como portfólio no GitHub, destacando o uso de:
* **Controle de Estado** e **Lógica Condicional**.
* **Variáveis CSS** para fácil manutenção de temas.
* **Consumo de API** pública e assíncrono.

---

## 🚀 Funcionalidades

### 1. Jogo da Velha (Tic-Tac-Toe)
* Modo de dois jogadores (X e O).
* Verificação de vitória usando lógica condicional (`winningConditions`).
* Destaque visual (verde neon) da linha vencedora.

### 2. Pedra, Papel e Tesoura (PPT)
* Modo de jogo contra a **CPU** (com lógica de escolha **aleatória**).
* Placar em tempo real.

### 💡 Extra: Integração com API
* Ambos os jogos buscam um **"Conselho Aleatório"** através da [Advice Slip API](https://api.adviceslip.com/) sempre que uma partida ou rodada é finalizada, adicionando um toque de humor e demonstrando requisições assíncronas.

---

## 🎨 Paleta de Cores (Neon Theme)

O projeto utiliza variáveis CSS para gerenciar facilmente a paleta de cores.

| Descrição | Cor | Variável CSS |
| :--- | :--- | :--- |
| Fundo Principal | `#0D0D0D` | `--color-background` |
| Borda/Fundo Secundário | `#1A1A1A` | `--color-board` |
| "X" (Ciano Neon) | `#00E5FF` | `--color-x` |
| "O" (Magenta Neon) | `#FF00E6` | `--color-o` |
| Destaque de Vitória | `#39FF14` | `--color-win` |

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica dos jogos.
* **CSS3:** Estilização responsiva e aplicação de **Variáveis CSS** para o tema neon.
* **JavaScript (ES6+):** Lógica principal, controle de estado, manipulação de DOM e consumo de API.
* **API Externa:** [Advice Slip API](https://api.adviceslip.com/) (para mensagens aleatórias).

## Para visualizar o projeto, clique no link abaixo:
[🔗Clique Aqui](https://jogo-da-velha-ppt.vercel.app/)

---

## ✍️ Autor

| Detalhes | Informação |
| :--- | :--- |
| **Nome** | Renata Stephanie |
| **GitHub** | https://github.com/renatastephanie |
| **LinkedIn** | https://www.linkedin.com/in/renata-stephanie/ |