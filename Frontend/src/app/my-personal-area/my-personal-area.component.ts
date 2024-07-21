import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {NgFor} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-my-personal-area',
  standalone: true,
  imports: [NgFor, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './my-personal-area.component.html',
  styleUrl: './my-personal-area.component.css'
})
export class MyPersonalAreaComponent {





}
