# React + TypeScript + Vite + shadcn/ui

This is a template for a new Vite project with React, TypeScript, and shadcn/ui.

## Backend

Set `VITE_BACKEND_URL` in `.env.local` to the backend origin (see `.env.example`). Authentication requests include cookies, so the backend must allow credentialed requests from the frontend origin.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `src/components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button"
```
