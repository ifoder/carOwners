import { OwnerComponent } from './owner/owner.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerDetailComponent } from './owner-detail/owner-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/owners', pathMatch: 'full' },
  { path: 'owners', component: OwnerComponent },
  { path: 'owner/:crud/:id', component: OwnerDetailComponent },
  { path: 'owner/create', component: OwnerDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
