import React, { Component } from "react";
import Titulo from "../Titulo";

import { v4 as uuidv4 } from "uuid";

import {
  Button,
  Form,
  FormGroup,
  StyleInput,
  StyleArea,
  Alert,
} from "./style.js";

const initalState = {
  cita: {
    id : "",
    nombre: "",
    apellido: "",
    direccion: "",
    fecha: "",
    hora: "",
    sintomas: "",
  },
  error: false,
};

class Formulario extends Component {

  state = {

  }

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      ...props.infoCitaEditar
    };
    //console.log("constructor");
  }


  handleChange = (e) => {
    this.setState({
      cita: { ...this.state.cita, [e.target.name]: e.target.value },
    });
  };

  handleClick = (e) => {
    e.preventDefault();

    const { cita } = this.state;

    if (
      cita.nombre === "" ||
      cita.apellido === "" ||
      cita.direccion === "" ||
      cita.fecha === "" ||
      cita.hora === "" ||
      cita.sintomas === ""
    ) {
      this.setState({ ...this.state, error: true });
      return;
    }

    const nuevaCita = { ...this.state.cita };
    if (nuevaCita.id === "") { // asignar nuevo id, solo cen modo add
      nuevaCita.id = uuidv4();
    }

    console.log(nuevaCita);

    this.props.agregarCita(nuevaCita);

    this.setState({ ...initalState });
  };

  componentWillReceiveProps(nextProps) {
    
    this.setState({...this.state,
      cita: {...nextProps.infoCitaEditar.cita}      
    });
  }


  render() {

   

    return (
      <div>
        <Titulo titulo={"Formulario de citas"} />
        <Form>
          <FormGroup col="2">
            <label htmlFor="nombre">Nombre</label>
            <StyleInput
              type="text"
              placeholder="Ingresar Nombre"
              name="nombre"
              onChange={this.handleChange}
              //defaultValue={this.props.infoCitaEditar.cita.nombre}
              value={this.state.cita.nombre} //.infoCitaEditar.cita.nombre !== this.state.cita.nombre && this.state.cita.nombre !== "" ? this.state.cita.nombre : this.props.infoCitaEditar.cita.nombre}
            />
          </FormGroup>
          <FormGroup col="2">
            <label htmlFor="apellido">Apellido</label>
            <StyleInput
              type="text"
              placeholder="Ingresar Apellido"
              name="apellido"
              onChange={this.handleChange}
              //value={this.state.cita.apellido}
              value={this.state.cita.apellido}
            />
          </FormGroup>
          <FormGroup col="1">
            <label htmlFor="direccion">Dirección</label>
            <StyleInput
              type="text"
              placeholder="Ingresar Dirección"
              name="direccion"
              onChange={this.handleChange}
              value={this.state.cita.direccion}
            />
          </FormGroup>
          <FormGroup col="3">
            <label htmlFor="fecha">Fecha cita</label>
            <StyleInput
              type="date"
              name="fecha"
              onChange={this.handleChange}
              value={this.state.cita.fecha}
            />
          </FormGroup>
          <FormGroup col="3">
            <label htmlFor="hora">Hora cita</label>
            <StyleInput
              type="time"
              name="hora"
              onChange={this.handleChange}
              value={this.state.cita.hora}
            />
          </FormGroup>
          <FormGroup col="3">
            <label htmlFor="sintomas">Sintomas</label>
            <StyleArea
              placeholder="Ingresar sintomas"
              name="sintomas"
              onChange={this.handleChange}
              value={this.state.cita.sintomas}
            ></StyleArea>
          </FormGroup>

          {this.state.error && (
            <FormGroup col="1">
              <Alert>Todos los campos son requeridos</Alert>
            </FormGroup>
          )}

          <FormGroup>
          <Button onClick={this.handleClick}>{this.state.cita.id !== "" ? "actualizar cita":"reservar cita" }</Button>

          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Formulario;
