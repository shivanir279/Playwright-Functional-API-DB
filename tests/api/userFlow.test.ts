import { test, expect } from "@playwright/test";
import { APIActions } from "../../utilities/apiActions";

test.describe("Sign Up API tests", () => {
  test("GET /account/create returns the signup page using configured baseURL", async ({
    request,
  }) => {
    const api = new APIActions(request);
    const response = await api.getRequest("/account/create");
    await api.validateStatusCode(response, 200);

    const body = await response.text();
    console.log(body);
    expect(body).toContain("Welcome");
  });
});
