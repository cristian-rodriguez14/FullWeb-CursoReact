import React from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const UsuarioDialog = (props) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={props.open}
      onClose={props.close}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle>
        {props.formmode ? "Agregar Nuevo" : "Modificar"} Producto
      </DialogTitle>
      <ValidatorForm onSubmit={props.addUsuario}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Nombre"
                onChange={props.changeNombre}
                name="nombre"
                value={props.nombre}
                validators={["required"]}
                errorMessages={["Este campo es Obligatorio"]}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Precio del Producto"
                onChange={props.changeEmail}
                name="precio"
                value={props.email}
                validators={["required"]}
                errorMessages={["Este campo es Obligatorio"]}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Foto"
                onChange={props.changePhoto}
                name="photo"
                type="file"
                value={props.photo}
                validators={["required"]}
                errorMessages={["Este campo es Obligatorio"]}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Descripción del Producto"
                onChange={props.changePhoto}
                name="photo"
                type="textfile"
                value={props.photo}
                validators={["required"]}
                errorMessages={["Este campo es Obligatorio"]}
                autoComplete="off"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            {props.formmode ? "Registrar" : "Editar"}
          </Button>
          <Button onClick={props.close} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
};

export default UsuarioDialog;
