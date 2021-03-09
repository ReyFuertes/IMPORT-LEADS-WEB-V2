import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { PageNotFoundComponent } from './shared/components/pageNotFound/pageNotFound.component';

const routes: Routes = [
  { path: 'iaad', redirectTo: 'iaad/login', pathMatch: 'full' },
  { path: 'iaad/dashboard', redirectTo: 'iaad/dashboard/contracts', pathMatch: 'full' },
  {
    path: 'iaad/dashboard',
    canActivate: [AuthGuard],
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
      { path: 'products', loadChildren: './modules/products/products.module#ProductsModule' },
      { path: 'user-management', loadChildren: './modules/user-management/user-management.module#UserManagementModule' },
    ],
  },
  { path: 'report', loadChildren: './modules/report/report.module#ReportModule' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
