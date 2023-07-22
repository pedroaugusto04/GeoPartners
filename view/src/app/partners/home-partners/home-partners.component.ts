import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-partners',
  templateUrl: './home-partners.component.html',
  styleUrls: ['./home-partners.component.scss']
})
export class HomePartnersComponent {

  ImagePath: string;

  constructor(private router: Router, private route: ActivatedRoute) { 
    this.ImagePath = 'assets/image.png';
  }


  navigateToSee(){
    this.router.navigate(['/partners'], { relativeTo: this.route });
  }

  navigateToRegister(){
    this.router.navigate(['/partners/new'], { relativeTo: this.route });
  }

  navigateToSeeBest(){
    this.router.navigate(['/partners/best'], { relativeTo: this.route });
  }

  navigateToAnotherProjects(){
    const url = 'https://github.com/pedroaugusto04'
    window.open(url,'_blank');
  }
}
