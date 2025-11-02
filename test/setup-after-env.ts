import { config as loadEnv } from 'dotenv';
import { join } from 'path';

// Ensure test environment variables are loaded before each suite runs.
const envFile = join(process.cwd(), '.env.test');
loadEnv({ path: envFile, override: true });

// Default to NODE_ENV test when not provided.
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test';
}

// Increase default timeout to accommodate integration/E2E tests.
jest.setTimeout(30000);
