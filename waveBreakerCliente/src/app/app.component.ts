import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';

@Component({
    selector: 'wb-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, MenuComponent, FooterComponent]
})
export class AppComponent {
  title = 'waveBreaker';
}
