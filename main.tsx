import React from "react";
import ReactDOM from "react-dom";

interface UserProps {
  bodyWeight: number;
  weightLifted: number;
  isFemale: boolean;
}

interface UserPropsFull extends UserProps {
  competition: string;
}

interface UserInputState {
  bodyWeight: number;
  weightLifted: number;
  isFemale: boolean;
  isKG: boolean;
  event: string;
  category: string;
  message: string;
}

interface UserDataProps {
  onInfoSubmit: (
    bw: number,
    wl: number,
    isFemale: boolean,
    competition: string
  ) => void;
}

class UserData extends React.Component<UserDataProps, UserInputState> {
  constructor(props: any) {
    super(props);
    this.state = {
      bodyWeight: 0,
      weightLifted: 0,
      isKG: true,
      isFemale: false,
      event: "CL",
      category: "PL",
      message: "",
    };

    this.handleBodyWeightChange = this.handleBodyWeightChange.bind(this);
    this.handleWeightLiftedChange = this.handleWeightLiftedChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
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

  handleEventChange(event: any) {
    this.setState({ event: event.target.value });
  }

  handleCategoryChange(event: any) {
    this.setState({ category: event.target.value });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    let weightCoeff = 0.45359237;
    let bw = this.state.isKG
      ? this.state.bodyWeight
      : this.state.bodyWeight * weightCoeff;
    let wl = this.state.isKG
      ? this.state.weightLifted
      : this.state.weightLifted * weightCoeff;
    if (bw < 40) {
      let minWeight = this.state.isKG ? 40 : 90;
      this.setState({
        message:
          "Please enter a body weight greater than " +
          minWeight.toFixed(2) +
          " for best results.",
      });
      this.props.onInfoSubmit(0, 0, false, "CLPL");
    } else if (wl <= 0) {
      this.setState({
        message: "Please enter a lifted weight greater than 0.00",
      });
      this.props.onInfoSubmit(0, 0, false, "CLPL");
    } else {
      this.props.onInfoSubmit(
        bw,
        wl,
        this.state.isFemale,
        this.state.event.concat(this.state.category)
      );
    }
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
        <br />
        Gender:
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
        <br />
        Event:
        <label>
          <input
            type="radio"
            name="event"
            value="CL"
            checked={this.state.event === "CL"}
            onChange={this.handleEventChange}
          />
          Classic
        </label>
        <label>
          <input
            type="radio"
            name="event"
            value="EQ"
            checked={this.state.event === "EQ"}
            onChange={this.handleEventChange}
          />
          Equipped
        </label>
        <br />
        Category:
        <label>
          <input
            type="radio"
            name="category"
            value="PL"
            checked={this.state.category === "PL"}
            onChange={this.handleCategoryChange}
          />
          Powerlifting
        </label>
        <label>
          <input
            type="radio"
            name="category"
            value="BN"
            checked={this.state.category === "BN"}
            onChange={this.handleCategoryChange}
          />
          Bench
        </label>
        <br />
        <br />
        <label>
          Body Weight:
          <input
            id={"bodyWeight"}
            type="number"
            value={this.state.bodyWeight == 0 ? "" : this.state.bodyWeight}
            placeholder={"150"}
            onChange={this.handleBodyWeightChange}
          />
        </label>
        <br />
        <label>
          Weight Lifted:
          <input
            id={"weightLifted"}
            type="number"
            value={this.state.weightLifted == 0 ? "" : this.state.weightLifted}
            placeholder={"300"}
            onChange={this.handleWeightLiftedChange}
          />
        </label>
        <br />
        {this.state.message}
        <br />
        <input type="submit" value="Calculate" />
      </form>
    );
  }
}

class OldWilks extends React.Component<UserProps, {}> {
  constructor(props: UserProps) {
    super(props);
  }

  calculate(bw: number, wl: number, isFemale: boolean) {
    const maleCoeff = [
      -216.0475144,
      16.2606339,
      -0.002388645,
      -0.00113732,
      7.01863e-6,
      -1.291e-8,
    ];
    const femaleCoeff = [
      594.31747775582,
      -27.23842536447,
      0.82112226871,
      -0.00930733913,
      4.731582e-5,
      -9.054e-8,
    ];
    let denominator = isFemale ? femaleCoeff[0] : maleCoeff[0];
    let coeff = isFemale ? femaleCoeff : maleCoeff;

    for (let i = 1; i < coeff.length; i++) {
      denominator += coeff[i] * Math.pow(bw, i);
    }

    return (500 / denominator) * wl;
  }

