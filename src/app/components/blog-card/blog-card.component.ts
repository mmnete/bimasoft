import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

interface cardimgs {
  id: number;
  time: string;
  imgSrc: string;
  title: string;
  disabled: boolean;
  link?: string;
}

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule], // Include CommonModule here
  templateUrl: './blog-card.component.html',
})
export class AppBlogCardsComponent {
  constructor(private router: Router) {}

  // Sample data for the card images
  cardimgs: cardimgs[] = [
    {
      id: 1,
      time: '2 min to fill',
      imgSrc: '/assets/images/blog/new_car_policy_people.webp',
      title: 'Car Insurance',
      disabled: false,
      link: '/car-insurance-flow',
    },
    {
      id: 2,
      time: '5 min to fill',
      imgSrc: '/assets/images/blog/blog-img2.jpg',
      title: 'Health Insurance',
      disabled: true,
    },
  ];

  // TrackBy function for optimizing the rendering of cards
  trackByImgSrc(index: number, item: cardimgs): number {
    return item.id; // or any other unique identifier
  }

  onGetStartedClick(link: string) {
    // Navigate to the route (Angular router)
    this.router.navigate([link]);

    // Alternatively, if you want to open a new tab with the link:
    // window.open(link, '_blank');
  }
}
