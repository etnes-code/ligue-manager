import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@app/features/users/user.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  login(username: string, password: string): Observable<User> {
    console.log('Simulating login request...');
    return new Observable(observer => {
      // Simule une réponse réussie après 1 seconde
      setTimeout(() => {
        if (username === 'admin' && password === 'admin') {
          const token = 'fake-jwt-token';
          const user: User = {
            id: 1,
            username: 'admin',
            roles: ['admin'],
            token: token,
          };
          localStorage.setItem('token', token); // Stocke uniquement le token
          observer.next(user); // Retourne l'objet utilisateur
          observer.complete();
        } else {
          observer.error({ message: 'Invalid credentials' });
        }
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
