import { FAILURE } from '../constants'
import Decorator from '../Decorator'

/*
Invocata con:

    new ConditionDecorator({
      config: { condition: conditionFn },
      node: new Sequence({
        nodes: ["initAction", "secondAction"]
      })
    })

*/

export default class ConditionDecorator extends Decorator {
  //nodeType = 'ConditionDecorator'

  setConfig({ condition = () => {} }) {
    this.config = {
      condition
    };
  }

  decorate(run) {
    if (this.config.condition()) {
      const result = run();
      return result;
    }
    return FAILURE;
  }
}