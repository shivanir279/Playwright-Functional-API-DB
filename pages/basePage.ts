import { expect, test, Page, BrowserContext, Locator } from "@playwright/test";

export class BasePage {
  constructor(
    protected page: Page,
    protected context: BrowserContext,
  ) {
    this.page = page;
    this.context = context;
  }

  // **Actions**
  async click(locator: Locator, elementName?: string) {
    await locator.waitFor({ state: "visible" });
    await locator.scrollIntoViewIfNeeded();
    try {
      await locator.click();
      console.log(`Clicked on ${elementName || "element"}`);
    } catch (error) {
      console.error(`Failed to click ${elementName || "element"}`);
      throw error;
    }
  }
  async fill(locator: Locator, value: string, elementName?: string) {
    await locator.waitFor({ state: "visible" });
    try {
      await locator.fill(value);
      console.log(`Filled ${elementName || "field"} with value: ${value}`);
    } catch (error) {
      console.error(`Failed to fill ${elementName || "field"}`);
      throw error;
    }
  }

  // **Common methods**
  async navigateToURL(baseURL: any, expectedTitle: string) {
    await this.page.goto(baseURL);
    try {
      expect(await this.page.title()).toBe(expectedTitle);
      console.log(`Navigated to URL`, baseURL);
    } catch (error) {
      console.error(`Title does not match`);
      throw error;
    }
  }

  async verifyHeader(
    locator: Locator,
    expectedText: string,
    elementName?: string,
  ) {
    try {
      console.log(`Verifying ${elementName || "header"} text`);
      await expect(locator).toHaveText(expectedText);
      console.log(`${elementName || "Header"} verified: ${expectedText}`);
    } catch (error) {
      console.error(
        `Header verification failed: ${elementName || expectedText}`,
      );
    }
  }
}
