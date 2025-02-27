import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
    ComponentFixture,
    ComponentFixtureAutoDetect,
    TestBed,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ChildComponent } from './child.component';

import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';

import { HarnessLoader } from '@angular/cdk/testing';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
describe('ChildComponent', () => {
    let fixture: ComponentFixture<ChildComponent>;
    let loader: HarnessLoader;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                MatSliderModule,
                MatCheckboxModule,
                MatInputModule,
                MatIconModule,
                ChildComponent,
            ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true },
            ],
        });
        fixture = TestBed.createComponent(ChildComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
    });
    describe('When init', () => {
        test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
            const slider = await loader.getAllHarnesses(MatSliderHarness);
            const checkboxs = await loader.getAllHarnesses(MatCheckboxHarness);
            const inputs = await loader.getAllHarnesses(MatInputHarness);
            const buttons = await loader.getAllHarnesses(MatIconHarness);
            expect(slider.length).toBe(1);
            expect(checkboxs.length).toBe(3);
            expect(inputs.length).toBe(4);
            expect(buttons.length).toBe(2);
        });

        test('Then initial value of slider thumb is 0', async () => {
            const slider = await loader.getHarness(MatSliderHarness);
            const thumb = await slider.getEndThumb();
            expect(await thumb.getValue()).toBe(0);
        });
    });

    describe('Given maxValue set to 109', () => {
        test('Then slider max value is 109', async () => {
            const slider = await loader.getHarness(MatSliderHarness);
            const maxValInput = await loader.getHarness(
                MatInputHarness.with({ selector: '#input-max' }),
            );
            await maxValInput.setValue('109');
            expect(await slider.getMaxValue()).toBe(109);
        });
    });

    describe('When disabled checkbox is toggled', () => {
        test('Then slider is disabled', async () => {
            const checkbox = await loader.getHarness(
                MatCheckboxHarness.with({ label: 'Disabled' }),
            );
            const slider = await loader.getHarness(MatSliderHarness);
            await checkbox.isChecked();
            expect(await slider.isDisabled());
        });
    });

    describe('Given step value set to 5, and When clicking on forward button two times', () => {
        test('Then thumb value is 10', async () => {
            const slider = await loader.getHarness(MatSliderHarness);
            const stepValInput = await loader.getHarness(
                MatInputHarness.with({ selector: '#input-step' }),
            );
            const buttons = await loader.getAllHarnesses(MatButtonHarness);
            const forwardButtons = buttons[1];
            await stepValInput.setValue('5');
            await forwardButtons.click();
            await forwardButtons.click();
            const thumb = await slider.getEndThumb();
            expect(await thumb.getValue()).toBe(10);
        });
    });

    describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
        test('Then slider value is still 5', async () => {
            const slider = await loader.getHarness(MatSliderHarness);
            const stepValInput = await loader.getHarness(
                MatInputHarness.with({ selector: '#input-step' }),
            );
            const thumb = await slider.getEndThumb();
            await thumb.setValue(5);
            await stepValInput.setValue('6');
            const buttons = await loader.getAllHarnesses(MatButtonHarness);
            const backwardButtons = buttons[0];
            await backwardButtons.click();
            expect(await thumb.getValue()).toBe(5);
        });
    });
});
