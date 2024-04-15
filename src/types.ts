import type { ImageResolvedAssetSource } from 'react-native';

export type IdentityVerificationContract = {
  verification: String;
  temporaryKey: String;
  logo: ImageResolvedAssetSource;
};

export type InitializeVerificationView = (contract: IdentityVerificationContract) => Promise<void>;

export type PresentVerificationView = () => Promise<IdentityVerificationResult>;

enum IdentityVerificationResultType {
  Succeeded,
  Canceled,
  Failed,
}

export class IdentityVerificationResult {
  type: IdentityVerificationResultType;
  throwable?: any; // The error that occurred

  constructor(type: IdentityVerificationResultType, throwable?: any) {
    this.type = type;
    this.throwable = throwable;
  }

  static Succeeded(): IdentityVerificationResult {
    return new IdentityVerificationResult(IdentityVerificationResultType.Succeeded);
  }

  static Canceled(): IdentityVerificationResult {
    return new IdentityVerificationResult(IdentityVerificationResultType.Canceled);
  }

  static Failed(throwable: any): IdentityVerificationResult {
    return new IdentityVerificationResult(IdentityVerificationResultType.Failed, throwable);
  }
}
