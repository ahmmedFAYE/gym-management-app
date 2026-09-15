import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {User, AuthReponse, AuthCredentials} from '../models/auth.model';
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
@Injectable({
  providedIn:'root',
})
export class AuthService{
  // URL DE L'API
  private urlAPI:string = 'http://localhost:8080/api/auth';

  // Création de notre BehaviorSubject en private pour que seule le service puisse modifier son état avec next().
  private membreConnecteSubject = new BehaviorSubject<User|null>(null);

  // Rendons le BehaviorSubject en Observable public pour que les autres composants
  // puissent recevoir les infos de la personne connecté

  public membreConnecte$ : Observable<User|null> = this.membreConnecteSubject.asObservable();

  // Injectons le HttpClient dans le constructor car c'est lui qui nous permet de communiquer avec le serveur
  constructor(private http:HttpClient){
    // S'assurer au départ que le user est deja dans le localStorage
    const userString = localStorage.getItem('currentUser');
    if(userString){
      const user:User = JSON.parse(userString);
      this.membreConnecteSubject.next(user);
    }
    
  }

  // Méthode verifierConnexion() aprés que l'utilisateur saisie ses infos et appuie sur le bouton de connexion
  public verifierConnexion(credentials:AuthCredentials):Observable<AuthReponse>{
    // envoie et reception des données depuis le serveur
    return this.http.post<AuthReponse>(this.urlAPI + '/login', credentials).pipe(
      tap(
        (reponseServeur:AuthReponse) => {

          // stockage des jetons et du user dans le localStorage

          localStorage.setItem('accessToken', reponseServeur.accessToken);
          localStorage.setItem('refreshToken', reponseServeur.refreshToken);
          localStorage.setItem('currentUser', JSON.stringify(reponseServeur.user));

          //On réallumente le behaviorSubject avec l'actuel user
          this.membreConnecteSubject.next(reponseServeur.user);
        }
        
      )
    )
  }

  // Méthode logOut à appeler depuis le boutton de déconnexion
  public seDeconnecter() : void{
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('currentUser');
          // On informe toute l'application que personne n'est connecté
          this.membreConnecteSubject.next(null);
  }


}