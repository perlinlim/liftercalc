import React from "react";
import ReactDOM from "react-dom";

interface UserInfo {
  bodyWeight: number;
  weightLifted: number;
  isFemale: boolean;
}

interface UserInput extends UserInfo{
  isKG:boolean;
}

interface UserDataProps {
  onInfoSubmit: (bw: number, wl: number, isFemale:boolean) => void;
}

class UserData extends React.Component<UserDataProps, UserInput> {
  constructor(props: any) {
    super(props);
    this.state = {
      bodyWeight: 0,
      weightLifted: 0,
      isKG: true,
      isFemale: false
    };

    this.handleBodyWeightChange = this.handleBodyWeightChange.bind(this);
    this.handleWeightLiftedChange = this.handleWeightLiftedChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBodyWeightChange(event: any) {
    this.setState({ bodyWeight: event.target.value });
  }

  handleWeightLiftedChange(event: any) {
    this.setState({ weightLifted: event.target.value });
  }

  handleUnitChange(event: any) {
    this.setState({ isKG: event.target.value === "true" });
  }

  handleGenderChange(event: any) {
    this.setState({ isFemale: event.target.value === "true" });
  }

  handleSubmit(event: any) {
    event.preventDefault();
  let weightCoeff = 0.45359237;
    this.props.onInfoSubmit(
      this.state.isKG ? this.state.bodyWeight : this.state.bodyWeight * weightCoeff,
      this.state.isKG ? this.state.weightLifted : this.state.weightLifted * weightCoeff,
        this.state.isFemale,
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Units:
        <label>
      <input
        type="radio"
        name="unit"
        value="true"
        checked={this.state.isKG}
        onChange={this.handleUnitChange}
      />
      KG
    </label>
        <label>
      <input
        type="radio"
        name="unit"
        value="false"
        checked={!this.state.isKG}
        onChange={this.handleUnitChange}
      />
      LB
    </label>
        <br/><br/>
        <label>Body Weight:
        <input
          id={"bodyWeight"}
          type="text"
          value={this.state.bodyWeight == 0 ? undefined : this.state.bodyWeight}
          placeholder={"150"}
          onChange={this.handleBodyWeightChange}
        />
        </label>
        <br />
        <label>Weight Lifted:
        <input
          id={"weightLifted"}
          type="text"
          value={this.state.weightLifted == 0 ? undefined : this.state.weightLifted}
          placeholder={"300"}
          onChange={this.handleWeightLiftedChange}
        />
        </label>
        <br/>

        <br/>
        <label>
      <input
        type="radio"
        name="gender"
        value="false"
        checked={!this.state.isFemale}
        onChange={this.handleGenderChange}
      />
      Male
    </label>
        <label>
      <input
        type="radio"
        name="gender"
        value="true"
        checked={this.state.isFemale}
        onChange={this.handleGenderChange}
      />
      Female
    </label>
        <input type="submit" value="Calculate" />
      </form>
    );
  }
}

class Wilks extends React.Component<UserInfo, {}> {
constructor(props: UserInfo) {
  super(props);
}

  calculateWilks(bw:number, wl:number, isFemale:boolean){
var maleCoeff = [
    -216.0475144,
    16.2606339,
    -0.002388645,
    -0.00113732,
    7.01863e-6,
    -1.291e-8,
  ];
  var femaleCoeff = [
    594.31747775582,
    -27.23842536447,
    0.82112226871,
    -0.00930733913,
    4.731582e-5,
    -9.054e-8,
  ];
  var denominator = isFemale ? femaleCoeff[0] : maleCoeff[0];
    var coeff = isFemale ? femaleCoeff : maleCoeff;

    for (let i = 1; i < coeff.length; i++) {
      denominator += coeff[i] * Math.pow(bw, i);
    }

    return (500 / denominator) * wl;
  }

  render(){
    return(<div>Wilks: {this.calculateWilks(this.props.bodyWeight, this.props.weightLifted, this.props.isFemale)}</div>);
  }
}

class App extends React.Component<{}, UserInfo> {
  constructor(props: any) {
    super(props);
    this.state = { bodyWeight: 0, weightLifted: 0, isFemale:false };

    this.handleInfoUpdate = this.handleInfoUpdate.bind(this);
  }

