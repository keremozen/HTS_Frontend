
export interface ENabizProcessDto {
  gerceklesme_ZAMANI?: string;
  islem_TURU?: string;
  islem_KODU?: string;
  islem_ADI?: string;
  islem_ZAMANI?: string;
  adet?: string;
  hasta_TUTARI?: string;
  kurum_TUTARI?: string;
  randevu_ZAMANI?: string;
  kullanici_KIMLIK_NUMARASI?: string;
  cihaz_NUMARASI?: string;
  islem_REFERANS_NUMARASI?: string;
  girisimsel_ISLEM_KODU?: string;
  klinik_KODU?: string;
  islem_PUAN_BILGISI?: string;
}

export interface ExternalApiResult {
  durum: number;
  sonuc: object;
  mesaj?: string;
}

export interface ListENabizProcessDto extends ENabizProcessDto {
  treatmentCode?: string;
  sysTrackingNumber?: string;
  processId?: number;
  ushasPrice?: number;
  hospitalPrice?: number;
  isCancelled: boolean;
  isUsedInProforma: boolean;
}

export interface SutCodesRequestDto {
  htsKodu?: string;
  sutKoduList: string[];
  sysTakipNo?: string;
}
