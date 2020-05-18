import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/contracts', pathMatch: 'full' },
  {
    path: 'dashboard',
    children: [
      { path: 'contracts', loadChildren: './modules/contracts/contracts.module#ContractsModule' },
      { path: 'inspection-insights', loadChildren: './modules/inspection-insights/inspection-insights.module#InspectionInsightsModule' },
      { path: 'inspections', loadChildren: './modules/inspections/inspections.module#InspectionModule' },
      { path: 'performance-insights', loadChildren: './modules/performance-insights/performance-insights.module#PerformanceInsightsModule' },
      { path: 'tags', loadChildren: './modules/tags/tags.module#TagsModule' },
      { path: 'templates', loadChildren: './modules/templates/templates.module#TemplatesModule' },
      { path: 'users', loadChildren: './modules/users/users.module#UsersModule' },
      { path: 'venues', loadChildren: './modules/venues/venues.module#VenuesModule' },
      { path: 'chat', loadChildren: './modules/chat/chat.module#ChatModule' },
      { path: 'products', loadChildren: './modules/products/products.module#ProductsModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
