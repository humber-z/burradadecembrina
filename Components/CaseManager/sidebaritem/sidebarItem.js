import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
//import { removeHTMLTags } from '../helpers';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

class SidebarItemComponent extends React.Component {
  render() {
    const { _index, _note, classes, selectedNoteIndex } = this.props;
    const updated =
      _note.timestamp != null
        ? new Date(_note.timestamp.toDate()).toLocaleDateString()
        : null;

    return (
      <div key={_index}>
        <ListItem
          className={classes.listItem}
          selected={selectedNoteIndex === _index}
          alignItems="flex-start"
        >
          <div
            className={classes.textSection}
            onClick={() => this.selectNote(_note, _index)}
          >
            <h4 className={classes.itemText} style={{ width: "8%" }}>
              {_note.title}
            </h4>
            <h4 className={classes.itemText} style={{ width: "20%" }}>
              {_note.body}
            </h4>
            <h4 className={classes.itemText} style={{ width: "8%" }}>
              {_note.aseguradora}
            </h4>
            <h4 className={classes.itemText} style={{ width: "10%" }}>
              {_note.tiposeguro}
            </h4>
            <h4 className={classes.itemText} style={{ width: "10%" }}>
              {_note.etapa}
            </h4>
            <h4 className={classes.itemText} style={{ width: "10%" }}>
              {updated}
            </h4>
            <h4 className={classes.itemText} style={{ width: "28%" }}>
              {_note.descr}
            </h4>
          </div>
          <DeleteIcon
            onClick={() => this.deleteNote(_note)}
            className={classes.deleteIcon}
          />
        </ListItem>
      </div>
    );
  }
  selectNote = (n, i) => this.props.selectNote(n, i);
  deleteNote = note => {
    if (window.confirm(`Confirmacion para eliminar caso: ${note.title}`)) {
      this.props.deleteNote(note);
    }
  };
}
export default withStyles(styles)(SidebarItemComponent);
