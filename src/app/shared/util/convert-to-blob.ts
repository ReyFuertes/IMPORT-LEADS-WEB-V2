import { Observable } from 'rxjs';

export function convertBlobToBase64(blob: Blob): Observable<{}> {
  const fileReader = new FileReader();
  const observable = new Observable(observer => {
    fileReader.onloadend = () => {
      observer.next(fileReader.result);
      observer.complete();
    };
  });
  if (blob)
    fileReader.readAsDataURL(blob);
  return observable;
}
