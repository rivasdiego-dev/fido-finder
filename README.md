<p align="center">
  <a><img src="https://i.imgur.com/BMJr4VC.png" width="100" alt="Fido Finder Logo" /></a>
</p>

  <p align="center">Fido Finder is a web application that runs with <a href="https://es.react.dev/" target="_blank">ReactJS</a>,  a frontend tool that is used for building fast and optimized web applications <a href="https://vitejs.dev/" target="_blank">Vite</a>.
    <p align="center">
<a><img src="https://img.shields.io/badge/npm-v10.3.10-blue" alt="NPM Version" /></a>
<a><img src="https://img.shields.io/badge/license-GPL%20v3-green" alt="Package License" /></a>
<a><img src="https://img.shields.io/badge/build-passing-4cca22" alt="Build" /></a>
</p>

## Description
Fido Finder is a web application where users can post information about their lost pets, including the location where they were lost, pet's name, a photo (optional), and the owner's contact information. Users can prioritize viewing lost pets nearby by sharing their location. The platform facilitates direct contact between the finder and the owner and promotes quick collaboration in locating lost pets.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm run build
$ npm run start
```

## Useful dev notes

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Relevant dependencies

### UI Libraries

- "@tabler/icons-react"

### Form and Validation Libraries

- "@hookform/resolvers"
- "react-hook-form"
- "zod"

### State Management Libraries

- "zustand"

### Utility Libraries

- "axios"
- "sonner"
- "@formkit/tempo"

### Router Libraries

- "react-router-dom"

## Support

This is an open-source project licensed under GPLv3. It can grow thanks to the sponsors and the support of the amazing contributors.

## Stay in touch

- [Carlos Mercado](https://github.com/carlosxmerca)
- [Victor Peraza](https://github.com/Peraza32)
- [Daniel Solis](https://github.com/DanielSolis00209020)
- [Diego Rivas](https://github.com/rivasdiego-dev)
- [Miguel Acosta](https://github.com/Acostam331)

## License

Fido Finder is [GPL v3 Licensed](LICENSE).