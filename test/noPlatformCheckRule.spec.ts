// Test Utilities:
import { ast, expect } from './index';

// Under test:
import { Rule } from '../src/noPlatformCheckRule';

describe('no-platform-check', () => {
    it('should fail when `isPlatformBrowser` is imported and used', () => {
        const sourceFile = ast(`
            import { isPlatformBrowser } from '@angular/common';

            isPlatformBrowser();
        `);

        const errors = Rule.prototype.apply(sourceFile);
        const [error] = errors;

        expect(errors.length).to.equal(1);
        expect(error.getFailure()).to.include(`It's a bad idea to use "isPlatformBrowser" to determine which platform is currently running.`);
    });

    it('should fail when `isPlatformServer` is imported and used', () => {
        const sourceFile = ast(`
            import { isPlatformServer } from '@angular/common';

            isPlatformServer();
        `);

        const errors = Rule.prototype.apply(sourceFile);
        const [error] = errors;

        expect(errors.length).to.equal(1);
        expect(error.getFailure()).to.include(`It's a bad idea to use "isPlatformServer" to determine which platform is currently running.`);
    });

    it('should not fail when `isPlatformBrowser` is used, but not imported', () => {
        const sourceFile = ast(`
        isPlatformBrowser();
        `);

        const errors = Rule.prototype.apply(sourceFile).length;

        expect(errors).to.equal(0);
    });

    it('should not fail when `isPlatformServer` is used, but not imported', () => {
        const sourceFile = ast(`
            isPlatformServer();
        `);

        const errors = Rule.prototype.apply(sourceFile).length;

        expect(errors).to.equal(0);
    });
});
