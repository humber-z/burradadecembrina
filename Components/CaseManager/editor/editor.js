import React from "react";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import MultiStep from "./stepMenu";
import styles from "./styles";
import Autocomplete from "./Autocomplete";
//import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Dialog from "@material-ui/core/Dialog";
import Conclusion from "./Fases/Conclusion";
const firebase = require("firebase");
require("firebase/firestore");

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};
class EditorComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      bancos: null,
      text: "",
      domicilio: "",
      telefono: "",
      celular: "",
      email: "",
      curp: "",
      rfc: "",
      aseguradora: "",
      ramo: "",
      tiposeguro: "",
      asunto: "",
      monto: "",
      descripcion: "",
      contrato: "",
      honorarios: "",
      anticipo: "",
      asignadoA: "",
      recomendado: "",
      title: "",
      id: "",
      estado: 1,
      descr: "Actualizacion datos generales",
      open: false
    };
  }

  componentDidMount = () => {
    this.setState({
      text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      domicilio: this.props.selectedNote.domicilio,
      telefono: this.props.selectedNote.telefono,
      celular: this.props.selectedNote.celular,
      email: this.props.selectedNote.email,
      curp: this.props.selectedNote.curp,
      rfc: this.props.selectedNote.rfc,
      aseguradora: this.props.selectedNote.aseguradora,
      ramo: this.props.selectedNote.ramo,
      tiposeguro: this.props.selectedNote.tiposeguro,
      asunto: this.props.selectedNote.asunto,
      monto: this.props.selectedNote.monto,
      descripcion: this.props.selectedNote.descripcion,
      contrato: this.props.selectedNote.contrato,
      honorarios: this.props.selectedNote.honorarios,
      anticipo: this.props.selectedNote.anticipo,
      asignadoA: this.props.selectedNote.asignadoA,
      recomendado: this.props.selectedNote.recomendado,
      estado: this.props.selectedNote.estado,
      id: this.props.selectedNote.id
    });
    firebase
      .firestore()
      .collection("datosAutocompletado")
      .orderBy("text", "asc")
      .onSnapshot(serverUpdate => {
        const bancos = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        console.log("Edito.js componentDidMount", bancos);
        this.setState({ bancos });
      });
  };
  componentDidUpdate = () => {
    if (this.props.selectedNote.id !== this.state.id) {
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        domicilio: this.props.selectedNote.domicilio,
        telefono: this.props.selectedNote.telefono,
        celular: this.props.selectedNote.celular,
        email: this.props.selectedNote.email,
        curp: this.props.selectedNote.curp,
        rfc: this.props.selectedNote.rfc,
        aseguradora: this.props.selectedNote.aseguradora,
        ramo: this.props.selectedNote.ramo,
        tiposeguro: this.props.selectedNote.tiposeguro,
        asunto: this.props.selectedNote.asunto,
        monto: this.props.selectedNote.monto,
        descripcion: this.props.selectedNote.descripcion,
        contrato: this.props.selectedNote.contrato,
        honorarios: this.props.selectedNote.honorarios,
        anticipo: this.props.selectedNote.anticipo,
        asignadoA: this.props.selectedNote.asignadoA,
        recomendado: this.props.selectedNote.recomendado,
        id: this.props.selectedNote.id
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { bancos } = this.state
    return (
      <div className={classes.editorContainer}>
        <div>
          <Paper className={classes.paper}>
            <TextField
              id="outlined-name"
              label="Caso"
              className={classes.textField}
              value={this.state.title ? this.state.title : ""}
              onChange={e => this.updateTitle(e.target.value)}
              margin="normal"
              variant="outlined"
            />

            <TextField
              style={{ width: "380px" }}
              id="outlined-name"
              label="Nombre del Cliente"
              className={classes.textField}
              value={this.state.text}
              onChange={e => this.updateBody(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Correo Electronico"
              value={this.state.email}
              onChange={e => this.updateEmail(e.target.value)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              style={{ width: "550px" }}
              label="Domicilio"
              value={this.state.domicilio}
              onChange={e => this.updateDomicilio(e.target.value)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Telefono"
              value={this.state.telefono}
              onChange={e => this.updateTelefono(e.target.value)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Celular"
              value={this.state.celular}
              onChange={e => this.updateCelular(e.target.value)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Curp"
              value={this.state.curp}
              onChange={e => this.updateCurp(e.target.value)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="RFC"
              value={this.state.rfc}
              onChange={e => this.updateRFC(e.target.value)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </Paper>
          <Paper className={classes.paper} 
           //style={{display: "flex" }}
           >
            {/* <TextField 
          label="Persona Fisica/Moral Demandada"
          value={this.state.aseguradora} 
          onChange={(e) => this.updateAseg(e.target.value)}
          className={classes.textField}
          margin="normal"
          variant="outlined" />*/}
            <Autocomplete
              update={this.updateAseg}
              bancos={bancos ? bancos.filter(i => i.seccion === "instituciones") : null }
              text={this.state.aseguradora}
              nameFiled={"Persona Fisica/Moral Demandada"}
            />
            {/*<TextField
              label="Tipo de Materia"
              value={this.state.ramo}
              onChange={e => this.updateRamo(e.target.value)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />*/}
            <Autocomplete
              update={this.updateRamo}
              bancos={bancos ? bancos.filter(i => i.seccion === "materia") : null }
              text={this.state.ramo}
              nameFiled={"Tipo de Materia"}
            />
            {/*<TextField
              label="Tipo de Reclamacion"
              value={this.state.tiposeguro}
              onChange={e => this.updateSeguro(e.target.value)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />*/}
            <Autocomplete
              update={this.updateSeguro}
              bancos={bancos ? bancos.filter(i => i.seccion === "reclamos") : null }
              text={this.state.tiposeguro}
              nameFiled={"Tipo de Reclamacion"}
            />
            {/*<TextField
              label="Asunto"
              value={this.state.asunto}
              onChange={e => this.setState({ asunto: e.target.value })}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />*/}
            <Autocomplete
              update={this.updateAsunto}
              bancos={bancos ? bancos.filter(i => i.seccion === "asuntos") : null }
              text={this.state.asunto}
              nameFiled={"Asunto"}
            />
            <TextField
              label="Monto a Reclamar"
              value={this.state.monto}
              onChange={e => this.updateFianza(e.target.value)}
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Contrato Prst. Serv."
              value={this.state.contrato}
              onChange={e => this.updateContrato(e.target.value)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Honorarios"
              value={this.state.honorarios}
              onChange={e => this.updateHonor(e.target.value)}
              className={classes.textField}
              margin="normal"
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
              variant="outlined"
            />
            <TextField
              label="Anticipo"
              value={this.state.anticipo}
              onChange={e => this.updateAnticipo(e.target.value)}
              className={classes.textField}
              margin="normal"
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
              variant="outlined"
            />
            <TextField
              label="Asunto Asignado a"
              value={this.state.asignadoA}
              onChange={e => this.updateAsignado(e.target.value)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Recomendado Por"
              value={this.state.recomendado}
              onChange={e => this.updateRecom(e.target.value)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </Paper>
          <div>
            <TextField
              label="Motivo de Reclamacion"
              multiline
              rows="5"
              style={{ width: "70%" }}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              value={this.state.descripcion}
              onChange={e => this.updateDesc(e.target.value)}
            />
          </div>
          <div style={{ display: "flex" }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.estado == 2}
                    onChange={this.updateInactivo}
                  />
                }
                label={this.state.estado == 2 ? "Desactivado" : "Activado"}
              />
            </FormGroup>
            <Button onClick={this.save} variant="contained" color="primary">
              Guardar
            </Button>
          </div>
          <Dialog
            open={this.state.open}
            onClose={this.consluir}
            aria-labelledby="form-dialog-title"
          >
            <Conclusion
              consluir={this.consluir}
              descr={this.state.descr}
              guardarConclusion={this.guardarConclusion}
              setDescr={this.setDescr}
            />
          </Dialog>
        </div>
      </div>
    );
  }
  consluir = () => {
    this.setState({ open: !this.state.open });
  };
  guardarConclusion = async () => {
    this.setState({ open: !this.state.open });
  };
  setDescr = e => {
    this.setState({ descr: e.target.value });
  };
  updateInactivo = async () => {
    await this.setState({ estado: this.state.estado == 2 ? 1 : 2 });
    this.setState({ open: !this.state.open });
    //this.update()
  };
  updateBody = async val => {
    await this.setState({ text: val });
    //this.update()
  };
  updateTitle = async val => {
    await this.setState({ title: val });
    // this.update()
  };
  updateDomicilio = async val => {
    await this.setState({ domicilio: val });
    // this.update()
  };
  updateTelefono = async val => {
    await this.setState({ telefono: val });
    // this.update()
  };
  updateCelular = async val => {
    await this.setState({ celular: val });
    // this.update()
  };
  updateEmail = async val => {
    await this.setState({ email: val });
    // this.update()
  };
  updateCurp = async val => {
    await this.setState({ curp: val });
    // this.update()
  };
  updateRFC = async val => {
    await this.setState({ rfc: val });
    // this.update()
  };
  updateAseg = async val => {
    await this.setState({ aseguradora: val });
    // this.update()
  };
  updateRamo = async val => {
    await this.setState({ ramo: val });
    // this.update()
  };
  updateSeguro = async val => {
    await this.setState({ tiposeguro: val });
    // this.update()
  };
  updateAsunto = async val => {
    await this.setState({ asunto: val });
    // this.update()
  };
  updateFianza = async val => {
    await this.setState({ monto: val });
    // this.update()
  };
  updateDesc = async val => {
    await this.setState({ descripcion: val });
    // this.update()
  };
  updateContrato = async val => {
    await this.setState({ contrato: val });
    // this.update()
  };
  updateHonor = async val => {
    await this.setState({ honorarios: val });
    // this.update()
  };
  updateAnticipo = async val => {
    await this.setState({ anticipo: val });
    // this.update()
  };
  updateAsignado = async val => {
    await this.setState({ asignadoA: val });
    // this.update()
  };
  updateRecom = async val => {
    await this.setState({ recomendado: val });
    // this.update()
  };
  save = async () => {
    await this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text,
      domicilio: this.state.domicilio,
      telefono: this.state.telefono,
      celular: this.state.celular,
      email: this.state.email,
      curp: this.state.curp,
      rfc: this.state.rfc,
      aseguradora: this.state.aseguradora,
      ramo: this.state.ramo,
      tiposeguro: this.state.tiposeguro,
      asunto: this.state.asunto,
      descripcion: this.state.descripcion,
      monto: this.state.monto,
      contrato: this.state.contrato,
      honorarios: this.state.honorarios,
      anticipo: this.state.anticipo,
      asignadoA: this.state.asignadoA,
      recomendado: this.state.recomendado,
      estado: this.state.estado,
      actualizado: this.props.selectedNote.name,
      descr: this.state.descr
    });
  };
}
export default withStyles(styles)(EditorComponent);
