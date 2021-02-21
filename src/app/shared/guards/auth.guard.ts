import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router, Route, UrlSegment,
} from "@angular/router";
import { JwtAuthService } from "../services/auth/jwt-auth.service";
import {Observable} from "rxjs";
import {MembersService} from "../services/members.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private membersService: MembersService, private jwtAuth: JwtAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.jwtAuth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/sessions/signin"], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
  canLoad(
      route: Route,
      segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.membersService.currentUserValue;
    if(currentUser){
      return true;
    }
    this.router.navigate(['/sessions/signin']);
    return false;
    return true;
  }}
