
export interface IAreaCodeSearchAndOrderNumbersQuery {
  areaCode: string;
  quantity: number;
}

export class AreaCodeSearchAndOrderNumbersQuery {
  constructor(options: IAreaCodeSearchAndOrderNumbersQuery);
  toXml(): object;
}

export interface IRateCenterSearchAndOrderNumbersQuery {
  rateCenter: string;
  state: string;
  quantity: number
}

export class RateCenterSearchAndOrderNumbersQuery {
  constructor(options: IRateCenterSearchAndOrderNumbersQuery);
  toXml(): object;
}

export interface INpaNxxSearchAndOrderNumbersQuery {
  npaNxx: string;
  enableTnDetail: boolean;
  enableLca: boolean;
  quantity: number;
}

export class NpaNxxSearchAndOrderNumbersQuery {
  constructor(options: INpaNxxSearchAndOrderNumbersQuery);
  toXml(): object;
}

export interface ITollFreeVanitySearchAndOrderNumbersQuery {
  tollFreeVanity: string;
  quantity: number;
}

export class TollFreeVanitySearchAndOrderNumbersQuery {
  constructor(options: ITollFreeVanitySearchAndOrderNumbersQuery);
  toXml(): object;
}

export interface ITollFreeWildCharSearchAndOrderNumbersQuery {
  tollFreeWildCardPattern: string;
  quantity: number
}

export class TollFreeWildCharSearchAndOrderNumbersQuery {
  constructor(options: ITollFreeWildCharSearchAndOrderNumbersQuery);
  toXml(): object;
}

export interface IStateSearchAndOrderNumbersQuery {
  state: string;
  quantity: number;
}

export class StateSearchAndOrderNumbersQuery {
  constructor(options: IStateSearchAndOrderNumbersQuery);
  toXml(): object;
}

export interface ICitySearchAndOrderNumbersQuery {
  state: string;
  city: string;
  quantity: number;
}

export class CitySearchAndOrderNumbersQuery {
  constructor(options: ICitySearchAndOrderNumbersQuery);
  toXml(): object;
}

export interface IZipSearchAndOrderNumbersQuery {
  zip: string;
  quantity: number;
}

export class ZipSearchAndOrderNumbersQuery {
  constructor(options: IZipSearchAndOrderNumbersQuery);
  toXml(): object;
}

export interface ILataSearchAndOrderNumbersQuery {
  lata: string;
  quantity: number;
}

export class LataSearchAndOrderNumbersQuery {
  constructor(options: ILataSearchAndOrderNumbersQuery);
  toXml(): object;
}

export interface ICombinedSearchAndOrderNumbersQuery {
  quantity: number;
  areaCode: string;
  rateCenter: string;
  npaNxx: string;
  enableTnDetail: boolean;
  enableLca: boolean;
  tollFreeVanity: string;
  tollFreeWildCardPattern: string;
  state: string;
  city: string;
  zip: string;
  lata: string;
}

export class CombinedSearchAndOrderNumbersQuery {
  constructor(options: ICombinedSearchAndOrderNumbersQuery);
  toXml(): object;
}

export type NumbersQuery = AreaCodeSearchAndOrderNumbersQuery | RateCenterSearchAndOrderNumbersQuery | NpaNxxSearchAndOrderNumbersQuery | TollFreeVanitySearchAndOrderNumbersQuery | TollFreeWildCharSearchAndOrderNumbersQuery | StateSearchAndOrderNumbersQuery | CitySearchAndOrderNumbersQuery | ZipSearchAndOrderNumbersQuery | LataSearchAndOrderNumbersQuery |  CombinedSearchAndOrderNumbersQuery;
