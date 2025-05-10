import { Page, expect } from '@playwright/test';
import tesseract from 'tesseract.js';

export class DashboardHelper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Creation of Base Dashboard
  async navigateAndCreateBaseDashboard(){
    await this.page.locator('[data-test="menu-link-\\/dashboards-item"]').click();
    await expect(this.page.locator('[data-test="dashboard-add"]')).toBeVisible();
    await this.page.locator('[data-test="dashboard-add"]').click();
    
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    await this.page.locator('[data-test="add-dashboard-name"]').fill(`Dash_Auto${randomSuffix}`);
    await this.page.locator('[data-test="add-dashboard-description"]').fill('This dashboard has been created using an automated playwright script');
    await this.page.locator('[data-test="dashboard-add-submit"]').click();
    await expect(this.page.getByText('Dashboard added successfully.')).toBeVisible();    
  }

  // Panel Addition
  async addPanel(){
    await this.page.locator('[data-test="dashboard-if-no-panel-add-panel-btn"]').click();
    await this.page.locator('[data-test="dashboard-x-item-_timestamp-remove"]').click();
  }

  // OCR Capture
  async extractTextFromCanvasBottom(canvasSelector: string, height = 100): Promise<string> {
    const canvas = await this.page.$(canvasSelector);
    if (!canvas) throw new Error(`Canvas with selector ${canvasSelector} not found`);

    const bounds = await canvas.boundingBox();
    if (!bounds) throw new Error(`Bounding box not found for ${canvasSelector}`);

    const cropArea = {
      x: bounds.x,
      y: bounds.y + bounds.height - height,
      width: bounds.width,
      height,
    };

    const screenshot = await this.page.screenshot({ clip: cropArea });

    const { data: { text } } = await tesseract.recognize(screenshot, 'eng', {
      logger: m => console.log(m),
    });

    return text;
  }

  // Verify Top N Setting
  async verifyTopNSetting(text:string, targetText:string,updatedText:string){
    if (text.includes(targetText)) {
      console.log(`Text "${targetText}" found! Applying Top N value setting`);
      await this.page.locator('[data-test="dashboard-config-top_results_others"] div').nth(2).click();
      await this.page.locator('[data-test="dashboard-config-top_results"]').click();
      await this.page.locator('[data-test="dashboard-config-top_results"]').fill('5');
      await this.page.locator('[data-test="dashboard-apply"]').click();
      // OCR-based logic to check if the setting applied took effect or not
      const text = await this.extractTextFromCanvasBottom('canvas[data-zr-dom-id="zr_0"]');
      console.log('Extracted Text:', text);
      if (text.includes(updatedText)){
        console.log(`Text "${updatedText}" found! Top N Setting Successful`);
      }
      else{
        throw new Error(`Test failed: "${updatedText}" not found in the extracted text. Top N setting failed.`);
      }
    } else {
      console.log(`No need for Top N setting as values are less than 5`);
    }
  }

  // Add X, Y, B Axis
  async addXYBAxis(baseSelector: string) {
    await this.page.locator(`${baseSelector} [data-test="dashboard-add-data-indicator"]`).click();
    await this.page.locator(`${baseSelector} [data-test="dashboard-add-x-data"]`).click();
    await this.page.locator(`${baseSelector} [data-test="dashboard-add-y-data"]`).click();
    await this.page.locator(`${baseSelector} [data-test="dashboard-add-b-data"]`).click();
  }

  // Panel Name and Chart Type
  async setPanelNameAndChartType(panelName: string) {
    await this.page.locator('[data-test="dashboard-panel-name"]').fill(panelName);
    await this.page.locator('[data-test="selected-chart-line-item"] img').click();
  }

  // Set Date-Time to 1 Day
  async setDateTimeTo1Day() {
    await this.page.locator('[data-test="date-time-btn"]').click();
    await this.page.locator('[data-test="date-time-relative-1-d-btn"]').click();
    await this.page.locator('[data-test="date-time-apply-btn"]').click();
  }

  // Connect Null Values
  async connectNullValues() {
    await this.page.locator('[data-test="dashboard-sidebar"]').click();
    await this.page.locator('[data-test="dashboard-config-connect-null-values"] div').nth(2).click();
    await this.page.locator('[data-test="dashboard-apply"]').click();
  }
}
