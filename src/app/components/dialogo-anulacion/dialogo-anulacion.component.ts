import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-anulacion',
  templateUrl: './dialogo-anulacion.component.html',
  styleUrls: ['./dialogo-anulacion.component.scss']
})
export class DialogoAnulacionComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<DialogoAnulacionComponent>,
    @ Inject(MAT_DIALOG_DATA) public observacion: String) {}

  ngOnInit() {
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(obser: String): void {
    this.dialogo.close(true);
  }

}
