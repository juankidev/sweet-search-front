import { Component, ViewChild } from '@angular/core';
import { ProductGridComponent } from '../../components/product-grid/product-grid.component';
import { NavbarComponent } from '../../../../core/components/navbar/navbar.component';

@Component({
  selector: 'app-home-page',
  imports: [
    ProductGridComponent,
    NavbarComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  @ViewChild("productGrid") productGrid!: ProductGridComponent;

  onSearch(searchTerm: string) {
    console.log("Búsqueda recibida en app component:", searchTerm)
    // Llamar al método de búsqueda del componente product-grid
    this.productGrid.onSearch(searchTerm)
  }
}
