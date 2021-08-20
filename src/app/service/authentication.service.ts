import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from 'src/app/model/role';

import { environment } from '../../environments/environment';
import { User, RegisterPayload } from '../model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(private http: HttpClient) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userId(): string {
        return this.userSubject.value.id!;
    }

    public get userName(): string {
        return this.userSubject.value.username!;
    }
    
    public get userValue(): User {
        return this.userSubject.value;
    }

    get isLoggedIn() {
        if(this.userValue?.username) 
            return true;
        else
            return false;
    }

    get isTutor() {
        let roles: Role[] = this.userValue?.roles!;
        if (this.userValue?.roles && roles.includes(Role.TUTOR)) {
            return true;
        }
        return false;
    }

    get isStudent() {
        let roles: Role[] = this.userValue?.roles!;
        if (this.userValue?.roles && roles.includes(Role.STUDENT)) {
            return true;
        }
        return false;
    }

    signin(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/auth/signIn`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage 
                // to keep user logged in between page refreshes.
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    signup(signupData: RegisterPayload) {
        return this.http.post<any>(`${environment.apiUrl}/auth/signUp`, signupData)
            .pipe(map(data => {
                return data;
            }));
    }

    updateRole(role: Role) {
        let user:User = JSON.parse(localStorage.getItem('user') || '{}');
        user.roles?.push(role);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
    }

    logout() {
        // remove user from local storage to log user out   
        localStorage.removeItem('user');
        this.userSubject.next(null!);
    }
}