import React, { Component } from "react";
import { render } from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
const firebase = require("firebase");
require("firebase/firestore");
const _ = require("lodash");

const columns = [
  {
    name: "title",
    label: "Caso",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "body",
    label: "Nombre",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "asignadoA",
    label: "Asignado",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "aseguradora",
    label: "Institucion",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "monto",
    label: "Monto",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "etapa",
    label: "Etapa",
    options: {
      filter: true,
      //  display: 'excluded',
      sort: true
    }
  },
   {
    name: "filterEjecAmp",
    label: "Amparos Resueltos",
    options: {
      filter: true,
      display: 'excluded',
      filterType: 'checkbox',
      customFilterListOptions: { render: v => `Amparos Resueltos` },
      filterOptions: {
            names: [true]
          },
    }
  },
  {
    name: "filterPresentRecApe",
    label: "Apelacion",
    options: {
      filter: true,
      display: 'excluded',
      filterType: 'checkbox',
      customFilterListOptions: { render: v => `Apelacion` },
      filterOptions: {
            names: [true]
          },
    }
  },
  {
    name: "filterAutoAdmiActora",
    label: "Fechas Futuras",
    options: {
      filter: true,
      display: 'excluded',
      filterType: 'checkbox',
      customFilterListOptions: { render: v => `Fechas Futuras` },
      filterOptions: {
            names: [true]
          },
    }
  },
  {
    name: "Actualizado",
    label: "Actualizado",
    options: {
      filter: false,
      sort: true
    }
  }
];

class Reportes extends React.Component {
  constructor() {
    super();
    this.state = {
      casos: null,
      filteredCasos: null,
      value: null,
      fechaInicio: null,
      fechaFin: null,
      min: 0,
      max: 100,
      firstrun: true,
      showFilter: false
    };
  }
  componentDidMount = () => {
    firebase
      .firestore()
      .collection("notes")
      .orderBy("timestamp", "desc")
      .onSnapshot(serverUpdate => {
        const casos = serverUpdate.docs.map(_doc => {
          const data = null;
          /*   data["Caso"] = _doc.data().title;
          data["Nombre"] = _doc.data().body;
          data["Asignado"] = _doc.data().asignadoA;
          data["Institucion"] = _doc.data().aseguradora;
          data["Monto"] = _doc.data().monto;
          data["Etapa"] = _doc.data().etapa;*/
          data = _doc.data();
          data["Actualizado"] = _doc.data().timestamp
            ? moment(_doc.data().timestamp.toDate()).format(
                "DD/MM/YYYY hh:mm A"
              )
            : null;
          data["id"] = _doc.id;
          return data;
        });
        console.log("Reportes.js componentDidMount", casos);
        this.setState({ casos: casos });
        this.setState({ filteredCasos: casos });
      });
  };

  handleSelect = data => {
    const caso = this.state.casos.filter(obj => {
      return obj.title == data[0];
    });
    console.log(caso[0]);
  };
  valuetext = value => {
    return `${value}°C`;
  };
  handleChange = (event, newValue) => {
    this.setState({ value: newValue, showFilter: true });
  };
  handleFechaInicio = date => {
    this.setState({ fechaInicio: date, showFilter: true });
  };
  handleFechaFin = date => {
    this.setState({ fechaFin: date, showFilter: true });
  };
  handleFilter = () => {
    const { value } = this.state;
    const filterData = this.state.casos.filter(item => {
      return ( ((this.state.fechaInicio && this.state.fechaFin ) ?
        (new Date(item.timestamp.toDate()) >= new Date(this.state.fechaInicio) &&
        new Date(item.timestamp.toDate()) <= new Date(this.state.fechaFin)) : true) &&
        (parseInt(item.monto) >= value[0] && parseInt(item.monto) <= value[1])
      );
    });
    this.setState({
      filteredCasos: filterData
    });
  };
  handleRestablecer = () => {
    this.setState({
      filteredCasos: this.state.casos, fechaInicio: null, fechaFin: null
    });
  };

  render() {
    const { classes } = this.props;
    if (this.state.casos) {
      const max = parseInt(_.maxBy(this.state.casos, "monto").monto);
      const min = parseInt(_.minBy(this.state.casos, "monto").monto);
      if (this.state.firstrun) {
        this.setState({ value: [min, max], firstrun: false });
      }
      return (
        <div>
          <div style={{ display: "flex" }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                style={{
                  width: "180px",
                  marginLeft: "5px",
                  marginRight: "5px"
                }}
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Fecha Inicio"
                value={this.state.fechaInicio}
                onChange={this.handleFechaInicio}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                style={{
                  width: "180px",
                  marginLeft: "5px",
                  marginRight: "5px"
                }}
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Fecha Final"
                value={this.state.fechaFin}
                onChange={this.handleFechaFin}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
            <div className={classes.rangeBar}>
              <Typography id="range-slider" gutterBottom>
                Rango de Monto
              </Typography>
              <Slider
                value={this.state.value ? this.state.value : [min, max]}
                onChange={this.handleChange}
                min={min}
                max={max}
               // step={1000}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                //getAriaValueText={this.valuetext}
              />
            </div>
            {this.state.showFilter ? (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.handleFilter}
                >
                  Aplicar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.handleRestablecer}
                >
                  Restablecer
                </Button>
              </div>
            ) : null}
          </div>
          <MUIDataTable
            title={"Reportes"}
            data={this.state.filteredCasos ? this.state.filteredCasos : []}
            columns={columns}
            options={{
              downloadOptions: { filename: `Reporte.csv`, separator: "," },
              onRowClick: (rowData, rowMeta) => {
                this.handleSelect(rowData);
              },
              onRowsSelect: (row, rowMeta) => {
                console.log("Row", row);
              },
              textLabels: {
                body: {
                  noMatch: "No se Encontraron Datos",
                  toolTip: "Ordenar",
                  columnHeaderTooltip: column => `Ordenar por ${column.label}`
                },
                pagination: {
                  next: "Siguiente Pagina",
                  previous: "Pagina Previa",
                  rowsPerPage: "Rows per page:",
                  displayRows: "de"
                },
                toolbar: {
                  search: "Buscar",
                  downloadCsv: "Descargar CSV",
                  print: "Imprimir",
                  viewColumns: "Ver Columnas",
                  filterTable: "Filtrar Datos"
                },
                filter: {
                  all: "Todos",
                  title: "Filtros",
                  reset: "Restablecer"
                },
                viewColumns: {
                  title: "Mostrar Columnas",
                  titleAria: "Show/Hide Table Columns"
                },
                selectedRows: {
                  text: "row(s) selected",
                  delete: "Delete",
                  deleteAria: "Delete Selected Rows"
                }
              }
            }}
          />
        </div>
      );
    } else {
      return <div />;
    }
  }
}
export default withStyles(styles)(Reportes);
