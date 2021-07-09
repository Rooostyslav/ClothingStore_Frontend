import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private availableExtensionsForImage: string[] = ['jpg', 'jpeg', 'png', 'gif'];

  constructor() { }

  availableExtensionForImage(extension: string): boolean {
    return this.availableExtensionsForImage.includes(extension);
  }

  dataURLtoFile(dataurl: string, filename: string) {
    var arr = dataurl.split(',');
    var mime = arr[0].split(':')[1].split(';')[0];
    var bstr = atob(arr[1]);
    var n = bstr.length; 
    var u8arr = new Uint8Array(n);

    filename = filename + '.' + mime.split('/')[1];
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type: mime});
  }

  readBlobToDataURL(blob: Blob, callback: (base64data: string | ArrayBuffer | null) => any | void) {
    var reader = new FileReader();
    reader.onloadend = (function () {
      callback(reader.result);
    });
    reader.readAsDataURL(blob);
  }
}
