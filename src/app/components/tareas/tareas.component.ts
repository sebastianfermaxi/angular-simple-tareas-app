import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarea } from 'src/app/models/Tarea';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {

  listaTareas: Tarea[] = [];
  formTarea: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formTarea = this.fb.group({
      titulo: ['',[Validators.required, Validators.minLength(6)]],
      prioridad: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    this.listaTareas = JSON.parse(localStorage.getItem('tareas')!) || [];
  }

  agregarTarea(): void{

    if(this.formTarea.valid){
      const tarea: Tarea=
      {
        titulo: this.formTarea.controls['titulo'].value,
        prioridad : this.formTarea.controls['prioridad'].value,
        completada:false
      };
      this.listaTareas.push(tarea);
      this.guardarLocal();
      this.formTarea.reset();
    }

  }

  tareaDone(i: number){
    this.listaTareas[i].completada = true;
    this.guardarLocal();
  }

  borrarTarea(i : number){
    this.listaTareas.splice(i, 1);
    this.guardarLocal();
  }

  guardarLocal(){
    localStorage.setItem('tareas', JSON.stringify(this.listaTareas));
  }
}
