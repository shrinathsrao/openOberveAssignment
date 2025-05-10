import { test, expect } from '../test-setup';
import { LoginPage } from "../pages/LoginPage";
import { DashboardHelper } from "../pages/DashboardHelper";
import * as testData from "../test-data/credentials.json";

type Environment = keyof typeof testData.environments;
const environment: Environment = "url";
const baseUrl = testData.environments[environment];

test.describe("Assignment Tests", () => {
  test(`Creation of a Line Chart Dashboard with Operations on it`, {
    tag: ["@dashboardCreationFlow", "@all"]
  }, async ({ page }) => {
    const dashboardHelper = new DashboardHelper(page);

    // Navigate to Dashboards and create a new dashboard
    await dashboardHelper.navigateAndCreateBaseDashboard();

    // Add a panel and remove the default panel
    await dashboardHelper.addPanel();

    // Add X, Y, B Axis
    await dashboardHelper.addXYBAxis('[data-test="field-list-item-logs-default-kubernetes_container_name"]');

    // Set panel name and chart type
    await dashboardHelper.setPanelNameAndChartType('Test Panel');

    // Set date-time to 1 day
    await dashboardHelper.setDateTimeTo1Day();

    // Connect null values
    await dashboardHelper.connectNullValues();
    
    // OCR-based logic to check extracted text and apply Top N value setting
    const text = await dashboardHelper.extractTextFromCanvasBottom('canvas[data-zr-dom-id="zr_0"]');
    console.log('Extracted Text:', text);

    // Check if Top N Setting is needed and apply then verify it
    await dashboardHelper.verifyTopNSetting(text, '1/', 'others');
    
    // Final save and reapply date-time
    await page.locator('[data-test="dashboard-panel-save"]').click();
    await dashboardHelper.setDateTimeTo1Day();
    
    await page.waitForTimeout(4000);
  });
});

test.describe("Invalid Login Tests", () => {
  test.use({ skipGlobalAuth: true });

  test(`Invalid Login Functionality Validation`, {
    tag: ["@invalidLogin", "@all"]
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo(baseUrl);

    await loginPage.login('', '');
    await loginPage.invalidCredsValidation('Please input valid username');

    await loginPage.login(testData.invalidUser1.username, testData.invalidUser1.password);
    await loginPage.invalidCredsValidation('Invalid username or password');

    await loginPage.login(testData.invalidUser2.username, testData.invalidUser2.password);
    await loginPage.invalidCredsValidation('Invalid username or password');
  });
});
