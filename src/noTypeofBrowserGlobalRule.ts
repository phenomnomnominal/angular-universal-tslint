// Dependencies:
import { tsquery } from '@phenomnomnominal/tsquery';
import { RuleFailure, Rules } from 'tslint';
import { SourceFile } from 'typescript';

// Constants:
const BROWSER_GLOBALS = ['document', 'location', 'navigator', 'window'];
const BROWSER_GLOBAL_IDENTIFIER = `TypeOfExpression > Identifier[name=/${BROWSER_GLOBALS.join('|')}/]`;
const TYPEOF_EQUALS_UNDEFINED_QUERY = 'BinaryExpression:has(TypeOfExpression):has(StringLiteral[text="undefined"])';

const FAILURE_MESSAGE = (api: string) => `
    
    It's a bad idea to use 'typeof' to check for access to the '${api}' API. Try to avoid using DOM APIs directly,
    and instead use Angular's abstractions.

`;

export class Rule extends Rules.AbstractRule {
    public apply(sourceFile: SourceFile): Array<RuleFailure> {
        const potentialErrors = tsquery(sourceFile, TYPEOF_EQUALS_UNDEFINED_QUERY);
        return potentialErrors.map(result => {
            const [globalIdentifier] = tsquery(result, BROWSER_GLOBAL_IDENTIFIER);
            if (globalIdentifier) {
                return new RuleFailure(result.getSourceFile(), result.getStart(), result.getEnd(), FAILURE_MESSAGE(globalIdentifier.name as string), this.ruleName);
            }
        })
        .filter(Boolean) as Array<RuleFailure>;
    }
}
