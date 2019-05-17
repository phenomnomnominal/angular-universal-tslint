// Test Utilities:
import { ast, expect } from './index';

// Under test:
import { Rule } from '../src/noTypeofBrowserGlobalRule';

describe('no-typeof-browser-global', () => {
    it('should fail when `typeof` is used to check for "document"', () => {
        const sourceFile = ast(`
            typeof document === 'undefined';
        `);

        const errors = Rule.prototype.apply(sourceFile);
        const [error] = errors;

        expect(errors.length).to.equal(1);
        expect(error.getFailure()).to.include(`It's a bad idea to use 'typeof' to check for access to the 'document' API.`);
    });

    it('should fail when `typeof` is used to check for "location"', () => {
        const sourceFile = ast(`
            typeof location === 'undefined';
        `);

        const errors = Rule.prototype.apply(sourceFile);
        const [error] = errors;

        expect(errors.length).to.equal(1);
        expect(error.getFailure()).to.include(`It's a bad idea to use 'typeof' to check for access to the 'location' API.`);
    });

    it('should fail when `typeof` is used to check for "navigator"', () => {
        const sourceFile = ast(`
            typeof navigator === 'undefined';
        `);

        const errors = Rule.prototype.apply(sourceFile);
        const [error] = errors;

        expect(errors.length).to.equal(1);
        expect(error.getFailure()).to.include(`It's a bad idea to use 'typeof' to check for access to the 'navigator' API.`);
    });

    it('should fail when `typeof` is used to check for "window"', () => {
        const sourceFile = ast(`
            typeof window === 'undefined';
        `);

        const errors = Rule.prototype.apply(sourceFile);
        const [error] = errors;

        expect(errors.length).to.equal(1);
        expect(error.getFailure()).to.include(`It's a bad idea to use 'typeof' to check for access to the 'window' API.`);
    });

    it('should not fail when `typeof` is used to check for some other variable', () => {
        const sourceFile = ast(`
            typeof foo === 'undefined';
        `);

        const errors = Rule.prototype.apply(sourceFile);

        expect(errors.length).to.equal(0);
    });
});
