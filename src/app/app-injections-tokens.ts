  
import { InjectionToken } from "@angular/core";
import { environment } from "src/environments/environment";

export const CLOTHING_STORE_API = new InjectionToken<string>(environment.clothingStoreApi);
export const CLOTHING_STORE_AUTH_API = new InjectionToken<string>(environment.clothingStoreAuthApi);