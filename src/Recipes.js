import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteRecipe } from "./actions/postActions.js";
import Modal from "./Modal";

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      edit: false,
      editRecipe: {}
    };
    this.btn = React.createRef();
    this.formRef = React.createRef();
  }

  toggleAdd = () => {
    this.setState({ add: !this.state.add });
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  render() {
    const { recipes } = this.props;
    const recipesLength = recipes.length ? (
      recipes.map((recipe, i) => {
        return (
          <div className="card my-2" key={recipe.id}>
            <div className="card-header">
              <a className="card-link" data-toggle="collapse" href={"#collapse" + i}>
                {recipe.name}
              </a>
              <span onClick={() => this.props.deleteRecipe(recipe.id)} style={{ float: "right", cursor: "pointer" }}>
                X
              </span>
            </div>
            <div id={"collapse" + i} className="collapse" data-parent="#accordion">
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {recipe.ingr.map((ing, i) => {
                    return (
                      <li className="list-group-item" key={i}>
                        {ing}
                      </li>
                    );
                  })}
                </ul>
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  style={{
                    cursor: "pointer"
                  }}
                  onClick={id => {
                    this.setState({
                      editRecipe: recipe
                    });
                    this.toggleEdit();
                  }}
                >
                  EDIT
                </button>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <p>No recipes</p>
    );
    return (
      <div>
        <button type="button" className="btn btn-primary" onClick={this.toggleAdd}>
          Add Recipe
        </button>
        <div id="accordion">{recipesLength}</div>

        <Modal
          add={this.state.add}
          edit={this.state.edit}
          onCloseAdd={this.toggleAdd}
          onCloseEdit={this.toggleEdit}
          recipeToEdit={this.state.editRecipe}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteRecipe: id => {
      dispatch(deleteRecipe(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipes);