  render() {
    let score = this.calculate(
      this.props.bodyWeight,
      this.props.weightLifted,
      this.props.isFemale
    );
    if (score > 0) {
      return <div>Old Wilks: {score.toFixed(2)}</div>;
    } else {
      return null;
    }
  }
}

class NewWilks extends React.Component<UserProps, {}> {
  constructor(props: UserProps) {
    super(props);
  }

  calculate(bw: number, wl: number, isFemale: boolean) {
    const maleCoeff = [
      47.4617885411949,
      8.47206137941125,
      0.073694103462609,
      -1.39583381094385e-3,
      7.07665973070743e-6,
      -1.20804336482315e-8,
    ];
    const femaleCoeff = [
      -125.425539779509,
      13.7121941940668,
      -0.0330725063103405,
      -1.0504000506583e-3,
      9.38773881462799e-6,
      -2.3334613884954e-8,
    ];
    let denominator = isFemale ? femaleCoeff[0] : maleCoeff[0];
    let coeff = isFemale ? femaleCoeff : maleCoeff;

    for (let i = 1; i < coeff.length; i++) {
      denominator += coeff[i] * Math.pow(bw, i);
    }

    return (600 / denominator) * wl;
  }

  render() {
    let score = this.calculate(
      this.props.bodyWeight,
      this.props.weightLifted,
      this.props.isFemale
    );
    if (score > 0) {
      return <div>New Wilks: {score.toFixed(2)}</div>;
    } else {
      return null;
    }
  }
}

class DOTS extends React.Component<UserProps, {}> {
  constructor(props: UserProps) {
    super(props);
  }

  calculate(bw: number, wl: number, isFemale: boolean) {
    const maleCoeff = [
      -307.75076,
      24.0900756,
      -0.1918759221,
      0.0007391293,
      -0.000001093,
    ];
    const femaleCoeff = [
      -57.96288,
      13.6175032,
      -0.1126655495,
      0.0005158568,
      -0.0000010706,
    ];

    let denominator = isFemale ? femaleCoeff[0] : maleCoeff[0];
    let coeff = isFemale ? femaleCoeff : maleCoeff;

    for (let i = 1; i < coeff.length; i++) {
      denominator += coeff[i] * Math.pow(bw, i);
    }

    return (500 / denominator) * wl;
  }

  render() {
    let score = this.calculate(
      this.props.bodyWeight,
      this.props.weightLifted,
      this.props.isFemale
    );
    if (score > 0) {
      return <div>DOTS: {score.toFixed(2)}</div>;
    } else {
      return null;
    }
  }
}

class IPF extends React.Component<UserPropsFull, {}> {
  constructor(props: UserPropsFull) {
    super(props);
  }

  calculate(bw: number, wl: number, isFemale: boolean, competition: string) {
    const maleCoeffCLPL = [310.67, 857.785, 53.216, 147.0835];
    const maleCoeffCLBN = [86.4745, 259.155, 17.5785, 53.122];
    const maleCoeffEQPL = [387.265, 1121.28, 80.6324, 222.4896];
    const maleCoeffEQBN = [133.94, 441.465, 35.3938, 113.0057];

    const femaleCoeffCLPL = [125.1435, 228.03, 34.5246, 86.8301];
    const femaleCoeffCLBN = [25.0485, 43.848, 6.7172, 13.952];
    const femaleCoeffEQPL = [176.58, 373.315, 48.4534, 110.0103];
    const femaleCoeffEQBN = [49.106, 124.209, 23.199, 67.4926];

    let coeff: number[];
    if (isFemale) {
      switch (competition) {
        case "CLBN":
          coeff = femaleCoeffCLBN;
          break;
        case "EQPL":
          coeff = femaleCoeffEQPL;
          break;
        case "EQBN":
          coeff = femaleCoeffEQBN;
          break;
        case "CLPL":
        default:
          coeff = femaleCoeffCLPL;
          break;
      }
    } else {
      switch (competition) {
        case "CLBN":
          coeff = maleCoeffCLBN;
          break;
        case "EQPL":
          coeff = maleCoeffEQPL;
          break;
        case "EQBN":
          coeff = maleCoeffEQBN;
          break;
        case "CLPL":
        default:
          coeff = maleCoeffCLPL;
          break;
      }
    }
    let lnbw = Math.log(bw);
    let score =
      500 +
      100 *
        ((wl - (coeff[0] * lnbw - coeff[1])) / (coeff[2] * lnbw - coeff[3]));
    return score;
  }

