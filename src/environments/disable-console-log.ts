import { enableProdMode } from "@angular/core";
import { environment } from "./environment";

if (environment.production) {
    enableProdMode();
    if (window) {
      window.console.log=function () {};
    }
  }