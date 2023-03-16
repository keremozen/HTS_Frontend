import { ConfigStateService, LanguageInfo, SessionStateService } from '@abp/ng.core';
import { Component, ViewEncapsulation } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LanguageComponent {

  constructor(private sessionState: SessionStateService, private configState: ConfigStateService) { }

  get smallScreen(): boolean {
    return window.innerWidth < 992;
  }

  languages$: Observable<LanguageInfo[]> = this.configState.getDeep$('localization.languages');

  get defaultLanguage$(): Observable<string> {
    return this.languages$.pipe(
      map(
        languages =>
          languages?.find(lang => lang.cultureName === this.selectedLangCulture)?.displayName || '',
      ),
    );
  }

  get dropdownLanguages$(): Observable<LanguageInfo[]> {
    return this.languages$.pipe(
      map(
        languages => languages?.filter(lang => lang.cultureName !== this.selectedLangCulture) || [],
      ),
    );
  }

  get selectedLangCulture(): string {
    return this.sessionState.getLanguage();
  }

  onChangeLang(cultureName: string) {
    this.sessionState.setLanguage(cultureName);
  }
}
