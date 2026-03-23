import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartViewComponent } from './cart-view/cart-view.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { ObserversModule } from "@angular/cdk/observers";


@NgModule({
  declarations: [
    CartViewComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    ObserversModule
]
})
export class CartModule { }
