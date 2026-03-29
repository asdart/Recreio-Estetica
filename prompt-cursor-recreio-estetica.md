# Prompt inicial para o Cursor — E-commerce Recreio Estética

Quero iniciar um projeto frontend de um e-commerce B2B premium para uma empresa chamada **Recreio Estética**, distribuidora de produtos para harmonização facial e corporal. Este frontend será construído de forma **desacoplada do backend**, pois a integração com **MedusaJS** será feita depois por outro desenvolvedor. Meu foco agora é criar a base do storefront, a arquitetura do projeto, os componentes, os layouts e as páginas com mocks realistas.

## Stack obrigatória
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

## O que quero que você faça primeiro
Crie a estrutura inicial do projeto com foco em escalabilidade e organização para um ecommerce B2B. Quero que você:

1. Configure a base do projeto
2. Estruture as pastas por domínio e responsabilidade
3. Crie um design system inicial
4. Crie dados mockados para permitir desenvolvimento sem backend
5. Monte as páginas principais e componentes-base
6. Prepare uma camada de integração futura para Medusa, sem acoplar a interface ao backend

## Contexto do negócio
A Recreio Estética não é um ecommerce B2C tradicional. É uma operação B2B consultiva. Os clientes são profissionais da área da estética e saúde, e só podem comprar se tiverem validação profissional aprovada, como um CRM ou outro registro equivalente.

A jornada precisa considerar 3 estados principais:
- visitante
- usuário logado não validado
- usuário validado

A compra só pode acontecer para usuários aprovados. Usuários pendentes devem ser bloqueados no checkout e orientados a aguardar validação.

Além do checkout tradicional, o site também deve oferecer um fluxo consultivo via **WhatsApp**, permitindo ao usuário enviar o carrinho ou tirar dúvidas sobre produtos.

## Direção de produto
Esse projeto deve parecer uma mistura de:
- ecommerce premium
- catálogo técnico
- experiência editorial
- venda consultiva com WhatsApp

Não quero visual de marketplace ou loja genérica. Quero algo que pareça premium, limpo, moderno, confiável e com bastante whitespace.

## Referências visuais
Use estas referências como direção estética:
- onskn.com
- lore.world
- coreatelierpilates.com
- overlay.com

Traduza essas referências em:
- layout editorial
- tipografia elegante
- muito espaço em branco
- sensação premium e clínica
- blocos bem organizados
- hierarquia sofisticada
- visual moderno e refinado

## Referências de conteúdo e estrutura de PDP
Use estes concorrentes como referência para densidade de informação e estrutura do conteúdo:
- ecommerce.velloziaoficial.com.br
- dermalink.com.br

A PDP deve considerar conteúdo como:
- galeria de imagens
- descrição detalhada
- informações técnicas
- indicação de uso
- composição
- volume
- benefícios
- FAQ
- CTA de WhatsApp
- CTA de adicionar ao carrinho

## Regras de UX importantes
- o usuário pode navegar sem login
- a compra exige conta e validação profissional
- o CTA da PDP deve mudar conforme o estado do usuário
- o carrinho deve permitir:
  - seguir para checkout
  - enviar pedido via WhatsApp
- o checkout deve bloquear usuários não aprovados
- deve existir fluxo de cadastro com envio de registro profissional
- deve existir tela de aguardando validação
- deve existir estado de conta aprovada
- deve existir estado de conta recusada ou com necessidade de correção

## Estrutura desejada
Crie uma arquitetura parecida com esta:

src/
  app/
    (public)/
    (auth)/
    (account)/
    (checkout)/
  components/
    ui/
    layout/
    product/
    cart/
    checkout/
    auth/
    account/
    commerce/
  features/
    auth/
    products/
    categories/
    cart/
    checkout/
    customer/
    professional-validation/
    orders/
    whatsapp/
  lib/
    medusa/
    utils/
    constants/
  hooks/
  types/
  mocks/

## Páginas que quero já preparadas
### Públicas
- Home
- Loja / PLP
- PDP / Produto
- Sobre
- Contato
- Eventos e Workshops

### Auth
- Login
- Criar conta
- Enviar registro profissional
- Aguardando validação
- Conta aprovada
- Conta recusada

### Área do cliente
- Minha conta
- Meus dados
- Meus pedidos
- Recompras
- Endereços

### Compra
- Carrinho
- Checkout
- Sucesso
- Erro

## Componentes que quero como base
Crie componentes reutilizáveis para:
- Header
- Footer
- Mega menu ou navegação principal
- Product card
- Product gallery
- Product info
- Technical specs
- FAQ accordion
- WhatsApp CTA
- Price block
- Validation status banner
- Cart item
- Order card
- Address card
- Auth form
- Status state
- Empty state
- Loading state

## Design system
Monte uma base visual consistente usando Tailwind e shadcn. Quero:
- spacing system claro
- radius consistente
- shadows suaves
- tipografia com aparência editorial e premium
- grid responsivo
- componentes com aparência minimalista
- UI sofisticada, sem excesso de bordas e sem cara de template genérico

## Importante sobre arquitetura
Quero que os componentes sejam separados entre:
- componentes visuais puros
- componentes conectados a estado e dados mockados

Exemplo:
- ProductCardView
- ProductCard

Quero evitar acoplamento prematuro com backend.

## Mocks obrigatórios
Crie dados mockados para:
- produtos
- categorias
- marcas
- usuário visitante
- usuário pendente
- usuário aprovado
- usuário recusado
- carrinho vazio
- carrinho com itens
- pedidos
- endereços

## Tipos importantes
Crie tipos para entidades principais, incluindo um estado de validação profissional como:

```ts
type ProfessionalValidationStatus =
  | "not_submitted"
  | "pending"
  | "approved"
  | "rejected"
```

Também crie um tipo de acesso do usuário com flags como:
- isLoggedIn
- validationStatus
- canSeePrice
- canCheckout

## Primeira entrega que eu quero do Cursor
Quero que você comece criando:
1. a estrutura de pastas
2. os tipos principais
3. os mocks principais
4. os tokens e componentes base do design system
5. o layout global
6. a Home, PLP e PDP com conteúdo mockado
7. o fluxo inicial de Login / Cadastro / Aguardando validação
8. o Carrinho com opção de checkout e WhatsApp

## Como implementar
- use boas práticas de componentização
- prefira código limpo e legível
- não crie lógica falsa complexa demais
- use mocks simples mas realistas
- deixe a base pronta para integração futura com Medusa em `lib/medusa`
- comente brevemente apenas onde for útil
- mantenha consistência visual entre todas as páginas

## Resultado esperado
Quero sair dessa primeira etapa com um storefront funcional em frontend, navegável, com aparência premium, fluxo B2B claro, estados de validação simulados e base pronta para integração com Medusa depois.
