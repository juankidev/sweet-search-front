import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-product-grid',
  imports: [
    CommonModule,
    PaginationComponent
  ],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css'
})
export class ProductGridComponent implements OnInit {
  // Productos mostrados en la página actual
  products: Product[] = []
  allProducts: Product[] = []
  loading = false
  error: string | null = null
  currentPage = 1
  totalPages = 1
  itemsPerPage = 8
  loadingArray = Array(8).fill(0) // Para los skeletons
  currentSearchTerm = "" // Almacenar el término de búsqueda actual

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    //this.loadProducts()
  }

  loadProducts(searchTerm?: string): void {
    this.loading = true
    this.error = null

    // Si hay un término de búsqueda, lo guardamos y resetear página
    if (searchTerm !== undefined) {
      this.currentSearchTerm = searchTerm
      this.currentPage = 1
    }

    this.productService.getProducts(this.currentSearchTerm).subscribe({
      next: (response) => {
        this.allProducts = response.products
        this.updatePagination()
        this.loading = false
      },
      error: (err) => {
        this.error = "Error al cargar los productos"
        this.loading = false
        console.error("Error loading products:", err)
      },
    })
  }

  // Método para actualizar la paginación y productos mostrados
  updatePagination(): void {
    // Calcular total de páginas
    this.totalPages = Math.ceil(this.allProducts.length / this.itemsPerPage)

    // Si la página actual es mayor al total de páginas, ir a la primera
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = 1
    }

    // Calcular índices para la paginación
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage

    // Obtener productos para la página actual
    this.products = this.allProducts.slice(startIndex, endIndex)
  }

  onPageChange(page: number): void {
    this.currentPage = page
    this.updatePagination()
    // Scroll suave hacia arriba
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Método para manejar la búsqueda desde el navbar
  onSearch(searchTerm: string): void {
    console.log("Búsqueda recibida en product-grid:", searchTerm)
    this.loadProducts(searchTerm)
  }

  getStarArray(rating: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, index) => index < Math.floor(rating))
  }

  onViewProduct(product: Product): void {
    if (product.link) {
      window.open(product.link, "_blank")
    } else {
      console.log("Ver detalles de:", product.titulo)
      // Aquí puedes implementar navegación a una página de detalles
      // this.router.navigate(['/product', productId]);
    }
  }

  onImageError(event: any): void {
    event.target.src = "https://via.placeholder.com/200x200?text=Imagen+no+disponible"
  }

  trackByProduct(index: number, product: Product): string {
    return product.titulo + product.fuente
  }

  retryLoad(): void {
    this.loadProducts()
  }

  // Método para obtener información de paginación
  getPaginationInfo(): string {
    if (this.allProducts.length === 0) {
      return "No hay productos"
    }

    const startItem = (this.currentPage - 1) * this.itemsPerPage + 1
    const endItem = Math.min(this.currentPage * this.itemsPerPage, this.allProducts.length)

    return `Mostrando ${startItem}-${endItem} de ${this.allProducts.length} productos`
  }
}

