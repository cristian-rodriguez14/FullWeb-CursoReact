import React from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
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
        {props.formmode ? "Agregar Nuevo" : "Modificar"} Usuario
      </DialogTitle>
      <ValidatorForm onSubmit={props.addUsuario}>
        <DialogContent>
          <Grid container spacing={3}>
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
                label="Correo Electronico"
                onChange={props.changeEmail}
                name="email"
                type="email"
                value={props.email}
                validators={["required", "isEmail"]}
                errorMessages={[
                  "Este campo es Obligatorio",
                  "Este correo no es valido ",
                ]}
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

            <Grid item xs={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Tipo Usuario</FormLabel>
                <RadioGroup
                  aria-label="role"
                  name="role"
                  value={props.role}
                  onChange={props.changeRole}
                >
                  <FormControlLabel
                    value="User"
                    control={<Radio />}
                    label="User"
                  />
                  <FormControlLabel
                    value="Admin"
                    control={<Radio />}
                    label="Admin"
                  />
                </RadioGroup>
              </FormControl>
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
