import { FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';

export function restrictedWords(words) {
  return (control: FormControl): { [key: string]: any } => {
    if (!words) { return null; }

    const invalidWords = words
      // .map(w => control.value.includes(w) ? w : null)
      // .filter(w => w != null);
      .filter(w => control.value.includes(w));
      console.log('restrictedWords');

    return invalidWords && invalidWords.length > 0
      ? { restrictedWords: invalidWords.join(', ') }
      : null;
  };
}
