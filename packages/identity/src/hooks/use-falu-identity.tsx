import { useState } from 'react';
import { openIdentityVerificationView } from '../helpers';
import type { IdentityVerificationContract, IdentityVerificationResult } from '../types';

/**
 * useFaluIdentity hook.
 *
 * This hook provides access to the present method,
 * verification status, and loading flag.
 *
 * @param contractProvider - An optionsProvider method that fetches the
 * IdentityVerification ID, temporary key secret, and brandLogo.
 *
 * @example
 * ```ts
 * const fetchOptionsProvider = async () => {
 *    const response = await fetch('https://${YOUR_SERVER_BASE_URL}/identity/create-verification');
 *    const { id, temporary_key_secret } = await response.json();
 *    return {
 *      verificationId: id,
 *      temporaryKeySecret: temporary_key_secret,
 *      brandLogo: Image.resolveAssetSource(logo),
 *    };
 *  };
 *
 * const { open, result, loading } = useFaluIdentity(fetchOptionsProvider)
 * ```
 */
export function useFaluIdentity(contractProvider: () => Promise<IdentityVerificationContract>) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IdentityVerificationResult | undefined>();

  const open = async () => {
    setLoading(true);
    const contract = await contractProvider();
    setLoading(false);
    const verificationResult = await openIdentityVerificationView(contract);
    setResult(verificationResult);
  };

  return { open, result, loading };
}
