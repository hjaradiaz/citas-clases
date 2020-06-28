import React, { Component } from "react";
import Formulario from "./components/Formulario";
import ListaCitas from "./components/ListaCitas";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html{
  height: 100%;
}
*::after,*::before{
  margin: 0;
  padding: 0;
  box-sizing: inherit;
};
body{
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  color: #555;
  box-sizing: border-box; 
}
`;

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

class App extends Component {
  state = {
    listaCitas: [],
    citaInfo: {
     ...initalState
    },
  };

  agregarCita = (cita) => {
    const indice = this.state.listaCitas.findIndex((obj => obj.id == cita.id));

    if(indice > -1){ // actualizar cita
      let nuevaListaCitas = this.state.listaCitas;
      nuevaListaCitas[indice] = cita;
      this.setState({ listaCitas: nuevaListaCitas });
    }else{ // nueva cita
      this.setState({ listaCitas: [...this.state.listaCitas, cita] });      
    }

    //limpiar cita de edicion
    this.setState({
      citaInfo: {
        ...initalState
      }
    });
  };

  elimnarCita = (id) => {
    const nuevaListaCitas = this.state.listaCitas.filter(
      (cita) => cita.id !== id
    );

    this.setState({ listaCitas: nuevaListaCitas });
  };

  obtenerInfoCita = (id) => {
    const cita = this.state.listaCitas.filter((cita) => cita.id === id)[0];
    //console.log(this.state);
    this.setState({
      citaInfo: {
        cita: {
          ...cita
        },
        error: false,
      }
    });   
  }



  render() {   

    return (
      <div>
        <GlobalStyle />
        <Formulario agregarCita={this.agregarCita} infoCitaEditar={this.state.citaInfo} />
        <ListaCitas
          listaCitas={this.state.listaCitas}
          elimnarCita={this.elimnarCita}
          obtenerInfoCita={this.obtenerInfoCita}
        />
      </div>
    );
  }
}

export default App;
