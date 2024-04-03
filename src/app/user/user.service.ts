import { Injectable, OnDestroy } from '@angular/core';
import { UserAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
private user$$ = new BehaviorSubject<UserAuth | undefined >(undefined);
private user$ = this.user$$.asObservable();

user: UserAuth | undefined;
USER_KEY = '[user]';

userSubscription: Subscription;
  constructor(private http: HttpClient) {
     this.userSubscription = this.user$.subscribe(user => {
      this.user = user;
    })
  }


  login(email: string, password: string) {
return this.http.post<UserAuth>('/api/login', { email, password })
.pipe(tap(user => {this.user$$.next(user);}))
  }

  register(
    username: string, 
    email: string,
    tel: string,
    password: string, 
    rePassword: string,
  ) {
    return this.http.post<UserAuth>('/api/register', 
    { username, email, tel, password, rePassword })
    .pipe(tap(user => {this.user$$.next(user);}))
  }

  logout() {
    return this.http.post<UserAuth>('/api/logout', {})
    .pipe(tap(() => {this.user$$.next(undefined)}));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
