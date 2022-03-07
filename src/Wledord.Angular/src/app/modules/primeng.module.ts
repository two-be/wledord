import { NgModule } from "@angular/core"
import { BlockUIModule } from "primeng/blockui"
import { ButtonModule } from "primeng/button"
import { CardModule } from "primeng/card"
import { ChipsModule } from "primeng/chips"
import { InputTextModule } from "primeng/inputtext"
import { ProgressSpinnerModule } from "primeng/progressspinner"
import { TableModule } from "primeng/table"

@NgModule({
    exports: [
        BlockUIModule,
        ButtonModule,
        CardModule,
        ChipsModule,
        InputTextModule,
        ProgressSpinnerModule,
        TableModule,
    ]
})
export class PrimeNgModule { }
