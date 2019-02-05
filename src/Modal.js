import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addRecipe, editRecipe } from "./actions/postActions.js";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ingr: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (mode, id) => {
    if (mode === "add") {
      id = Math.random();
      console.log(id, this.state.name, this.state.ingr.split(","));
      if (this.state.name !== "" && this.state.ingr !== "") {
        this.props.addRecipe(id, this.state.name, this.state.ingr.split(","));
        this.setState({ name: "", ingr: "" });
        this.props.onCloseAdd();
      }
    } else if (mode === "edit") {
      const name = this.state.name === "" ? this.props.recipeToEdit.name : this.state.name;
      const ingr = this.state.ingr === "" ? this.props.recipeToEdit.ingr : this.state.ingr.split(",");
      this.props.editRecipe(id, name, ingr);
      console.log(id, name, ingr);
      this.setState({ name: "", ingr: "" });
      this.props.onCloseEdit();
    }
  };

  render() {
    // The gray background
    const backdropStyle = {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 2,
      backgroundColor: "rgba(0,0,0,0.3)",
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: "#fff",
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: "0 auto",
      padding: 30
    };

    console.log(this.props);
    // Render nothing if the "show" prop is false
    if (!this.props.add && !this.props.edit) {
      return null;
    }

    const recipe = this.props.recipeToEdit;
    console.log(recipe);
    if (this.props.edit) {
      return (
        <div style={backdropStyle}>
          <div style={modalStyle}>
            <h3>{recipe.name}</h3>
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.handleSubmit("edit", recipe.id);
                }}
              >
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      placeholder="Enter name"
                      defaultValue={recipe.name}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ingr">Ingredients</label>
                    <textarea
                      className="form-control"
                      id="ingr"
                      name="ingr"
                      rows="3"
                      placeholder="Comma seperated values"
                      defaultValue={recipe.ingr}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" id="close" onClick={this.props.onCloseEdit}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else if (this.props.add)
      return (
        <div style={backdropStyle}>
          <div style={modalStyle}>
            <h2>Add new Recipe</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.handleSubmit("add");
              }}
            >
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" name="name" id="name" placeholder="Enter name" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="ingr">Ingredients</label>
                  <textarea
                    className="form-control"
                    id="ingr"
                    name="ingr"
                    rows="3"
                    placeholder="Comma seperated values"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" id="close" onClick={this.props.onCloseAdd}>
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add new
                </button>
              </div>
            </form>
          </div>
        </div>
      );
  }
}

Modal.propTypes = {
  onCloseAdd: PropTypes.func.isRequired,
  onCloseEdit: PropTypes.func.isRequired,
  add: PropTypes.bool,
  edit: PropTypes.bool,
  recipe: PropTypes.object,
  children: PropTypes.node
};

const mapStateToProps = state => {
  return {
    recipes: state.recipes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRecipe: (id, name, ingr) => {
      dispatch(addRecipe(id, name, ingr));
    },
    editRecipe: (id, name, ingr) => {
      dispatch(editRecipe(id, name, ingr));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
