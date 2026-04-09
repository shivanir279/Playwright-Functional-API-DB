import { APIRequestContext, APIResponse, expect } from "@playwright/test";

export class APIActions {
  constructor(protected request: APIRequestContext) {
    this.request = request;
  }
  async getRequest(endpoint: string): Promise<APIResponse> {
    const response = await this.request.get(endpoint);
    console.log(
      `GET request to ${endpoint} returned status ${response.status()}`,
    );
    return response;
  }

  async postRequest(endpoint: string, data: any): Promise<APIResponse> {
    const response = await this.request.post(endpoint, { data });
    console.log(
      `POST request to ${endpoint} with data ${JSON.stringify(
        data,
      )} returned status ${response.status()}`,
    );
    return response;
  }

  async validateStatusCode(response: APIResponse, expectedStatus: number) {
    try {
      expect(response.status()).toBe(expectedStatus);
      console.log(`Status code validation passed: ${expectedStatus}`);
    } catch (error) {
      console.error(
        `Status code validation failed: expected ${expectedStatus}, got ${response.status()}`,
      );
      throw error;
    }
  }

  async validateResponseBody(response: APIResponse, expectedBody: any) {
    const responseBody = await response.json();
    try {
      expect(responseBody).toEqual(expectedBody);
      console.log("Response body validation passed");
    } catch (error) {
      console.error(
        `Response body validation failed: expected ${JSON.stringify(
          expectedBody,
        )}, got ${JSON.stringify(responseBody)}`,
      );
      throw error;
    }
  }

  async validateResponseContains(response: APIResponse, expectedContent: any) {
    const responseBody = await response.json();
    try {
      expect(responseBody).toMatchObject(expectedContent);
      console.log("Response content validation passed");
    } catch (error) {
      console.error(
        "Response content validation failed: expected content not found in response body",
      );
      throw error;
    }
  }

  // async validateResponseSchema(response: APIResponse, expectedSchema: any) {
  //     const responseBody = await response.json();
  //     try {
  //       expect(responseBody).toMatchSchema(expectedSchema);
  //       console.log("Response schema validation passed");
  //     } catch (error) {
  //       console.error(
  //         "Response schema validation failed: response body does not match expected schema",
  //       );
  //       throw error;
  //     }
  // }
}
