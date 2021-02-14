import React, { Component } from "react";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { connect } from "react-redux";
import { Button, withStyles, Select, MenuItem, InputLabel, Input, TextField, FormControl } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';

const styles = theme => ({
    inputs: {
        width: "",
        paddingTop: "",
        verticalAlign: "",
        fontFamily: "",
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
});

class DemographicQuestion extends Component {
    componentDidMount(){
        this.props.dispatch({type: 'FETCH_GENDER'})  
         this.props.dispatch({type: 'FETCH_MARRIAGE'})}   

    state = {
        vet: {
                first_name: "",
                last_name: "",
                email: "",
                birth: "",
                gender: 0,
                phone: "",
                marriage: 0,
                children: 0,
                homeless: "",
                homeAddress: '',
                homeApartment: '',
                homeCity: '',
                homeState: '',
                homeZip: '', 
                homeCountry: '',
                mailAddress: '',
                mailApartment: '',
                mailCity: '',
                mailState: '',
                mailZip: '', 
                mailCountry: ''
        }
    }

    handleChangeForGender = (event ) => {
        event.preventDefault();
        console.log("Handling input-change...");
        console.log("Setting state...");
        this.setState({
          vet: {
            ...this.state.vet, 
            gender: event.target.value
            }
        }, function () {
          console.log("state has been set:", this.state.vet);
        });
      };
   
      handleChangeForMarriage = (event) => {
        event.preventDefault();
        console.log("Handling input-change...");
        console.log("Setting state...");
        this.setState({
          vet: {
            ...this.state.vet, 
            marriage: event.target.value
            }
        }, function () {
          console.log("state has been set:", this.state.vet);
        });
      };

      handleInputChange = (event, inputProperty) => {
        console.log("Handling input-change...");
        console.log("Setting state...");
        this.setState(
            {
                vet: {
                    ...this.state.vet,
                    [inputProperty]: event.target.value,
                    user_id: this.props.store.user.id,
                },
            }, function(){
                console.log('State has been set', this.state.vet)
            });
    };

    handleInputChangeAddress = (event, inputProperty) => {
        console.log("Handling input-change...");
        console.log("Setting state...");
        this.setState(
            {
                vet: {
                    ...this.state.vet,
                    [inputProperty]: event.target.value,
                    user_id: this.props.store.user.id,
                },
            }, function(){
                console.log('State has been set', this.state.vet)
            });
    };


    saveDemographic = () => {
        let vetVar = this.state.vet
        if (vetVar.first_name === '' || vetVar.last_name === '') {
            alert("A first and last name is required for registration.");
        } else {
            this.props.dispatch({
                type: "ADD_DEMOGRAPHIC",
                payload: this.state.vet,
            });
            this.setState({
                vet: {
                    first_name: "",
                    last_name: "",
                    email: "",
                    birth: "",
                    gender: "",
                    phone: "",
                    marriage: "",
                    children: "",
                    homeless: "",
                    homeAddress: '',
                    homeApartment: '',
                    homeCity: '',
                    homeState: '',
                    homeZip: '', 
                    homeCountry: '',
                    mailAddress: '',
                    mailApartment: '',
                    mailCity: '',
                    mailState: '',
                    mailZip: '', 
                    mailCountry: ''
                }
            });
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <form>
                <TextField
                    variant="outlined"
                    label="First Name"
                    name="first_name"
                    value={this.state.vet.first_name}
                    onChange={(event) => this.handleInputChange(event, "first_name")}
                />
                <TextField
                    variant="outlined"
                    label="Last Name"
                    name="last_name"
                    value={this.state.vet.last_name}
                    onChange={(event) =>
                        this.handleInputChange(event, "last_name")}
                />
               
                <TextField
                    variant="outlined"
                    label="Email"
                    name="email"
                    value={this.state.vet.email}
                    onChange={(event) => this.handleInputChange(event, "email")}
                />
                {/* <Fab
                    style={{
                        borderRadius: 35,
                        backgroundColor: '#AFFA3D',
                        fontFamily: 'orbitron',
                    }}
                  onClick={(event) => { this.saveName(event) }}><SaveTwoToneIcon /></Fab> */}
                <TextField
                    variant="outlined"
                    label="Date of Birth"
                    name="birth"
                    value={this.state.vet.dOB}
                    onChange={(event) => this.handleInputChange(event, "birth")}
                />
               GENDER
               <FormControl className={classes.formControl}>
               {/* <InputLabel htmlFor="age-helper">Age</InputLabel> */}
                <Select
                // input={<Input name="vet" />}
                onChange={(event) => this.handleChangeForGender(event, 'gender')}

                value={this.state.vet.gender}
                // onChange={this.handleChangeForGender}
                inputProps={{
                  name: 'gender',
                  id: 'gender-simple',
                }}>
                  {this.props.store.genderDropdownReducer.map((gender, i) => {
                    return(
                      <MenuItem 
                        key={i} 
                        value={gender.id}
                      >
                        
                            {gender.description}</MenuItem>
                    )
                  })}
                </Select> 
                </FormControl>
                <TextField
                    id="standard-textarea"
                    variant="outlined"
                    label="Phone Number"
                    name="phone"
                    value={this.state.vet.phone}
                    onChange={(event) => this.handleInputChange(event, "phone")}
                />
MARRIAGE
<FormControl className={classes.formControl}>
               {/* <InputLabel htmlFor="age-helper">Age</InputLabel> */}
                <Select
                onChange={(event) => this.handleChangeForMarriage(event, 'marriage')}

                // input={<Input name="vet" />}
                value={this.state.vet.marriage}
                // onChange={this.handleChangeForGender}
                inputProps={{
                  name: 'marriage',
                  id: 'marriage-simple',
                }}>
                  {this.props.store.marriageDropdownReducer.map((marriage, i) => {
                    return(
                      <MenuItem 
                        key={i} 
                        value={marriage.id}
                      >
                        
                            {marriage.description}</MenuItem>
                    )
                  })}
                </Select> 
                </FormControl>

                <TextField
                    variant="outlined"
                    label="Children"
                    name="children"
                    value={this.state.vet.children}
                    onChange={(event) => this.handleInputChange(event, "children")}
                />  
ARE YOU CURRENTLY HOMELESS?
 <FormControl className={classes.formControl}> 
               {/* <InputLabel htmlFor="age-helper">Age</InputLabel> */}
                <Select
                onClick={(event) => this.handleInputChange(event, 'homeless')}

                // input={<Input name="vet" />}
                value={this.state.vet.homeless}
                // onChange={this.handleChangeForGender}
                inputProps={{
                  name: 'homeless',
                  id: 'homeless-simple',
                }}>
                {/* return( */}
                <MenuItem 
                    value='false'
                >
                        NO
                </MenuItem>
                <MenuItem
                    value='true'
                    // onClick={(event) => this.handleInputChange(event, 'homeless')}
                >
                        YES
                </MenuItem>
                    {/* ) */}
                {/*  })} */}
                </Select> 
                </FormControl>
                <br/>
                HOME ADDRESS
                <TextField
                    id="standard-textarea"
                    variant="outlined"
                    label="Address"
                    name="homeAddress"
                     value={this.state.vet.homeAddress}
                    onChange={(event) => this.handleInputChange(event, "homeAddress")}
                />

                <TextField
                    id="standard-textarea"
                    variant="outlined"
                    label="Apt/PO Box/Bldg"
                    name="homeApartment"
                     value={this.state.vet.homeApartment}
                    onChange={(event) => this.handleInputChange(event, "homeApartment")}
                />

                <TextField
                    id="standard-textarea"
                    variant="outlined"
                    label="City"
                    name="homeCity"
                     value={this.state.vet.homeCity}
                    onChange={(event) => this.handleInputChange(event, "homeCity")}
                />

                <TextField
                    id="standard-textarea"
                    variant="outlined"
                    label="State"
                    name="homeState"
                    value={this.state.vet.homeState}
                    onChange={(event) => this.handleInputChange(event, "homeState")}
                />
               
               <TextField
                    id="standard-textarea"
                    variant="outlined"
                    label="Zip Code"
                    name="homeZip"
                     value={this.state.vet.homeZip}
                    onChange={(event) => this.handleInputChange(event, "homeZip")}
                />

                <TextField
                    id="standard-textarea"
                    variant="outlined"
                    label="Country"
                    name="homeCountry"
                     value={this.state.vet.homeCountry}
                    onChange={(event) => this.handleInputChange(event, "homeCountry")}
                />
                <br/>
                MAIL ADDRESS

                <TextField
                    variant="outlined"
                    label="Address"
                    name="mailAddress"
                     value={this.state.vet.mailAddress}
                    onChange={(event) => this.handleInputChange(event, "mailAddress")}
                />

                <TextField
                    id="standard-textarea"
                    variant="outlined"
                    label="Apt/PO Box/Bldg"
                    name="mailApartment"
                     value={this.state.vet.mailApartment}
                    onChange={(event) => this.handleInputChange(event, "mailApartment")}
                />

                <TextField
                    id="standard-textarea"
                    variant="outlined"
                    label="City"
                    name="mailCity"
                    value={this.state.vet.mailCity}
                    onChange={(event) => this.handleInputChange(event, "mailCity")}
                />

                <TextField
                    id="standard-textarea"
                    variant="outlined"
                    label="State"
                    name="mailState"
                    value={this.state.vet.mailState}
                    onChange={(event) => this.handleInputChange(event, "mailState")}
                />
               
               <TextField
                    id="standard-textarea"
                    variant="outlined"
                    label="Zip Code"
                    name="mailZip"
                    value={this.state.vet.mailZip}
                    onChange={(event) => this.handleInputChange(event, "mailZip")}
                />

                <TextField
                    id="standard-textarea"
                    variant="outlined"
                    label="Country"
                    name="mailCountry"
                    value={this.state.vet.mailCountry}
                    onChange={(event) => this.handleInputChange(event, "mailCountry")}
                />

               
                <Button onClick={(event) =>this.saveDemographic(event)}>SAVE</Button>
                
                
                
                <Fab
                    style={{
                        borderRadius: 35,
                        backgroundColor: '#AFFA3D',
                        fontFamily: 'orbitron',
                    }}
                    onClick={(event) => { this.saveDOB(event) }}><SaveTwoToneIcon /></Fab>
            </form>
        )//END return
    };//END render
};//END Name

export default connect(mapStoreToProps)(withStyles(styles)(DemographicQuestion));