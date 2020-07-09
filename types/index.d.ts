import { V2MessageAPI } from './v2';
import {
  AreaCodeSearchAndOrderNumbersQuery,
  RateCenterSearchAndOrderNumbersQuery,
  NpaNxxSearchAndOrderNumbersQuery,
  TollFreeVanitySearchAndOrderNumbersQuery,
  TollFreeWildCharSearchAndOrderNumbersQuery,
  StateSearchAndOrderNumbersQuery,
  CitySearchAndOrderNumbersQuery,
  ZipSearchAndOrderNumbersQuery,
  LataSearchAndOrderNumbersQuery,
  CombinedSearchAndOrderNumbersQuery,
} from './v2/searchAndOrderNumberQueries';

export interface BandwidthOptions {
  userId   : string;
  apiToken : string;
  apiSecret: string;
  baseUrl?:  string;
}

export interface v2 {
  Message: V2MessageAPI;
}

export default class Bandwidth {
  constructor(options: BandwidthOptions);
  public v2: v2;
  public static AreaCodeSearchAndOrderNumbersQuery: typeof AreaCodeSearchAndOrderNumbersQuery;
  public static RateCenterSearchAndOrderNumbersQuery: typeof RateCenterSearchAndOrderNumbersQuery;
  public static NpaNxxSearchAndOrderNumbersQuery: typeof NpaNxxSearchAndOrderNumbersQuery;
  public static TollFreeVanitySearchAndOrderNumbersQuery: typeof TollFreeVanitySearchAndOrderNumbersQuery;
  public static TollFreeWildCharSearchAndOrderNumbersQuery: typeof TollFreeWildCharSearchAndOrderNumbersQuery;
  public static StateSearchAndOrderNumbersQuery: typeof StateSearchAndOrderNumbersQuery;
  public static CitySearchAndOrderNumbersQuery: typeof CitySearchAndOrderNumbersQuery;
  public static ZipSearchAndOrderNumbersQuery: typeof ZipSearchAndOrderNumbersQuery;
  public static LataSearchAndOrderNumbersQuery: typeof LataSearchAndOrderNumbersQuery;
  public static CombinedSearchAndOrderNumbersQuery: typeof CombinedSearchAndOrderNumbersQuery;
}
