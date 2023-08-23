
export interface ExternalApiResult {
  durum: number;
  sonuc: object;
  mesaj?: string;
}

export interface SutCodesRequestDto {
  htsKodu?: string;
  sutKoduList: string[];
  sysTakipNo?: string;
}
