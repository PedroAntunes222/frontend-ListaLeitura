class MyApp extends React.Component {
  constructor() {
    super();
    this.state = {
      filterName: "",
      filterCity: "",
      friends: [
        { id: 1, name: "Carl", city: "New York" },
        { id: 2, name: "Anna", city: "New York" },
        { id: 3, name: "Carl", city: "Sydney" },
      ],
    };
  }

  changeFilterName = (e) => {
    this.setState({ filterName: e.target.value });
  };

  changeFilterCity = (e) => {
    this.setState({ filterCity: e.target.value });
  };

  render() {
    let friends = this.state.friends.slice();
    if (this.state.filterName) {
      friends = friends.filter(
        (item) => item.name.toLowerCase() == this.state.filterName.toLowerCase()
      );
    }
    if (this.state.filterCity) {
      friends = friends.filter(
        (item) => item.city.toLowerCase() == this.state.filterCity.toLowerCase()
      );
    }
    return (
      <div>
        <label for="name">Name: </label>
        <input
          id="name"
          onChange={this.changeFilterName}
          value={this.state.filterName}
        />
        <label for="city">City: </label>
        <input
          id="city"
          onChange={this.changeFilterCity}
          value={this.state.filterCity}
        />
        <ul>
          {friends.map((item) => (
            <li key={item.id}>{item.name + " - " + item.city}</li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<MyApp />, document.getElementById("myApp"));
