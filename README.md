# Demonstração de site profissional — Dev Kayko

Este é um **modelo comercial demonstrativo** baseado na landing page de psicologia. Não é um site oficial e não realiza agendamentos.

## Publicação no GitHub Pages
1. Coloque `index.html`, `style.css`, `script.js` e a pasta `assets/` na raiz do repositório.
2. No GitHub, abra **Settings → Pages → Deploy from a branch → main → / (root)**.
3. Compartilhe o link criado para que potenciais clientes conheçam o modelo.

## Funcionamento
- Botão **Simular contato por WhatsApp** mostra uma mensagem educativa, sem usar telefone ou abrir WhatsApp.
- Faixa superior informa que é uma demonstração.
- Seções originais e apresentação em vídeo preservadas.
- A seção final convida o cliente a solicitar um site por e-mail (abre o aplicativo de e-mail do visitante sem destinatário definido).
- Os arquivos de **foto, assinatura e vídeo originais não foram enviados**. Se disponíveis, coloque `barbara-retrato.jpg`, `logo-assinatura-barbara-rodrigues.png` e `barbara-video.mp4` em `assets/`. Até lá, as imagens mostram substitutos ilustrativos; o vídeo não poderá tocar.

## Para transformar em site real
Obtenha autorização para usar nome, dados, foto e vídeo da profissional e confirme os textos. Em `script.js`, altere `MODO_DEMONSTRACAO` para `false` e informe `WHATSAPP` com DDI, DDD e telefone real, apenas dígitos. Configure o contato e identidade do desenvolvedor. Para uso como portfólio público sem consentimento da profissional, substitua o nome/CRP por dados fictícios e remova referências identificáveis.
