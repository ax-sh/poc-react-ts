import type { ActionType, NodePlopAPI } from 'plop'

export default function (plop: NodePlopAPI) {
  // create your generators here
  // plop.setGenerator('basics', {
  //   description: 'this is a skeleton plopfile',
  //   prompts: [], // array of inquirer prompts
  //   actions: [], // array of actions
  // })
  const actions: ActionType[] = [
    {
      type: 'add',
      path: 'src/ui/{{kebabCase name}}/{{kebabCase name}}.stories.tsx',
      templateFile: 'templates/component.stories.tsx.hbs',
    },
    {
      type: 'add',
      path: 'src/ui/{{kebabCase name}}/{{kebabCase name}}.tsx',
      templateFile: 'templates/component.tsx.hbs',
    },
  ]
  plop.setGenerator('component', {
    description: 'Generate a new React component with TypeScript',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name please',
      },
    ],
    actions: (data) => {
      console.debug(data)
      return actions
    },
  })
}
