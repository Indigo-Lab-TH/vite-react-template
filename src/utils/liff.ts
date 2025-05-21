// src/utils/liff.ts
import liff from '@line/liff';

export const initLIFF = async (): Promise<void> => {
  try {
    await liff.init({ liffId: '2007419185-NQAJv4gX' }); // Replace with your LIFF ID

    if (!liff.isLoggedIn()) {
      liff.login();
    }
  } catch (error) {
    console.error('LIFF initialization failed:', error);
    throw error;
  }
};

export default liff;