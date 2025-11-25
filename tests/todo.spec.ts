import { test, expect, Page, Locator } from '@playwright/test';

test('Add 100 TODO items', async ({ page }: { page: Page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  const input: Locator = page.getByPlaceholder('What needs to be done?');

  // 追加する TODO のリスト（100件）
  const todos: string[] = Array.from({ length: 1000 }, (_, i) => `Task ${i + 1}`);

  // 100件追加
  for (const todo of todos) {
    await input.fill(todo);
    await input.press('Enter');
    await expect(input).toHaveValue('');
  }

  const todoItems: Locator = page.locator('.todo-list li');

  // 100件追加されているか確認
  await expect(todoItems).toHaveCount(100);

  await page.waitForTimeout(99999999);
});
