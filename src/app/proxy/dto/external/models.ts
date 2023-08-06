
export interface ExternalApiResult {
  durum: number;
  sonuc: object;
  mesaj?: string;
}

export interface SutCodesRequestDto {
  htsCode?: string;
  sutCodes: string[];
}
