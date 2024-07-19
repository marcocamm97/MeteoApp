
import {RouterLink} from "@angular/router";
import { Component, Output, EventEmitter } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchTerm: string = '';

  @Output() searchTermChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchChange() {
    this.searchTermChanged.emit(this.searchTerm);
  }
}
