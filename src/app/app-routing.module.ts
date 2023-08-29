import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

// Define routes
const routes: Routes = [
  { path: 'products/add', component: ProductAddComponent },
  { path: 'products/update/:code', component: ProductUpdateComponent },
  { path: 'products/:code', component: ProductDetailComponent },
  { path: 'products', component: ProductListingComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  // Reorder suitably for non-conflicts
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
