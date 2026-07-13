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
  ngOnInit(): void {
    // On s'abonne au cashier pour voir quel itulisateur s'est connecté
    this.auth.membreConnecte$.subscribe((user:User|null)=>{
      if(user){
        switch(user.role){
          case'admin':
          case'superadmin':
            this.router.navigate(['/admin']);
            break;
          case 'coach':
            this.router.navigate(['/ticket']);
            break;
          case 'member':
            this.router.navigate(['/members']);
            break;
          case 'cashier':
            this.router.navigate(['/finance']);
            break;
          default:
            this.router.navigate(['/login']);
        }
      }
      else{
        // si le cashier est vide, retour sur la page login
        this.router.navigate(['/login']);
      }
    });
  }
}

