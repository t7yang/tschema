// import { schema } from '../schema/schema';
import { type } from './type';

const myType = type({
  type: 'array',
  isEmpty: false,
  schema: type({ type: 'string', candidates: ['s2t', 't2s'] }),
});

console.log(myType.from(['s2tr', 't2s']));
