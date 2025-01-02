# Ngxui Builder


#### Packages

| Project            | Package                                                                        | Version                                                                                                                         | Links                                                                                                                                       |
|--------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| **common**         | [`@ngxui/common`](https://www.npmjs.com/package/@ngxui/common)                 | [![latest](https://img.shields.io/npm/v/@ngxui/common/latest.svg)](https://www.npmjs.com/package/@ngxui/common)                 | [![README](https://img.shields.io/badge/README--green.svg)](https://github.com/ngxui/builder/blob/master/packages/common/README.md)         |
| **eval-form-expr** | [`@ngxui/eval-form-expr`](https://www.npmjs.com/package/@ngxui/eval-form-expr) | [![latest](https://img.shields.io/npm/v/@ngxui/eval-form-expr/latest.svg)](https://www.npmjs.com/package/@ngxui/eval-form-expr) | [![README](https://img.shields.io/badge/README--green.svg)](https://github.com/ngxui/builder/blob/master/packages/eval-form-expr/README.md) |
| **form-core**      | [`@ngxui/form-core`](https://www.npmjs.com/package/@ngxui/form-core)           | [![latest](https://img.shields.io/npm/v/@ngxui/form-core/latest.svg)](https://www.npmjs.com/package/@ngxui/form-core)           | [![README](https://img.shields.io/badge/README--green.svg)](https://github.com/ngxui/builder/blob/master/packages/form-core/README.md)      |
| **bulma-form**     | [`@ngxui/bulma-form`](https://www.npmjs.com/package/@ngxui/bulma-form)         | [![latest](https://img.shields.io/npm/v/@ngxui/bulma-form/latest.svg)](https://www.npmjs.com/package/@ngxui/bulma-form)         | [![README](https://img.shields.io/badge/README--green.svg)](https://github.com/ngxui/builder/blob/master/packages/ui/bulma/bulma-form/README.md)     |


To see all available targets to run for a project, run:

```sh
npx nx show project ngxui
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/angular:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/angular:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/angular-standalone-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

