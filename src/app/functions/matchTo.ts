import { AbstractControl, ValidationErrors } from '@angular/forms';

//Fonction de recherche de correspondance entre deux valeurs pour validator
//match to - control à comparer
export function matchValues( matchTo: string ): (AbstractControl:any) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const parentControls = control.parent?.controls as { [key: string]: AbstractControl<any> };
    return !!control.parent && !!control.parent.value && control.value === parentControls[matchTo].value ? null : { isMatching: false };
  };
}
