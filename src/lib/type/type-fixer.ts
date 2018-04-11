import { pipe } from 'ramda';

import { fixArray, fixBy, fixByCandidate, fixByDefault, FixerStatus, fixTuple } from './err-fixer';

export { FixerStatus };

const commonFixer = pipe(fixBy(fixByDefault));

const candFixer = pipe(commonFixer, fixBy(fixByCandidate));

export const stringFixer = candFixer;

export const numberFixer = candFixer;

export const booleanFixer = commonFixer;

export const arrayFixer = pipe(commonFixer, fixBy(fixArray));

export const tupleFixer = pipe(commonFixer, fixBy(fixTuple));