  render() {
    let score = this.calculate(
      this.props.bodyWeight,
      this.props.weightLifted,
      this.props.isFemale,
      this.props.competition
    );
    if (score > 0) {
      return <div>IPF: {score.toFixed(2)}</div>;
    } else {
      return null;
    }
  }
}

class IPF_GL extends React.Component<UserPropsFull, {}> {
  constructor(props: UserPropsFull) {
    super(props);
  }

  calculate(bw: number, wl: number, isFemale: boolean, competition: string) {
    const maleCoeffCLPL = [1199.72839, 1025.18162, 0.00921];
    const maleCoeffCLBN = [320.98041, 281.40258, 0.01008];
    const maleCoeffEQPL = [1236.25115, 1449.21864, 0.01644];
    const maleCoeffEQBN = [381.22073, 733.79378, 0.02398];

    const femaleCoeffCLPL = [610.32796, 1045.59282, 0.03048];
    const femaleCoeffCLBN = [142.40398, 442.52671, 0.04724];
    const femaleCoeffEQPL = [758.63878, 949.31382, 0.02435];
    const femaleCoeffEQBN = [221.82209, 357.00377, 0.02937];

    let coeff: number[];
    if (isFemale) {
      switch (competition) {
        case "CLBN":
          coeff = femaleCoeffCLBN;
          break;
        case "EQPL":
          coeff = femaleCoeffEQPL;
          break;
        case "EQBN":
          coeff = femaleCoeffEQBN;
          break;
        case "CLPL":
        default:
          coeff = femaleCoeffCLPL;
          break;
      }
    } else {
      switch (competition) {
        case "CLBN":
          coeff = maleCoeffCLBN;
          break;
        case "EQPL":
          coeff = maleCoeffEQPL;
          break;
        case "EQBN":
          coeff = maleCoeffEQBN;
          break;
        case "CLPL":
        default:
          coeff = maleCoeffCLPL;
          break;
      }
    }
    let power = -coeff[2] * bw;
    let score = wl * (100 / (coeff[0] - coeff[1] * Math.pow(Math.E, power)));
    return score;
  }

  render() {
    let score = this.calculate(
      this.props.bodyWeight,
      this.props.weightLifted,
      this.props.isFemale,
      this.props.competition
    );
    if (score > 0) {
      return <div>IPF GL: {score.toFixed(2)}</div>;
    } else {
      return null;
    }
  }
}

class App extends React.Component<{}, UserPropsFull> {
  constructor(props: any) {
    super(props);
    this.state = {
      bodyWeight: 0,
      weightLifted: 0,
      isFemale: false,
      competition: "CLPL",
    };

    this.handleInfoUpdate = this.handleInfoUpdate.bind(this);
  }

  handleInfoUpdate(
    bodyWeight: number,
    weightLifted: number,
    isFemale: boolean,
    competition: string
  ) {
    this.setState(() => {
      return {
        bodyWeight,
        weightLifted,
        isFemale,
        competition,
      };
    });
  }

  render() {
    return (
      <div>
        <UserData onInfoSubmit={this.handleInfoUpdate} />
        <br />
        <IPF_GL
          bodyWeight={this.state.bodyWeight}
          weightLifted={this.state.weightLifted}
          isFemale={this.state.isFemale}
          competition={this.state.competition}
        />
        <DOTS
          bodyWeight={this.state.bodyWeight}
          weightLifted={this.state.weightLifted}
          isFemale={this.state.isFemale}
        />
        <NewWilks
          bodyWeight={this.state.bodyWeight}
          weightLifted={this.state.weightLifted}
          isFemale={this.state.isFemale}
        />
        <br />
        <OldWilks
          bodyWeight={this.state.bodyWeight}
          weightLifted={this.state.weightLifted}
          isFemale={this.state.isFemale}
        />
        <IPF
          bodyWeight={this.state.bodyWeight}
          weightLifted={this.state.weightLifted}
          isFemale={this.state.isFemale}
          competition={this.state.competition}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
