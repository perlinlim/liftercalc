import React from "react";
import ReactDOM from "react-dom";

interface UserInfo {
  bodyWeight: number;
  weightLifted: number;
  unit: string;
}

interface UserDataProps {
  onInfoSubmit: (bw: number, wl: number, unit: string) => void;
}

class UserData extends React.Component<UserDataProps, UserInfo> {
  constructor(props: any) {
    super(props);
    this.state = {
      bodyWeight: 0,
      weightLifted: 0,
      unit: "lb",
    };

    this.handleBodyWeightChange = this.handleBodyWeightChange.bind(this);
    this.handleWeightLiftedChange = this.handleWeightLiftedChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBodyWeightChange(event: any) {
    this.setState({ bodyWeight: event.target.value });
  }

  handleWeightLiftedChange(event: any) {
    this.setState({ weightLifted: event.target.value });
  }

  handleUnitChange(event: any) {
    this.setState({ unit: event.target.value });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    this.props.onInfoSubmit(
      this.state.bodyWeight,
      this.state.weightLifted,
      this.state.unit
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="bodyWeight">Body Weight:</label>
        <input
          id={"bodyWeight"}
          type="text"
          value={this.state.bodyWeight}
          onChange={this.handleBodyWeightChange}
        />
        <br />
        <label htmlFor="weightLifted">Weight Lifted:</label>
        <input
          id={"weightLifted"}
          type="text"
          value={this.state.weightLifted}
          onChange={this.handleBodyWeightChange}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class Wilks extends React.Component<any, any> {}

class App extends React.Component<{}, UserInfo> {
  constructor(props: any) {
    super(props);
    this.state = { bodyWeight: 0, weightLifted: 0, unit: "lb" };

    this.handleInfoUpdate = this.handleInfoUpdate.bind(this);
  }

  handleInfoUpdate(bodyWeight: number, weightLifted: number, unit: string) {
    this.setState(() => {
      return {
        bodyWeight,
        weightLifted,
        unit,
      };
    });
  }

  render() {
    return (
      <div>
        <UserData onInfoSubmit={this.handleInfoUpdate} />
        {/*<Wilks />
        <DOTS />
        <IPF />*/}
      </div>
    );
  }
}
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
