import { NumbersQuery } from './v2/searchAndOrderNumberQueries';

export type MessageDirection = "out" | "in";

export interface V2MessageResponse {
  id: string;
  time: string;
  to: string[];
  from: string;
  text: string;
  applicationId: string;
  tag: string;
  owner: string;
  direction: MessageDirection;
  segmentCount: number;
}

export interface V2ApplicationResponse {
  applicationId: string;
  locationId: string;
}

export interface V2SendOptions {
  applicationId: string;
  from: string;
  to: string | string[];
  text: string;
  media?: string[];
  tag?: string;
}

export interface V2SMSOptions {
  enabled: boolean;
  tollFreeEnabled: boolean;
  shortCodeEnabled: boolean;
}

export interface V2MMSOptions {
  enabled: boolean;
}

export interface V2CallbackAuthData {
  userName: string;
  password: string;
}

export interface V2CreateMessagingApplicationOptions {
  name: string;
  callbackUrl: string;
  callbackAuthData: V2CallbackAuthData;
  locationName: string;
  isDefaultLocation: boolean;
  smsOptions: V2SMSOptions;
  mmsOptions: V2MMSOptions;
}

export interface V2SearchAndOrderNumbersOptions {

}

export interface V2AuthData {
  accountId: string;
  userName: string;
  password: string;
  subaccountId: string;
}

export interface V2MessageAPI {
  createMessagingApplication: (auth: V2AuthData, opts: V2CreateMessagingApplicationOptions) => Promise<V2ApplicationResponse>
  searchAndOrderNumbers: (auth: V2AuthData, app: V2ApplciationResponse, opts: NumbersQuery) => Promise<string[]>;
  send: (opts: V2SendOptions) => Promise<V2MessageResponse>;
}
