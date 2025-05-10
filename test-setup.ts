import { test as base, expect as baseExpect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import * as testData from './test-data/credentials.json';

type Environment = keyof typeof testData.environments;
const environment: Environment = 'url';
const baseUrl = testData.environments[environment];

type TestOptions = {
  skipGlobalAuth?: boolean;
};

export const test = base.extend<TestOptions>({
  skipGlobalAuth: [false, { option: true }],

  page: async ({ page, skipGlobalAuth }, use) => {
    if (!skipGlobalAuth) {
      const loginPage = new LoginPage(page);
      await loginPage.navigateTo(baseUrl);
      await loginPage.login(testData.validUser.username, testData.validUser.password);
      console.log('Global Login Successful');
    }

    await use(page);

    if (!skipGlobalAuth) {
      const loginPage = new LoginPage(page);
      await loginPage.logout(testData.validUser.username);
      console.log('Global Logout Successful');
    }
  },
});

export const expect = baseExpect;
