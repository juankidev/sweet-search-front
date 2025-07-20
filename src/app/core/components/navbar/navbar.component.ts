import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  searchTerm = '';

  // Emitir evento de búsqueda al componente padre
  @Output() searchEvent = new EventEmitter<string>();

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
  }

  onSearchSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    console.log('Searching for:', this.searchTerm);
    // Emitir el evento de búsqueda
    this.searchEvent.emit(this.searchTerm);
  }

  onSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearchSubmit();
    }
  }

  onCartClick() {
    console.log('Cart clicked');
    // Implementar lógica del carrito
  }

  onAccountClick() {
    console.log('Account clicked');
    // Implementar lógica de cuenta
  }
}
