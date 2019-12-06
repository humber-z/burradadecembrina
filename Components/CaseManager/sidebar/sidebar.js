import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import SearchBar from "./searchBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import AddIcon from "@material-ui/icons/Add";
import { Divider, Button } from "@material-ui/core";
import SidebarItemComponent from "../sidebaritem/sidebarItem";
import Card from "@material-ui/core/Card";
import Dialog from "@material-ui/core/Dialog";
import NuevoCasoDialog from "./NuevoCasoDialog";

class SidebarComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      serachTerm: "",
      addingNote: false,
      title: "",
      estado: 1
    };
  }
  setSearchTerm = e => {
    this.setState({ serachTerm: e.target.value });
  };
  render() {
    const { notes, classes, selectedNoteIndex } = this.props;
    const { serachTerm } = this.state;
    if (notes) {
      const casos = notes.filter(item => item.estado == this.state.estado);
      const filteredData = casos.filter(
        item =>
          item.title
            .toLocaleLowerCase()
            .includes(serachTerm.toLocaleLowerCase()) ||
          item.body.toLocaleLowerCase().includes(serachTerm.toLocaleLowerCase())
      );
      return (
        <div className={classes.sidebarContainer}>
          <div style={{ width: "100%" }}>
            <SearchBar
              estado={this.state.estado}
              setSearchTerm={this.setSearchTerm}
              newNote={this.newNoteBtnClick}
              setCasosActivos={this.setCasosActivos}
              setCasosInactivos={this.setCasosInactivos}
              setCasosConcluidos={this.setCasosConcluidos}
            /> 
            <Dialog
              open={this.state.addingNote}
              onClose={this.newNoteBtnClick}
              aria-labelledby="form-dialog-title"
            >
              <NuevoCasoDialog
                newNoteBtnClick={this.newNoteBtnClick}
                title={this.state.title}
                newNote={this.newNote}
                updateTitle={this.updateTitle}
              />
            </Dialog>
          </div>
          <List>
            <Card>
              <ListItem alignItems="flex-start">
                <div className={classes.textSection}>
                  <h4 className={classes.itemText} style={{ width: "8%" }}>
                    Caso
                  </h4>
                  <h4 className={classes.itemText} style={{ width: "20%" }}>
                    Cliente
                  </h4>
                  <h4 className={classes.itemText} style={{ width: "8%" }}>
                    Institucion
                  </h4>
                  <h4 className={classes.itemText} style={{ width: "10%" }}>
                    Asunto
                  </h4>
                  <h4 className={classes.itemText} style={{ width: "10%" }}>
                    Etapa
                  </h4>
                  <h4 className={classes.itemText} style={{ width: "10%" }}>
                    Actualizado
                  </h4>
                  <h4 className={classes.itemText} style={{ width: "28%" }}>
                    Descripcion
                  </h4>
                </div>
              </ListItem>
            </Card>
          </List>
          <List>
            {filteredData.map((_note, _index) => {
              return (
                <Card key={_index} className={classes.card}>
                  <SidebarItemComponent
                    _note={_note}
                    _index={_index}
                    selectedNoteIndex={selectedNoteIndex}
                    selectNote={this.selectNote}
                    deleteNote={this.deleteNote}
                  />
                </Card>
              );
            })}
          </List>
        </div>
      );
    } else {
      return <div />;
    }
  }
  newNoteBtnClick = () => {
    if (this.props.notes) {
      const max = Math.max.apply(
        Math,
        this.props.notes.map(o => {
          return o.title.replace('-', "");
        })
      );
      //max = (max.length === 7 )?  '' + max : '0'  +max
      max = max + ""
      this.setState({title: max.substring(max.length - 4) == new Date().getFullYear() ?  `${parseInt(max.substr(0, max.length-4)) + 1}-${new Date().getFullYear()}` : `1-${new Date().getFullYear()}`})
      console.log("maximo", max);
    } else {
      this.setState({
        title: `1-${new Date().getFullYear()}`
      });
    }
    this.setState({
      // title: null,
      addingNote: !this.state.addingNote
    });
  };
  updateTitle = txt => {
    this.setState({ title: txt.target.value });
  };
  newNote = () => {
    if (this.state.title) {
      this.props.newNote(this.state.title);
      this.setState({ title: null, addingNote: false });
    }
  };
  selectNote = (n, i) => this.props.selectNote(n, i);
  deleteNote = note => this.props.deleteNote(note);
  setCasosActivos = () => {
    this.setState({ estado: 1 });
  };
  setCasosInactivos = () => {
    this.setState({ estado: 2 });
  };
  setCasosConcluidos = () => {
    this.setState({ estado: 3 });
  };
}
export default withStyles(styles)(SidebarComponent);
