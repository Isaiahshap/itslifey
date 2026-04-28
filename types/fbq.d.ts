/** Global type declaration for the Meta Pixel (fbq) function. */

type FbqEventName =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "CompleteRegistration"
  | "Contact"
  | "InitiateCheckout"
  | "Purchase"
  | "Schedule"
  | "SubmitApplication";

interface FbqEventData {
  content_name?: string;
  content_category?: string;
  content_type?: string;
  value?: number;
  currency?: string;
  [key: string]: unknown;
}

type FbqFunction = {
  (command: "init", pixelId: string): void;
  (command: "track", event: FbqEventName, data?: FbqEventData): void;
  (command: "trackCustom", event: string, data?: FbqEventData): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded: boolean;
  version: string;
  push: FbqFunction;
};

declare global {
  interface Window {
    fbq: FbqFunction;
    _fbq: FbqFunction;
  }
}

export {};
