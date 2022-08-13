import { initSequelize } from '@backend/src/utils/db/initSequelize';

export function recreateDB() {
  (async () => {
    await initSequelize({ force: true });
  })();
}
