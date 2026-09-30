# Devoluções — Vix Log

App de recebimento de devoluções para coletores Bluebird e tablets: escolhe o cliente, bipa a chave da DANFE, registra cada volume (estado da embalagem, checklist, fotos) e gera o **dossiê da devolução em PDF** para enviar ao cliente.

Funciona como atalho (PWA): este repositório é só a "casca" (GitHub Pages) que abre o app hospedado no Google Apps Script.

## Arquivos deste repositório
- `index.html` — tela de abertura + app em tela cheia (precisa da `APP_URL`)
- `manifest.json`, `sw.js`, `icones/` — instalação como atalho, ícones da marca

## Publicação (passo a passo)

### 1. GitHub Pages
1. Repositório público `devolucao-vixlog` → **Settings → Pages → Deploy from a branch → `main` / root**.
2. Endereço final: `https://fgramon.github.io/devolucao-vixlog/`

### 2. Apps Script (o app de verdade)
1. Em <https://script.google.com> → **Novo projeto** → nome "Devoluções Vix Log".
2. Cole `Code.gs` no arquivo padrão; crie o arquivo HTML **`Index`** e cole `Index.html`.
3. Em **Configurações do projeto**, marque "Mostrar arquivo de manifesto" e cole `appsscript.json`.
4. Execute a função **`autorizar`** (menu Executar) e aceite as permissões. Ela cria a pasta `Devoluções Vix Log` e a planilha `Controle de Devoluções Vix Log` no seu Drive.
5. **Implantar → Nova implantação → App da Web**: executar como **eu**, acesso **qualquer pessoa**. Copie a URL terminada em `/exec`.

### 3. Ligar a casca ao app
No `index.html`, troque `COLE_AQUI_A_URL_DO_APPS_SCRIPT` pela URL `/exec` e faça commit.

### 4. Instalar nos aparelhos
Abra o endereço do GitHub Pages no Chrome do coletor/tablet → menu ⋮ → **Adicionar à tela inicial**.

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
- Itens (EAN/DUN): ligue "Conferir itens" ao abrir a devolução; cada bipe soma 1 na quantidade; lote, validade e avariadas são opcionais. Vão para o PDF e para a aba **Itens** da planilha.
- Chave da DANFE: 44 dígitos, validada pelo dígito verificador; aceita o leitor do coletor (teclado) ou a câmera (depende do aparelho).
- Rascunhos ficam salvos no aparelho; se a internet cair no envio, o dossiê fica pendente e pode ser reenviado.
