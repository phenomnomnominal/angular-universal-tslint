// Dependencies:
import { tsquery } from '@phenomnomnominal/tsquery';
import { RuleFailure, Rules } from 'tslint';
import { SourceFile } from 'typescript';

// Constants:
const IS_PLATFORM_IDENTIFIER_QUERY = 'Identifier[name=/isPlatform(Browser|Server)/]';
const IS_PLATFORM_IMPORT_QUERY = `ImportDeclaration:has(StringLiteral[value="@angular/common"]):has(ImportSpecifier > ${IS_PLATFORM_IDENTIFIER_QUERY})`;
const IS_PLATFORM_CALL_EXPRESSION_QUERY = `CallExpression > ${IS_PLATFORM_IDENTIFIER_QUERY}`;

const FAILURE_MESSAGE = (check: string) => `

    It's a bad idea to use "${check}" to determine which platform is currently running.
    If possible, extract the functionality to a service, and provide a different implementation
    for the different platforms.

`;

export class Rule extends Rules.AbstractRule {
    public apply(sourceFile: SourceFile): Array<RuleFailure> {
        if (!tsquery(sourceFile, IS_PLATFORM_IMPORT_QUERY).length) {
            return [];
        }

        return tsquery(sourceFile, IS_PLATFORM_CALL_EXPRESSION_QUERY).map(result => {
            return new RuleFailure(result.getSourceFile(), result.getStart(), result.getEnd(), FAILURE_MESSAGE(result.name as string), this.ruleName);
        });
    }
}
