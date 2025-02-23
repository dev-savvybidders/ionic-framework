import { testPopover } from '../test.utils';
import { newE2EPage } from '@stencil/core/testing';

const DIRECTORY = 'basic';

const getActiveElementText = async (page) => {
  const activeElement = await page.evaluateHandle(() => document.activeElement);
  return await page.evaluate(el => el && el.textContent, activeElement);
}

test('popover: focus trap', async () => {
  const page = await newE2EPage({ url: '/src/components/popover/test/basic?ionic:_testing=true' });

  await page.click('#basic-popover');
  await page.waitForSelector('#basic-popover');

  let popover = await page.find('ion-popover');

  expect(popover).not.toBe(null);
  await popover.waitForVisible();

  await page.keyboard.press('Tab');

  const activeElementText = await getActiveElementText(page);
  expect(activeElementText).toEqual('Item 0');

  await page.keyboard.down('Shift');
  await page.keyboard.press('Tab');
  await page.keyboard.up('Shift');

  const activeElementTextTwo = await getActiveElementText(page);
  expect(activeElementTextTwo).toEqual('Item 3');

  await page.keyboard.press('Tab');

  const activeElementTextThree = await getActiveElementText(page);
  expect(activeElementTextThree).toEqual('Item 0');
});

test('popover: basic', async () => {
  await testPopover(DIRECTORY, '#basic-popover');
});

test('popover: translucent', async () => {
  await testPopover(DIRECTORY, '#translucent-popover');
});

test('popover: long list', async () => {
  await testPopover(DIRECTORY, '#long-list-popover');
});

test('popover: no event', async () => {
  await testPopover(DIRECTORY, '#no-event-popover');
});

test('popover: custom class', async () => {
  await testPopover(DIRECTORY, '#custom-class-popover');
});

test('popover: header', async () => {
  await testPopover(DIRECTORY, '#header-popover');
});

test('popover: translucent header', async () => {
  await testPopover(DIRECTORY, '#translucent-header-popover');
});

/**
 * RTL Tests
 */

test('popover:rtl: basic', async () => {
  await testPopover(DIRECTORY, '#basic-popover', true);
});

test('popover:rtl: translucent', async () => {
  await testPopover(DIRECTORY, '#translucent-popover', true);
});

test('popover:rtl: long list', async () => {
  await testPopover(DIRECTORY, '#long-list-popover', true);
});

test('popover:rtl: no event', async () => {
  await testPopover(DIRECTORY, '#no-event-popover', true);
});

test('popover:rtl: custom class', async () => {
  await testPopover(DIRECTORY, '#custom-class-popover', true);
});

test('popover:rtl: header', async () => {
  await testPopover(DIRECTORY, '#header-popover', true);
});

test('popover:rtl: translucent header', async () => {
  await testPopover(DIRECTORY, '#translucent-header-popover', true);
});

test('popover: htmlAttributes', async () => {
  const page = await newE2EPage({ url: '/src/components/popover/test/basic?ionic:_testing=true' });

  await page.click('#basic-popover');
  await page.waitForSelector('#basic-popover');

  let alert = await page.find('ion-popover');

  expect(alert).not.toBe(null);
  await alert.waitForVisible();

  const attribute = await page.evaluate((el) => document.querySelector('ion-popover').getAttribute('data-testid'));

  expect(attribute).toEqual('basic-popover');
});
