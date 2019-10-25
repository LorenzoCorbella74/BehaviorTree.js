import { RUNNING } from './constants'
import Node from './Node'

function findIndexOfMax(arr) {
  let max = 0;
  let index;
  arr.forEach(e => {
    if (e.utility !== isNaN(e) && e.utility > max) {
      max = e.utility;
      index = e.index;
    }
  });
  return index;
}

export default class UtilitySelector extends Node {
  nodeType = 'UtilitySelector'

  constructor(blueprint) {
    super(blueprint)

    this.numNodes = blueprint.nodes.length
  }

  run (blackboard = null, { indexes = [], rerun, runData, registryLookUp = x => x, ...config } = {}) {
    const subRunData = runData ? [] : null;

    // calculating all the utilities
    let utilities = [];
    this.blueprint.nodes.forEach((element, index) => {
      let node = registryLookUp(element).blueprint;
      if (node.utilityFn && typeof node.utilityFn === "function") {
        utilities.push({ index, utility: node.utilityFn(blackboard) });
      }
    });

    // running only the one with highest utility
    let indexOfMax = findIndexOfMax(utilities);
    let choosenNode = registryLookUp(this.blueprint.nodes[indexOfMax]).blueprint;
    if (!rerun) choosenNode.start(blackboard);
    let result;
    if (choosenNode.canRun && typeof choosenNode.canRun === "function") {
      if (choosenNode.canRun(blackboard)) {
        result = choosenNode.run(blackboard, {
          ...config,
          rerun,
          runData,
          registryLookUp
        });
      } else {
        result = FAILURE;
      }
    } else {
      result = choosenNode.run(blackboard, {
        ...config,
        rerun,
        runData,
        registryLookUp
      });
    }
    if (result !== RUNNING) {
      choosenNode.end(blackboard);
    }

    return result;
  }

  get collectData () {
    return {
      name: this.name,
      type: this.nodeType,
      nodes: this.nodes.map(node => node.collectData())
    }
  }
}
