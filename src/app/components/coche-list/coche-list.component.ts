import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CocheService } from '../../services/coche.service';
import { Coche } from '../../models/coche.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coche-list',
  templateUrl: './coche-list.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./coche-list.component.css'],
})
export class CocheListComponent implements OnInit {
  coches: Coche[] = [];

  constructor(
    private cocheService: CocheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCoches();
  }

  cargarCoches(): void {
    this.cocheService.listarCoches().subscribe(
      (data) => (this.coches = data),
      (error) => console.error(error)
    );
  }

  eliminarCoche(id: number | null): void {
    if (id === null) {
      console.error('ID inválido para eliminación');
      alert('Error: No se puede eliminar un coche sin ID.');
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar este coche?')) {
      this.cocheService.eliminarCoche(id).subscribe({
        next: () => this.cargarCoches(),
        error: (err) => {
          console.error('Error al eliminar el coche:', err);
          alert('Error al eliminar el coche. Inténtalo de nuevo.');
        },
      });
    }
  }

  editarCoche(id: number | null): void {
    if (id === null) {
      console.error('ID inválido para edición');
      alert('Error: El coche no tiene un ID válido.');
      return;
    }
    this.router.navigate(['/coches/editar', id]);
  }

  crearNuevoCoche(): void {
    this.router.navigate(['/coches/nuevo']);
  }

  verDetalles(id: number | null): void {
    if (id === null) {
      console.error('ID inválido para ver detalles');
      alert('Error: No se puede ver detalles de un coche sin ID.');
      return;
    }
    this.router.navigate(['/coches', id]);
  }
}