  handleInfoUpdate(bodyWeight: number, weightLifted: number, isFemale: boolean) {
    this.setState(() => {
      return {
        bodyWeight,
        weightLifted,
        isFemale
      };
    });
  }

  render() {
    return (
      <div>
        <UserData onInfoSubmit={this.handleInfoUpdate} />
        <Wilks bodyWeight={this.state.bodyWeight} weightLifted={this.state.weightLifted} isFemale={this.state.isFemale}/>
        {/*<DOTS />
        <IPF />*/}
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("app"));
/*

$(function () {
  var maleCoeff = [
    -216.0475144,
    16.2606339,
    -0.002388645,
    -0.00113732,
    7.01863e-6,
    -1.291e-8,
  ];
  var femaleCoeff = [
    594.31747775582,
    -27.23842536447,
    0.82112226871,
    -0.00930733913,
    4.731582e-5,
    -9.054e-8,
  ];
  var weightCoeff = 0.45359237;

  function GetWilks(bw, wl, gender) {
    var denominator = gender == "male" ? maleCoeff[0] : femaleCoeff[0];
    var coeff = gender == "male" ? maleCoeff : femaleCoeff;

    for (i = 1; i < coeff.length; i++) {
      denominator += coeff[i] * Math.pow(bw, i);
    }

    return (500 / denominator) * wl;
  }

  function GetBodyweight(wl, ws, gender) {
    return "not implemented";
  }

  function GetWeightLifted(bw, ws, gender) {
    var denominator = gender == "male" ? maleCoeff[0] : femaleCoeff[0];
    var coeff = gender == "male" ? maleCoeff : femaleCoeff;
    var weightConversion =
      $("input[name=units]:checked").val() == "kg" ? 1 : weightCoeff;

    for (i = 1; i < coeff.length; i++) {
      denominator += coeff[i] * Math.pow(bw, i);
    }

    return ((denominator / 500) * ws) / weightConversion;
  }

  function ClearFields(panel) {
    $("#" + panel + "-input-panel :input[type='text']").val("");
  }

  $("#calculate").click(function () {
    var fbw = +$("#firstBodyweight")[0].value;
    var fwl = +$("#firstWeightLifted")[0].value;
    var fws = +$("#firstWilksScore")[0].value;
    var gender = $("input[name=firstGender]:checked").val();

    var unit = $("input[name=units]:checked").val();
    var bw = unit == "kg" ? fbw : fbw * weightCoeff;
    var wl = unit == "kg" ? fwl : fwl * weightCoeff;

    var selectedUnknown = $("input[name='first-calc']:checked").val();
    switch (selectedUnknown) {
      case "ws":
        if (fwl && fwl > 0 && fbw && fbw > 0) {
          $("#output-div").show();
          $("#output-span").text("Wilks Score: " + GetWilks(bw, wl, gender));
          return;
        }
        alert("Please enter only positive, non-zero numbers.");
        return;
      case "wl":
        if (fws && fws > 0 && fbw && fbw > 0) {
          $("#output-div").show();
          $("#output-span").text(
            "Weight Lifted: " + GetWeightLifted(bw, fws, gender) + " " + unit
          );
          return;
        }
        alert("Please enter only positive, non-zero numbers.");
        return;
      case "bw":
        if (fwl && fwl > 0 && fws && fws > 0) {
          $("#output-div").show();
          $("#output-span").text(
            "Bodyweight: " + GetBodyweight(wl, fws, gender) + " " + unit
          );
          return;
        }
        alert("Please enter only positive, non-zero numbers.");
        return;
    }
  });

  $("input[name='first-calc']").click(function () {
    $("#output-div").hide();

    var selectedUnknown = $("input[name='first-calc']:checked").val();
    switch (selectedUnknown) {
      case "ws":
        $("#fws-div").hide();
        $("#fwl-div").show();
        $("#fbw-div").show();
        ClearFields("first");
        break;
      case "wl":
        $("#fws-div").show();
        $("#fwl-div").hide();
        $("#fbw-div").show();
        ClearFields("first");
        break;
      case "bw":
        $("#fws-div").show();
        $("#fwl-div").show();
        $("#fbw-div").hide();
        ClearFields("first");
        break;
    }
  });
});
*/
