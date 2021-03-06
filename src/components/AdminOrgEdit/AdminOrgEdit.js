import Fab from "@material-ui/core/Fab";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import SaveTwoToneIcon from "@material-ui/icons/SaveTwoTone";
import React, { Component } from "react";
import swal from "sweetalert";
import mapStoreToProps from "../../redux/mapStoreToProps";
import "../AdminOrgEdit/AdminOrgEdit.css";

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: "none",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class AdminOrgEdit extends Component {
  state = {
    name: "",
    number: "",
    email: "",
    city: "",
    website: "",
    description: "",
    state: "",
    categories: [],
  };

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_CATEGORY'})
    this.setState({
      name: this.props.store.resourceDetails.name,
      number: this.props.store.resourceDetails.number,
      email: this.props.store.resourceDetails.email,
      city: this.props.store.resourceDetails.city,
      website: this.props.store.resourceDetails.website,
      description: this.props.store.resourceDetails.description,
      state: this.props.store.resourceDetails.state,
      categories: this.props.store.resourceDetails.categories,
    });
  }

  cancelSubmit = (orgID) => {
    swal({
      title: "Are you sure?",
      text: "Once cancelled, your edit will not be made!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Your edit has not been saved!", {
          icon: "success",
        });
        this.props.history.push("/adminOrgView", orgID);
      } else {
        swal("You can keep working on the edits");
      }
    });
  };

  updateOrg = (orgID) => {
    this.props.dispatch({
      type: "UPDATE_RESOURCE",
      payload: { id: orgID, resourceDetails: this.state },
    });
    this.setState({
      name: "",
      number: "",
      email: "",
      city: "",
      website: "",
      description: "",
      state: "",
      categories: [],
    });
    swal({
      title: "Update Organization details?",
      text: "Once cancelled, your edit will not be saved!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("You've updated the details!", {
          icon: "success",
        });
        this.props.history.push("/adminOrgView", orgID);
      } else {
        swal("You can keep working on the edits");
      }
    });
  };

  // this will handle the change of the textfields
  handleChange = (event, input) => {
    console.log("Details of org details:", this.state);
    this.setState({
      ...this.state,
      [input]: event.target.value,
    });
  };

  render() {
    const { resourceDetails } = this.props.store;
    const { classes } = this.props;
    return (
      <div className="container">
        {/* <center>
            <h2>Admin Organization Edit</h2>
          </center> */}
        {/* {resourceDetails.map((resource, i) => {
            return( */}
        <form className="white-background">
          <TextField
            id="standard-name"
            placeholder="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={(event) => this.handleChange(event, "name")}
            margin="normal"
          />
          <TextField
            id="standard-name"
            placeholder="Number"
            className={classes.textField}
            value={this.state.number}
            onChange={(event) => this.handleChange(event, "number")}
            margin="normal"
          />
          <TextField
            id="standard-name"
            placeholder="Email"
            className={classes.textField}
            value={this.state.email}
            onChange={(event) => this.handleChange(event, "email")}
            margin="normal"
          />
          <TextField
            id="standard-name"
            placeholder="City"
            className={classes.textField}
            value={this.state.city}
            onChange={(event) => this.handleChange(event, "city")}
            margin="normal"
          />
          <TextField
            id="standard-name"
            placeholder="Website"
            className={classes.textField}
            value={this.state.website}
            onChange={(event) => this.handleChange(event, "website")}
            margin="normal"
          />
          <TextField
            id="standard-name"
            placeholder="Description"
            className={classes.textField}
            value={this.state.description}
            onChange={(event) => this.handleChange(event, "description")}
            margin="normal"
          />
          <TextField
            id="standard-name"
            placeholder="State"
            className={classes.textField}
            value={this.state.state}
            onChange={(event) => this.handleChange(event, "state")}
            margin="normal"
          />

          <Select
            id="standard-categories"
            multiple
            value={this.state.categories ? this.state.categories : []}
            onChange={(event) => this.handleChange(event, "categories")}
          >
            {this.props.store.categoryReducer.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.description}
              </MenuItem>
            ))}
          </Select><br></br>

          <Fab
            style={{
              borderRadius: 35,
              backgroundColor: "#AFFA3D",
              fontFamily: "orbitron",
              marginTop: "1rem",
            }}
            className="float-right"
            variant="contained"
            onClick={() => this.cancelSubmit(resourceDetails.org_id)}
          >
            <HomeRoundedIcon />
          </Fab>

          <Fab
            style={{
              borderRadius: 35,
              backgroundColor: "#AFFA3D",
              fontFamily: "orbitron",
              marginTop: "1rem",
              marginLeft: "2rem",
            }}
            className="float-right"
            variant="contained"
            onClick={() => this.updateOrg(resourceDetails.org_id)}
          >
            <SaveTwoToneIcon />
          </Fab>

        </form>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(AdminOrgEdit));
