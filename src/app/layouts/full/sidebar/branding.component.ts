import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-branding',
  imports: [RouterModule],
  template: `
    <a [routerLink]="['/']">
      <img
        src="./assets/images/logos/logo.svg"
        alt="logo"
        style="width: 100px; height: auto; transition: transform 0.3s ease-in-out;"
        (mouseenter)="hover = true"
        (mouseleave)="hover = false"
        [style.transform]="hover ? 'scale(1.1)' : 'scale(1)'"
      />
    </a>
  `,
})
export class BrandingComponent {
  hover: boolean = false;
  options = this.settings.getOptions();
  constructor(private settings: CoreService) {}
}


