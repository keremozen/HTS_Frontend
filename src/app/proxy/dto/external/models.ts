
export interface ExternalApiResult {
  resultCode: number;
  result: object;
}

export interface SutCodesRequestDto {
  htsCode?: string;
  sutCodes: string[];
}
