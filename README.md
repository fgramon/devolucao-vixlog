# Devoluções — Vix Log

App de recebimento de devoluções para coletores Bluebird e tablets: escolhe o cliente, bipa a chave da DANFE, registra cada volume (estado da embalagem, checklist, fotos) e gera o **relatório da devolução em PDF** para enviar ao cliente.

Funciona como atalho (PWA): este repositório é só a "casca" (GitHub Pages) que abre o app hospedado no Google Apps Script.

## Arquivos deste repositório
- `index.html` — tela de abertura + app em tela cheia (precisa da `APP_URL`)
- `manifest.json`, `sw.js`, `icones/` — instalação como atalho, ícones da marca
- `manual/Manual-Devolucoes-VixLog.pdf` — manual de uso para os conferentes (a primeira página traz o QR code de instalação)
- `manual/qr.png` — QR code do endereço do app (`https://vixloglogistica.github.io/devolucao-vixlog/`)

## Publicação (passo a passo)

### 1. GitHub Pages
1. Repositório público `devolucao-vixlog` → **Settings → Pages → Deploy from a branch → `main` / root**.
2. Endereço final: `https://vixloglogistica.github.io/devolucao-vixlog/`

### 2. Apps Script (o app de verdade)
1. Em <https://script.google.com> → **Novo projeto** → nome "Devoluções Vix Log".
2. Cole `Code.gs` no arquivo padrão; crie o arquivo HTML **`Index`** e cole `Index.html`.
3. Em **Configurações do projeto**, marque "Mostrar arquivo de manifesto" e cole `appsscript.json`.
4. Execute a função **`autorizar`** (menu Executar) e aceite as permissões. Ela cria a pasta `Devoluções Vix Log` e a planilha `Controle de Devoluções Vix Log` no seu Drive.
5. **Implantar → Nova implantação → App da Web**: executar como **eu**, acesso **qualquer pessoa**. Copie a URL terminada em `/exec`.

### 3. Ligar a casca ao app
No `index.html`, troque `COLE_AQUI_A_URL_DO_APPS_SCRIPT` pela URL `/exec` e faça commit.

### 4. Instalar nos aparelhos
Leia o QR code do manual (`manual/qr.png`) com a câmera, ou abra `vixloglogistica.github.io/devolucao-vixlog` no Chrome do coletor/tablet → menu ⋮ → **Adicionar à tela inicial**. O passo a passo para os conferentes está em `manual/Manual-Devolucoes-VixLog.pdf`.

## Como os dados são guardados
- PDF: `Devoluções Vix Log / <Cliente> / <AAAA-MM> / <protocolo> - <Cliente>.pdf`
- Planilha de controle com abas **Devoluções**, **Notas** e **Volumes** (uma linha por volume, com estado e itens reprovados no checklist).
- Fotos ficam dentro do PDF (não são gravadas soltas).
- Lista de clientes: lida da planilha configurada em `CLIENTES_PLANILHA_ID` (com cópia de reserva embutida no código).

## Ajustes em `Code.gs` (bloco `CONFIG`)
- `COMPARTILHAR_LINK` — `true` deixa o PDF como "qualquer pessoa com o link pode ver" (facilita mandar ao cliente); `false` mantém privado.
- Nomes da pasta e da planilha de controle.

## Atualizando o app
Depois de mudar o código no Apps Script: **Implantar → Gerenciar implantações → editar → Nova versão**. A URL não muda.

## Observações
- Itens: ligue "Conferir itens" ao abrir a devolução. Bipe o **DUN** (caixa): na primeira vez o app pede as unidades por caixa e o EAN da unidade, e grava na aba **Produtos** da planilha (os outros coletores passam a reconhecer). Para caixa aberta, marque "Caixa fracionada" e bipe o **EAN** de cada unidade. Lote, validade e avariadas são opcionais. Tudo vai para o PDF e para a aba **Itens**.
- Chave da DANFE: 44 dígitos, validada pelo dígito verificador; aceita o leitor do coletor (teclado) ou a câmera (depende do aparelho).
- Rascunhos ficam salvos no aparelho; se a internet cair no envio, o relatório fica pendente e pode ser reenviado.
