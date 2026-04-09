import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { log } from "node:console";

test("Sign up", async ({ page, baseURL, context }) => {
  const login = new LoginPage(page, context);

  await test.step("Goto URL", async () => {
    await login.navigateToURL(baseURL);
  });

  await test.step("Sign up", async () => {
    await login.clickStartTodayButton();
    await login.clickContinueButton();
    await login.fillFirstName();
    await login.setGoal();
  });

  //await test.step
});
