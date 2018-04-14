# t7schema

A schema validator that able check data and create a value from it. Inspired by TypeScript types system.

## CAUTION

Do not use in production till 1.0.0 release, currently it just a very early alpha version.

## Check Types

Pretty much same with TypeScript, support checking types including string, number, boolean, any, array, and tuple. Schema itself can contain either a type (which one of the six types above) or a schema.

## Usage

How to create a type, validate, and create data from it:

```typescript
import { type } from 't7schema';

const myType = type({
  type: 'string',
  default: 'orange',
  candidates: ['orange', 'apple', 'pear'],
});

myType.hasErr('apple'); // false
myType.hasErr('appl'); // true
myType.from('appl'); // orange, error, so fallback to default
```

Schema can do exactly the same thing:

```typescript
import { type, schema } from 't7schema';

const mySchema = schema({
  role: type({
    type: 'string',
    candidates: ['admin', 'user', 'guest'],
  }),
  age: type({
    type: 'number',
    default: 18,
    min: 18,
  }),
  address: schema({
    street: type({
      type: 'string',
      default: '',
    }),
    country: type({
      type: 'string',
      candidates: ['Taiwan', 'Malaysia'],
    }),
  }),
});

schema.hasErr({
  role: 'user',
  age: 20,
  address: {
    street: 'daxue',
    country: 'Taiwan',
  },
}); // false

schema.create({});
/* if nothing given, the default / candidates value will be provided
{
  role: 'admin',
  age: 18,
  address: { street: undefined, country: 'Taiwan' }
}
*/
```
