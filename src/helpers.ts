
import FaluIdentityReactNative from './FaluIdentityReactNative';
import type { IdentityVerificationContract, IdentityVerificationResult } from './types';

export async function openIdentityVerificationView(contract: IdentityVerificationContract): Promise<IdentityVerificationResult> {
  await FaluIdentityReactNative.initialize(contract);
  return await FaluIdentityReactNative.open();
}
