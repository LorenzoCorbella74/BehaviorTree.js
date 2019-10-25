const BehaviorTree = require('./BehaviorTree').default

module.exports = {
  BehaviorTree,
  getRegistry: require('./BehaviorTree').getRegistry,
  registryLookUp: require('./BehaviorTree').registryLookUp,

  BehaviorTreeImporter: require('./BehaviorTreeImporter').default,

  InvertDecorator: require('./decorators/InvertDecorator').default,
  AlwaysFailDecorator: require('./decorators/AlwaysFailDecorator').default,
  ConditionDecorator: require('./decorators/ConditionDecorator').default,
  AlwaysSucceedDecorator: require('./decorators/AlwaysSucceedDecorator').default,
  CooldownDecorator: require('./decorators/CooldownDecorator').default,
  LoopDecorator: require('./decorators/LoopDecorator').default,

  BranchNode: require('./BranchNode').default,
  Node: require('./Node').default,
  Selector: require('./Selector').default,
  Sequence: require('./Sequence').default,
  Random: require('./Random').default,
  Decorator: require('./Decorator').default,
  Task: require('./Task').default,
  UtilitySelector: require('./UtilitySelector').default,

  ...require('./constants')
}
