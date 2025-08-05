# TypeScript Notes and Documentation

TypeScript is a statically typed superset of JavaScript that adds type annotations to catch errors during development, improve code readability, and enhance maintainability. This document provides a comprehensive guide to TypeScript, including installation, core features, syntax, and its use across frameworks and libraries.

## Table of Contents
- [What is TypeScript?](#what-is-typescript)
- [Installation and Setup](#installation-and-setup)
- [Core TypeScript Concepts](#core-typescript-concepts)
  - [Type Annotations](#type-annotations)
  - [Interfaces](#interfaces)
  - [Type Inference](#type-inference)
  - [Union and Intersection Types](#union-and-intersection-types)
  - [Generics](#generics)
  - [Type Assertions](#type-assertions)
  - [Modules](#modules)
- [TypeScript with Frameworks and Libraries](#typescript-with-frameworks-and-libraries)
  - [Node.js and Express](#nodejs-and-express)
  - [React](#react)
  - [Firebase](#firebase)
  - [Databases and ORMs](#databases-and-orms)
  - [Other Libraries](#other-libraries)
- [TypeScript Configuration (`tsconfig.json`)](#typescript-configuration-tsconfigjson)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Resources](#resources)

## What is TypeScript?
- **Definition**: TypeScript is an open-source language developed by Microsoft that extends JavaScript with static types. It compiles to plain JavaScript, compatible with any JavaScript runtime (e.g., browsers, Node.js).
- **Benefits**:
  - Catches type errors during development (e.g., passing a `string` to a function expecting a `number`).
  - Improves IDE support with autocompletion and refactoring.
  - Enhances code documentation through explicit types.
- **Use Cases**: Backend (Node.js, Express), frontend (React, Angular), serverless (Firebase, AWS Lambda), and more.

## Installation and Setup
1. **Install Node.js**: Required for TypeScript’s runtime ([download](https://nodejs.org)).
2. **Install TypeScript Globally**:
   ```bash
   npm install -g typescript
   ```
   - Check version: `tsc --version`.
3. **Initialize a Project**:
   ```bash
   mkdir typescript-project
   cd typescript-project
   npm init -y
   tsc --init
   ```
4. **Create `tsconfig.json`**:
   Basic configuration for TypeScript:
   ```json
   {
     "compilerOptions": {
       "target": "es6",
       "module": "commonjs",
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules"]
   }
   ```
   - `strict: true`: Enables strict type checking (recommended).
   - `outDir`: Output directory for compiled JavaScript.
   - `rootDir`: Source directory for TypeScript files.
5. **Install Development Tools**:
   ```bash
   npm install --save-dev ts-node nodemon
   ```
   - `ts-node`: Runs TypeScript files directly.
   - `nodemon`: Auto-restarts server during development.
6. **Create a Sample File** (`src/index.ts`):
   ```typescript
   const message: string = "Hello, TypeScript!";
   console.log(message);
   ```
7. **Compile and Run**:
   ```bash
   tsc
   node dist/index.js
   ```
   Or, with `ts-node`:
   ```bash
   ts-node src/index.ts
   ```

## Core TypeScript Concepts

### Type Annotations
Explicitly define variable, parameter, and return types using `: type`.
```typescript
let name: string = "Alice"; // String type
let age: number = 25; // Number type
let isActive: boolean = true; // Boolean type

function greet(name: string): string {
  return `Hello, ${name}`;
}

// Error: Type 'number' is not assignable to type 'string'
name = 42; // Caught by TypeScript
```

- **Common Types**:
  - `string`, `number`, `boolean`, `any` (avoids type checking), `unknown` (safer than `any`), `void`, `null`, `undefined`.
  - Arrays: `string[]` or `Array<string>`.
  - Objects: `{ key: type }` or interfaces (see below).

### Interfaces
Define object shapes for consistent data structures.
```typescript
interface User {
  id: number;
  name: string;
  email?: string; // Optional property
}

const user: User = {
  id: 1,
  name: "Bob",
  // email is optional
};

// Error: Property 'id' is missing
const invalidUser: User = { name: "Alice" };
```

### Type Inference
TypeScript infers types when not explicitly defined.
```typescript
let count = 10; // Inferred as number
count = "ten"; // Error: Type 'string' is not assignable to type 'number'

function add(a: number, b: number) {
  return a + b; // Inferred as number
}
```

### Union and Intersection Types
- **Union Types** (`|`): Allow multiple types.
  ```typescript
  let id: string | number = 123;
  id = "ABC"; // Valid
  id = true; // Error: Type 'boolean' is not assignable
  ```
- **Intersection Types** (`&`): Combine multiple types.
  ```typescript
  interface Person { name: string; }
  interface Employee { id: number; }
  type Staff = Person & Employee;

  const staff: Staff = { name: "Carol", id: 1 };
  ```

### Generics
Create reusable components with flexible types.
```typescript
function wrap<T>(value: T): T[] {
  return [value];
}

const numbers: number[] = wrap<number>(42); // [42]
const strings: string[] = wrap<string>("hello"); // ["hello"]
```

### Type Assertions
Override TypeScript’s inferred type when you’re certain of the type.
```typescript
let data: any = "hello";
let str: string = data as string; // Assert as string
console.log(str.toUpperCase()); // HELLO
```

### Modules
Use `import`/`export` for modular code.
```typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

// index.ts
import { add } from './math';
console.log(add(2, 3)); // 5
```

## TypeScript with Frameworks and Libraries
TypeScript enhances type safety across various ecosystems. Below are common frameworks and libraries where TypeScript is widely used.

### Node.js and Express
Build REST APIs with typed routes and middleware.
- **Install**:
  ```bash
  npm install express @types/express
  ```
- **Example**:
  ```typescript
  import express, { Express, Request, Response } from 'express';
  const app: Express = express();
  const port: number = parseInt(process.env.PORT || '3000', 10);

  app.get('/hello', (req: Request, res: Response): void => {
    res.json({ message: 'Hello, TypeScript!' });
  });

  app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
  ```

### React
Type components, props, and state.
- **Install**:
  ```bash
  npm install @types/react @types/react-dom
  ```
- **Example**:
  ```typescript
  import React from 'react';
  interface Props {
    title: string;
  }
  const Title: React.FC<Props> = ({ title }) => <h1>{title}</h1>;
  ```

### Firebase
Type Firestore data and Cloud Functions.
- **Install**:
  ```bash
  npm install firebase firebase-admin firebase-functions
  ```
- **Example**:
  ```typescript
  import * as functions from 'firebase-functions';
  import * as admin from 'firebase-admin';
  admin.initializeApp();
  interface Data { id: number; value: string; }
  export const getData = functions.https.onRequest(async (req, res) => {
    const doc: Data = (await admin.firestore().collection('data').doc('1').get()).data() as Data;
    res.json(doc);
  });
  ```

### Databases and ORMs
- **Mongoose (MongoDB)**:
  ```typescript
  import mongoose, { Schema } from 'mongoose';
  interface User { name: string; age: number; }
  const UserSchema: Schema<User> = new Schema({ name: String, age: Number });
  const UserModel = mongoose.model<User>('User', UserSchema);
  ```
- **TypeORM (SQL)**:
  ```typescript
  import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
  @Entity()
  class User {
    @PrimaryGeneratedColumn() id: number;
    @Column() name: string;
  }
  ```

### Other Libraries
- **GraphQL (Apollo Server)**:
  ```typescript
  import { ApolloServer, gql } from 'apollo-server';
  const typeDefs = gql`type User { id: Int! name: String! }`;
  const resolvers = { Query: { user: (): { id: number; name: string } => ({ id: 1, name: "Alice" }) } };
  ```
- **Jest**:
  ```typescript
  import { describe, it, expect } from '@jest/globals';
  describe('add', () => {
    it('adds numbers', () => {
      expect(1 + 2).toBe(3);
    });
  });
  ```

## TypeScript Configuration (`tsconfig.json`)
Customize TypeScript behavior via `tsconfig.json`:
- **Key Options**:
  - `"strict": true`: Enables strict type checking (e.g., `noImplicitAny`, `strictNullChecks`).
  - `"target": "es6"`: Compiles to ES6 JavaScript.
  - `"module": "commonjs"`: For Node.js; use `"esnext"` for modern JavaScript.
  - `"esModuleInterop": true`: Simplifies importing CommonJS modules.
- **Example**:
  ```json
  {
    "compilerOptions": {
      "target": "es6",
      "module": "commonjs",
      "outDir": "./dist",
      "rootDir": "./src",
      "strict": true,
      "esModuleInterop": true
    }
  }
  ```

## Best Practices
1. **Use Explicit Types**:
   - Prefer `: string`, `: number` over `any` for clarity:
     ```typescript
     let id: number = 1; // Good
     let id: any = 1; // Avoid
     ```
2. **Enable Strict Mode**:
   - Set `"strict": true` in `tsconfig.json` to catch errors early.
3. **Use Interfaces for Objects**:
   - Define reusable shapes:
     ```typescript
     interface Config { url: string; port: number; }
     ```
4. **Avoid `any`**:
   - Use `unknown` or specific types instead.
     ```typescript
     let value: unknown = JSON.parse(data);
     if (typeof value === 'string') { /* Safe */ }
     ```
5. **Leverage Type Inference**:
   - Omit types where obvious to reduce boilerplate:
     ```typescript
     let count = 10; // Inferred as number
     ```
6. **Use Generics for Flexibility**:
   ```typescript
   function getFirst<T>(arr: T[]): T {
     return arr[0];
   }
   ```
7. **Type External Libraries**:
   - Install `@types/*` packages (e.g., `npm install @types/express`).
8. **Organize Modules**:
   - Use separate files for types and logic:
     ```typescript
     // types/user.ts
     export interface User { id: number; name: string; }
     ```

## Troubleshooting
- **Type Errors**:
  - Run `tsc` to check for errors.
  - Example: `Type 'string' is not assignable to type 'number'` indicates incorrect type usage.
- **Missing Types**:
  - Install type definitions: `npm install @types/<library>`.
  - Example: `npm install @types/node` for Node.js globals.
- **Module Resolution**:
  - Ensure `"esModuleInterop": true` in `tsconfig.json` for CommonJS modules.
- **Runtime Errors**:
  - TypeScript catches compile-time errors, not runtime. Validate inputs:
    ```typescript
    const id: number = parseInt(input, 10);
    if (isNaN(id)) throw new Error('Invalid ID');
    ```
- **IDE Support**:
  - Use VS Code for autocompletion and error highlighting.

## Resources
- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) (type definitions)
- [TS Node](https://typestrong.org/ts-node/) for running TypeScript directly
- [TypeScript Playground](https://www.typescriptlang.org/play) for experimenting
