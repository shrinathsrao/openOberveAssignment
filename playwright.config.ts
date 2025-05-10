import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.spec.ts'],
  timeout: 100000,
  retries: 0, 
  outputDir: 'test-results',
  use: {
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    trace: 'on',
    video: 'on',
    viewport: { width: 1280, height: 800 },
  },
  reporter: [
    ['html', { open: 'never', port: 9323 }],
    ['list'],
    ['junit', { outputFile: 'results.xml' }]
  ],
  projects: [
    {
      name: 'chromium',
      use: { 
        browserName: 'chromium',
        headless: true,
        launchOptions: { slowMo: 50 },
        ...devices['Desktop Chrome']        
      },
    },
    {
      name: 'firefox',
      use: { 
        browserName: 'firefox',
        headless: false,
        launchOptions: { slowMo: 50 }, 
        ...devices['Desktop Firefox']
      },
    },
    {
      name: 'webkit',
      use: { 
        browserName: 'webkit',
        headless: false,
        launchOptions: { slowMo: 50 }, 
        ...devices['Desktop Safari']
      },
    },
  ],
});