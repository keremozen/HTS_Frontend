
export interface ENabizProcessDto {
  gerceklesmE_ZAMANI?: string;
  isleM_TURU?: string;
  isleM_KODU?: string;
  isleM_ADI?: string;
  isleM_ZAMANI?: string;
  adet?: string;
  hastA_TUTARI?: string;
  kuruM_TUTARI?: string;
  randevU_ZAMANI?: string;
  kullanicI_KIMLIK_NUMARASI?: string;
  cihaZ_NUMARASI?: string;
  isleM_REFERANS_NUMARASI?: string;
  girisimseL_ISLEM_KODU?: string;
  kliniK_KODU?: string;
  isleM_PUAN_BILGISI?: string;
}

export interface ExternalApiResult {
  durum: number;
  sonuc: object;
  mesaj?: string;
}

export interface ListENabizProcessDto extends ENabizProcessDto {
  treatmentCode?: string;
  sysTrackingNumber?: string;
  ushasPrice?: number;
  hospitalPrice?: number;
  processId?: number;
  isCancelled: boolean;
  isUsedInProforma: boolean;
}

export interface SutCodesRequestDto {
  htsKodu?: string;
  sutKoduList: string[];
  sysTakipNo?: string;
}
