import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./shared/components/layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./shared/components/layouts/auth-layout/auth-layout.component";
import { AuthGuard } from "./shared/guards/auth.guard";

export const rootRouterConfig: Routes = [
  {
    path: "",
    redirectTo: "/dashboard/analytics",
    pathMatch: "full",
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
          path: "sessions",
        loadChildren: () =>
          import("./views/sessions/sessions.module").then(
            (m) => m.SessionsModule
          ),
        data: { title: "Session" },
      },
    ],
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
        canLoad:[AuthGuard]
      },
      {
        path: "members",
        loadChildren:() =>
            import("./views/members/members.module").then(m=>m.MembersModule),
        canLoad:[AuthGuard]

      },

      {
        path: "caisse",
        loadChildren:()=>
            import("./views/caisse/caisse.module").then(m=>m.CaisseModule),
        canLoad:[AuthGuard]

      },
      {
        path: "materiel",
        loadChildren: () =>
            import("./views/materiel/materiel.module").then(m=>m.MaterielModule),
        canLoad:[AuthGuard]

      },
      {
        path:"key",
        loadChildren: () =>
            import("./views/key/key.module").then(m=>m.KeyModule),
        canLoad:[AuthGuard]

      },
      {
        path: "meetings",
        loadChildren: () =>
            import("./views/meetings/meetings.module").then(m=>m.MeetingsModule),
        canLoad:[AuthGuard]

      }
    ],
  },
  {
    path: "**",
    redirectTo: "sessions/404",
  },
];
