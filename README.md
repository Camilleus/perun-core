This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architektura ekosystemu Veles Digital

Perun Core jest częścią szerszego ekosystemu narzędzi Veles Digital, zbudowanego zgodnie z architekturą "osobnych systemów" (loose coupling).

### Kluczowe założenia:
1.  **Niezależność systemów:** Perun Core (CRM & Margin Protection) oraz ROD System (Production Management) są w pełni autonomicznymi platformami. Każda posiada własną bazę danych, logikę biznesową i interfejs.
2.  **Opcjonalna integracja:** Systemy mogą działać niezależnie, ale oferują głęboką integrację poprzez API i Webhooki.
3.  **Kierunek danych:** ROD System przesyła dane o rzeczywistych kosztach produkcji do Perun Core, co pozwala na precyzyjne wyliczanie marży rzeczywistej względem planowanej.
4.  **Uwierzytelnianie:** Połączenie następuje poprzez bezpieczny API Key generowany w ROD System i konfigurowany w panelu ustawień organizacji Perun Core.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
