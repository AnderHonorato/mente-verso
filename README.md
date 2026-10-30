# MenteVerso 🧠

Plataforma web de estudos de psicanálise **e programação**, com React, TypeScript e Vite.

## Funcionalidades

- Página inicial pública com notícias externas referenciadas.
- Cinco trilhas e 22 capítulos do livro *Leituras Psicanalíticas sobre os Desafios da Atualidade*.
- Quiz, cartões de memória, progresso salvo localmente, PDF original e PWA.
- Curso de **Programação Guiada**, integrado ao mesmo painel visual: 10 trilhas e 30 aulas publicadas de HTML, CSS, JavaScript, DOM, Python, frontend, backend e projetos.
- Aulas detalhadas do Flow 0.6.0 com explicações, exemplos, questões de resposta única local e laboratório de código com prévia e testes.
- Recursos originais do Flow preservados em `integracoes/flow-programacao/`; a aplicação principal utiliza o currículo e o laboratório diretamente, **sem iframe**.
- **Loko**, mascote original em SVG e CSS, inspirado em um gato cinza com olhos âmbar e sino azul: acompanha o cursor, pode ser arrastado e solto no computador ou celular, pisca, abana o rabo, reage a acertos/erros/leitura e dorme por inatividade.
- Mensagens do Loko podem ser ocultadas e o mascote pode ser recolhido no painel.
- Redução de movimento conforme preferências de acessibilidade.

## Integração e limitações

Esta versão integra o catálogo real e o laboratório do Flow ao MenteVerso; preserva o Loko e as trilhas de psicanálise. O perfil e as respostas do novo curso continuam **locais no navegador**. Não há ainda conta autenticada unificada, pontuação certificada no servidor, ranking global nem emissão de certificados. Alguns recursos originais isolados do Flow (backend, Android e painel administrativo) continuam no diretório importado, aguardando migração. Detalhes em `docs/INTEGRACAO_FLOW.md`.

## Executar

```bash
npm install
npm run dev
```

Para compilar: `npm run build`.

## Observações

O perfil e o progresso são armazenados neste navegador. Não existe autenticação real nem sincronização na nuvem nesta versão. O mascote é vetorial no código; **nenhuma imagem foi gerada ou adicionada**.

## Referência bibliográfica

[Leituras Psicanalíticas sobre os Desafios da Atualidade (EduCAPES)](https://educapes.capes.gov.br/bitstream/capes/704805/2/Leituras%20Psicanal%C3%ADticas%20sobre%20os%20Desafios%20da%20Atualidade.pdf)

## Site

https://menteverso-wmt0j1.v2.appdeploy.ai/
