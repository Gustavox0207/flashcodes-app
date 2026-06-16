# FlashCodes 📱

O **FlashCodes** é um aplicativo móvel desenvolvido para auxiliar desenvolvedores no estudo e memorização de conceitos de programação através de flashcards. O app combina a flexibilidade de criar seus próprios cartões com a conveniência de consumir questões dinâmicas de APIs externas.

## 🚀 Funcionalidades

- **Autenticação Segura:** Sistema de login e cadastro integrado ao Firebase.
- **Cofre de Estudos:** Dashboard que mescla flashcards personalizados do usuário com questões técnicas da **QuizAPI**.
- **Criação de Cards:** Interface intuitiva para adicionar novos cartões com suporte a blocos de código.
- **Navegação Fluida:** Menu lateral (Drawer) e navegação por pilhas (Stack) para uma experiência nativa.
- **Design Moderno:** Interface com tema dark e estética neon focada na experiência do desenvolvedor.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando o ecossistema moderno de desenvolvimento móvel:

- **Framework:** [React Native](https://reactnative.dev/) com [Expo](https://expo.dev/) (SDK 54).
- **Linguagem:** JavaScript (ES6+).
- **Navegação:** [React Navigation](https://reactnavigation.org/) (Stack & Drawer).
- **Backend:** [Firebase](https://firebase.google.com/) (Authentication & Firestore).
- **API Externa:** [QuizAPI.io](https://quizapi.io/) para geração dinâmica de questões de JavaScript.
- **Ícones:** [Expo Vector Icons](https://docs.expo.dev/guides/icons/).

## 📦 Instalação e Execução

Para rodar o projeto localmente em seu ambiente de desenvolvimento, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Gustavox0207/flashcodes-app.git
   cd flashcodes-app
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o Firebase:**
   Certifique-se de que o arquivo `src/config/firebase.js` contém as credenciais corretas do seu projeto Firebase.

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npx expo start
   ```

5. **Execute no dispositivo:**
   - Use o app **Expo Go** no seu celular (Android/iOS) para escanear o QR Code.
   - Ou pressione `a` para Android (emulador) ou `i` para iOS (simulador).

## 🔧 Correções Recentes

O projeto passou por uma atualização técnica importante para garantir o funcionamento da API:
- **Autenticação de API:** Migração para o sistema de headers `Authorization: Bearer` da QuizAPI v2.
- **Mapeamento de Dados:** Ajuste no parser JSON para compatibilidade com a nova estrutura de dados da API.
- **Navegação Reativa:** Implementação do `useFocusEffect` no Dashboard para garantir que a lista de cards seja atualizada sempre que o usuário retornar à tela.

## 📄 Licença

Este projeto é para fins educacionais. Sinta-se à vontade para clonar e adaptar para seus próprios estudos.

---
Desenvolvido por **Gustavo** e aprimorado com auxílio de **Manus AI**.
