import type { VerificationCreateRequest, VerificationOptions, VerificationType } from "./types";

const endpoint = 'https://identity-verification.hst-smpls.falu.io/identity/create-verification';

export const createIdentityVerification = async (verificationType: VerificationType, options: VerificationOptions) => {
  const request: VerificationCreateRequest = {
    type: verificationType,
    options: options,
  };

  try {
    const data = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const json = await data.json();
    return json;
  } catch (e) {
    return {};
  }
};
