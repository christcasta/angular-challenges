import { fireEvent, render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    describe('When checking the checkbox', () => {
        it('Then button is enabled', async () => {
            await render(AppComponent);
            const checkbox = screen.getByRole('checkbox');
            const button = screen.getByRole('button');
            expect(checkbox).not.toBeChecked();
            expect(button).not.toBeEnabled();
            fireEvent.click(checkbox);
            expect(checkbox).toBeChecked();
            expect(button).toBeEnabled();
        });
    });
});
