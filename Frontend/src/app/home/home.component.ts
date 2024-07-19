import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {CarouselComponent} from "../carousel/carousel.component";
import {MyPersonalAreaComponent} from "../my-personal-area/my-personal-area.component";
import {FooterComponent} from "../footer/footer.component";
import {CardsComponent} from "../cards/cards.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    CarouselComponent,
    MyPersonalAreaComponent,
    FooterComponent,
    CardsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
