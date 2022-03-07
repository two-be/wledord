import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { AppService } from "./app.service"
import { PrimeNgModule } from "./modules"

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PrimeNgModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
