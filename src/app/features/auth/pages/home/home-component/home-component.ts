import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';
import { User } from '../../../models/auth.model';

@Component({
  selector: 'app-home-component',
  standalone: false,
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private auth : AuthService,
    private router:Router
  ){}

  // création d'une méthode qui prend en paramétre la route et qui permet d'éviter le redondance
  // par rapport à l'appel de router pour la redirection
  // ce principe consiste au prinicipe de DRY(Don't repeat yourself)
  private redirigerVers(route:string){
    this.router.navigate([route]);
  }

  ngOnInit(): void {
    
    // On s'abonne au cashier pour voir quel itulisateur s'est connecté

    this.auth.membreConnecte$.subscribe((user:User|null)=>{
      if(user){
        switch(user.role){
          case'admin':
          case'superadmin':
            this.redirigerVers('/admin');
            break;
          case 'coach':
            this.redirigerVers('/ticket');
            break;
          case 'member':
            this.redirigerVers('/members');
            break;
          case 'cashier':
            this.redirigerVers('/finance');
            break;
          default:
            this.redirigerVers('/login');
        }
      }
      else{
        // si le cashier est vide, retour sur la page login
        this.redirigerVers('/login');
      }
    });
  }
}

