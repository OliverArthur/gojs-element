export default {
  nodeArrayModel: [
    { key: 'Alpha', color: 'lightblue' },
    { key: 'Beta', color: 'orange' },
    { key: 'Gamma', color: 'lightgreen' },
    { key: 'Delta', color: 'pink' }
  ],

  linksNodeArray: [
    { key: -1, from: 'Beta', to: 'Alpha' },
    { key: -2, from: 'Alpha', to: 'Gamma' },
    { key: -3, from: 'Gamma', to: 'Delta' },
    { key: -4, from: 'Delta', to: 'Alpha' }
  ],

  dataModel: {
    canRelink: true
  },
  paletteModel: [
    { category: 'Start', text: 'Start Text' },
    { text: 'StepText' },
    { category: 'Conditional', text: 'ConditionalText' },
    { category: 'End', text: 'EndTitle' },
    { category: 'Comment', text: 'CommentText' }
  ]
}
