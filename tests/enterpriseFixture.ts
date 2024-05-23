import { test as base, expect } from "@playwright/test";

let sharedEnterpriseId: string | null = null;

export const test = base.extend({
  enterpriseId: async ({}, use: any) => {
    await use({
      get: () => sharedEnterpriseId,
      set: (id: string) => {
        sharedEnterpriseId = id;
      },
    });
  },
});

export { expect };
