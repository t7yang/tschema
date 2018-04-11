import { type } from '../type/type';
import { $$KEY$$ } from './';
import { schema } from './schema';

const mySchema = schema({
  age: type({
    type: 'array',
    schema: type({ type: 'number', default: 20 }),
    default: [],
    isEmpty: false,
  }),
  autoConvert: type({
    type: 'tuple',
    schema: [
      type({
        type: 'string',
        candidates: ['disabled'],
      }),
      type({
        type: 'string',
        candidates: ['s2t'],
      }),
    ],
  }),
  [$$KEY$$]: type({
    type: 'string',
    candidates: ['t7yang', 'felix', 'polo'],
  }),
});

const obj = {
  age: [30],
  author1: 't7yang',
  author2: 'hhh',
  author3: 'felix',
};

export const DictionarySchema = schema({
  default: schema({
    s2t: schema({
      char: type({
        type: 'tuple',
        schema: [
          schema({
            name: type({
              type: 'string',
              candidates: ['預設簡體轉正體單字字典檔'],
            }),
            filename: type({
              type: 'string',
              candidates: ['s2t_char'],
            }),
            type: type({
              type: 'string',
              candidates: ['s2t'],
            }),
            enabled: type({
              type: 'boolean',
              default: true,
            }),
          }),
        ],
      }),
      phrase: type({
        type: 'tuple',
        schema: [
          schema({
            name: type({
              type: 'string',
              candidates: ['預設簡體轉正體詞彙字典檔'],
            }),
            filename: type({
              type: 'string',
              candidates: ['s2t_phrase'],
            }),
            type: type({
              type: 'string',
              candidates: ['s2t'],
            }),
            enabled: type({
              type: 'boolean',
              default: true,
            }),
          }),
        ],
      }),
    }),
    t2s: schema({
      char: type({
        type: 'tuple',
        schema: [
          schema({
            name: type({
              type: 'string',
              candidates: ['預設正體轉簡體單字字典檔'],
            }),
            filename: type({
              type: 'string',
              candidates: ['t2s_char'],
            }),
            type: type({
              type: 'string',
              candidates: ['t2s'],
            }),
            enabled: type({
              type: 'boolean',
              default: true,
            }),
          }),
        ],
      }),
      phrase: type({
        type: 'tuple',
        schema: [
          schema({
            name: type({
              type: 'string',
              candidates: ['預設正體轉簡體詞彙字典檔'],
            }),
            filename: type({
              type: 'string',
              candidates: ['t2s_phrase'],
            }),
            type: type({
              type: 'string',
              candidates: ['t2s'],
            }),
            enabled: type({
              type: 'boolean',
              default: true,
            }),
          }),
        ],
      }),
    }),
  }),
  custom: schema({
    s2t: schema({
      char: type({
        type: 'array',
        isEmpty: true,
        schema: type({ type: 'any' }),
      }),
      phrase: type({
        type: 'tuple',
        schema: [
          schema({
            name: type({
              type: 'string',
              candidates: ['自訂簡體轉正體字典檔'],
            }),
            filename: type({
              type: 'string',
              candidates: ['s2t_phrase'],
            }),
            type: type({
              type: 'string',
              candidates: ['s2t'],
            }),
            enabled: type({
              type: 'boolean',
              default: true,
            }),
            map: schema({
              [$$KEY$$]: type({
                type: 'string',
                default: '<ERR-Convert-Value>',
              }),
            }),
          }),
        ],
      }),
    }),
    t2s: schema({
      char: type({
        type: 'array',
        isEmpty: true,
        schema: type({ type: 'any' }),
      }),
      phrase: type({
        type: 'tuple',
        schema: [
          schema({
            name: type({
              type: 'string',
              candidates: ['預設正體轉簡體詞彙字典檔'],
            }),
            filename: type({
              type: 'string',
              candidates: ['t2s_phrase'],
            }),
            type: type({
              type: 'string',
              candidates: ['t2s'],
            }),
            enabled: type({
              type: 'boolean',
              default: true,
            }),
            map: schema({
              [$$KEY$$]: type({
                type: 'string',
                default: '<ERR-Convert-Value>',
              }),
            }),
          }),
        ],
      }),
    }),
  }),
});

// console.log(mySchema.hasErr(obj), mySchema.from({}));
console.log(JSON.stringify(DictionarySchema.from({}), null, 2));
