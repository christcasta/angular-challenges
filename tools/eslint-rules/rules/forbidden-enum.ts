/**
 * This file sets you up with structure needed for an ESLint rule.
 *
 * It leverages utilities from @typescript-eslint to allow TypeScript to
 * provide autocompletions etc for the configuration.
 *
 * Your rule's custom logic will live within the create() method below
 * and you can learn more about writing ESLint rules on the official guide:
 *
 * https://eslint.org/docs/developer-guide/working-with-rules
 *
 * You can also view many examples of existing rules here:
 *
 * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/rules
 */

import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nx/workspace/forbidden-enum"
export const RULE_NAME = 'forbidden-enum';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
    name: RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: ``,
            recommended: 'recommended',
        },
        schema: [],
        messages: {
            forbiddenEnum: 'Avoid enum, prefer const literal of union types',
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            TSEnumDeclaration(node: TSESTree.TSEnumDeclaration) {
                context.report({
                    node,
                    messageId: 'forbiddenEnum',
                });
            },
        };
    },
});
