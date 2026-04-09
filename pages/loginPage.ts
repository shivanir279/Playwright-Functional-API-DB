import { expect, Page, BrowserContext, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  public readonly START_TODAY: Locator;
  public readonly CONTINUE: Locator;
  public readonly FIRSTNAME: Locator;
  public readonly NEXT: Locator;
  public readonly HEADER: Locator;

  constructor(
    protected page: Page,
    protected context: BrowserContext,
  ) {
    super(page, context);
    this.START_TODAY = page.locator(
      "//p[contains(text(),'Make progress')]/following-sibling::a",
    );
    this.CONTINUE = page.getByRole("button", { name: "Continue" });
    this.FIRSTNAME = page.getByPlaceholder("First Name");
    this.NEXT = page.getByRole("button", { name: "Next" });
    this.HEADER = page.locator("//div/h1");
  }
  basePage = new BasePage(this.page, this.context);

  async navigateToURL(baseURL: any): Promise<void> {
    await this.page.goto(baseURL);
    await this.basePage.navigateToURL(
      baseURL,
      "Calorie Tracker & BMR Calculator to Reach Your Goals | MyFitnessPal",
    );
  }

  async clickStartTodayButton(): Promise<void> {
    await this.basePage.click(this.START_TODAY, "Start Today");
  }
  async clickContinueButton(): Promise<void> {
    await this.basePage.click(this.CONTINUE, "Continue Button");
  }

  async fillFirstName(): Promise<void> {
    await this.basePage.fill(this.FIRSTNAME, "Shivani");
    await this.basePage.click(this.NEXT, "Next Button");
    await expect(this.page).toHaveURL(
      "https://www.myfitnesspal.com/account/create/goals",
    );
  }

  async setGoal(): Promise<void> {
    await this.basePage.verifyHeader(
      this.HEADER,
      "Thanks Shivani! Now for your goals.",
    );
    await this.basePage.click(
      this.page.getByRole("button", { name: "Gain weight" }),
    );
    await this.basePage.click(
      this.page.getByRole("button", { name: "Gain muscle" }),
    );
    await this.basePage.click(
      this.page.getByRole("button", { name: "Modify my diet" }),
    );
    await this.basePage.verifyHeader(
      this.HEADER,
      "Great! You’ve just taken a big step on your journey.",
    );
    await this.basePage.click(this.NEXT);
    await this.basePage.verifyHeader(
      this.HEADER,
      "What are your reasons for wanting to gain weight?",
    );
    await this.basePage.click(
      this.page.getByRole("button", { name: "Gain muscle for general" }),
    );
    await this.basePage.click(
      this.page.getByRole("button", { name: "I am underweight" }),
    );
    await this.basePage.click(
      this.page.getByRole("button", { name: "My healthcare provider has" }),
    );
    await this.basePage.click(this.NEXT);
    await this.basePage.verifyHeader(
      this.HEADER,
      "Dialing in your nutrition is a great way to support your fitness.",
    );
    await this.basePage.click(this.NEXT);
    await this.basePage.verifyHeader(
      this.HEADER,
      "What results do you want to achieve from gaining muscle?",
    );
    await this.basePage.click(
      this.page.getByRole("button", { name: "Tone up – you want visible" }),
    );
    await this.basePage.click(this.NEXT);
    await this.basePage.verifyHeader(
      this.HEADER,
      "Great, we can help you get the look you want.",
    );
    await this.basePage.click(this.NEXT);
  }
}
