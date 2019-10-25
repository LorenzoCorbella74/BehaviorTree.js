import { RUNNING, FAILURE } from './constants'

const NOOP = () => { }

export default class Node {
  nodeType = 'Node'

  constructor({ utilityFn = NOOP, canRun = NOOP, run = NOOP, start = NOOP, end = NOOP, ...props }) {
    this.blueprint = { utilityFn, canRun, run, start, end, ...props }
  }

  run (blackboard, { rerun = false, runData, registryLookUp = x => x, ...config } = {}) {
    if (!rerun) this.blueprint.start(blackboard)
    let result;
    if (this.blueprint.canRun && typeof this.blueprint.canRun === "function") {
      if (this.blueprint.canRun(blackboard)) {
        result = this.blueprint.run(blackboard, { ...config, rerun, runData, registryLookUp })
      } else {
        result = FAILURE;
      }
    } else {
      result = this.blueprint.run(blackboard, { ...config, rerun, runData, registryLookUp })
    }

    if (result !== RUNNING) {
      this.blueprint.end(blackboard)
    }
    if (runData) {
      runData.push({
        name: this.name,
        type: this.nodeType,
        result
      })
    }
    return result
  }

  collectData () {
    return {
      name: this.name,
      type: this.nodeType
    }
  }

  get name () {
    return this._name || this.blueprint.name
  }

  set name (name) {
    this._name = name
  }
}
