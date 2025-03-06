  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { UsuarioService } from '../../services/usuario.service';
  import { Usuario } from '../../models/usuario.model';
  import { CommonModule } from '@angular/common';

  @Component({
    selector: 'app-usuario-list',
    templateUrl: './usuario-list.component.html',
    standalone: true,
    imports: [CommonModule],
    styleUrls: ['./usuario-list.component.css']
  })
  export class UsuarioListComponent implements OnInit {

    usuarios: Usuario[] = [];

    constructor(
      private usuarioService: UsuarioService,
      private router: Router // Inyecta Router
    ) { }

    ngOnInit(): void {
      this.cargarUsuarios();
    }

    cargarUsuarios(): void {
      this.usuarioService.listarUsuarios().subscribe(
        data => this.usuarios = data,
        error => console.error(error)
      );
    }

    eliminarUsuario(id: number | null): void {
      if (id === null) {
        console.error('ID inválido para eliminación');
        alert('Error: No se puede eliminar un usuario sin ID.');
        return;
      }

      if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        this.usuarioService.eliminarUsuario(id).subscribe({
          next: () => this.cargarUsuarios(),
          error: (err) => {
            console.error('Error al eliminar el usuario:', err);
            alert('Error al eliminar el usuario. Inténtalo de nuevo.');
          }
        });
      }
    }

    editarUsuario(id: number | null): void {
      if (id === null) {
        console.error('ID inválido para edición');
        alert('Error: El usuario no tiene un ID válido.');
        return;
      }
      this.router.navigate(['/usuarios/editar', id]);
    }

    crearNuevoUsuario(): void {
      this.router.navigate(['/usuarios/nuevo']); 
    }

    verDetalles(id: number | null): void {
      if (id === null) {
        console.error('ID inválido para ver detalles');
        alert('Error: No se puede ver detalles de un usuario sin ID.');
        return;
      }
      this.router.navigate(['/usuarios', id]);
    }
  }
