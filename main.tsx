import React from "react";
import ReactDOM from "react-dom";

interface Scores{
    bodyWeight: number;
    weightLifted: number;
    unit: string;
  IPFGL: string;
  IPF: string;
  OldWilks: string;
  NewWilks: string;
  DOTS: string;
}

interface ScoreList {
  list: Scores[];
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
    isKG: boolean,
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
    if (this.state.bodyWeight == 0) {
      this.setState({
        message:
          "Please enter a body weight.",
      });
    } else if (this.state.weightLifted == 0) {
      this.setState({
        message: "Please enter a lifted weight.",
      });
    } else {
      this.setState({
        message: "",
      });
      this.props.onInfoSubmit(
        this.state.bodyWeight,
        this.state.weightLifted,
        this.state.isKG,
        this.state.isFemale,
        this.state.event.concat(this.state.category)
      );
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={"radio-selection"}>
          <span className={"bold-label"}>Gender:</span>
          <br />
          <div className={"half-width"}>
              <input
                  id="male"
                type="radio"
                name="gender"
                value="false"
                checked={!this.state.isFemale}
                onChange={this.handleGenderChange}
              />
            <label htmlFor={"male"}>
              Male
            </label>
          </div>
          <div className={"half-width"}>
              <input
                  id="female"
                type="radio"
                name="gender"
                value="true"
                checked={this.state.isFemale}
                onChange={this.handleGenderChange}
              />

            <label htmlFor={"female"}>
              Female
            </label>
          </div>
        </div>
        <br />
        <div className={"clear padding-5-0"}></div>
        <div className={"radio-selection"}>
          <span className={"bold-label"}>Units:</span>
          <br />
          <div className={"half-width"}>
              <input
                  id="kg"
                type="radio"
                name="unit"
                value="true"
                checked={this.state.isKG}
                onChange={this.handleUnitChange}
              />
            <label htmlFor={"kg"}>
              Kilograms (KG)
            </label>
          </div>
          <div className={"half-width"}>
              <input
                  id="lb"
                type="radio"
                name="unit"
                value="false"
                checked={!this.state.isKG}
                onChange={this.handleUnitChange}
              />
            <label htmlFor="lb">
              Pounds (LB)
            </label>
          </div>
        </div>
        <br />
        <div className={"clear padding-5-0"}></div>
        <label className={"half-width"} htmlFor={"bodyWeight"}>Body Weight:</label>
        <input className={"width-40"}
          id="bodyWeight"
          type="number"
          value={this.state.bodyWeight == 0 ? "" : this.state.bodyWeight}
          placeholder={"150"}
          onChange={this.handleBodyWeightChange}
          max={this.state.isKG ? 500 : 1100}
          min={this.state.isKG ? 40 : 90}
        />
        <div className={"clear padding-5-0"}></div>
        <label className={"half-width"} htmlFor={"weightLifted"}>Weight Lifted:</label>
        <input className={"width-40"}
          id="weightLifted"
          type="number"
          value={this.state.weightLifted == 0 ? "" : this.state.weightLifted}
          placeholder={"300"}
          onChange={this.handleWeightLiftedChange}
          max={99999}
          min={0}
        />
        <div className={"clear padding-5-0 error horizontal-line"}>{this.state.message}</div>
          <div>
        <span className={"small-label"}>These values only used in IPF GL and IPF calculations:</span>
        <div className={"clear padding-5-0"}></div>
        <div className={"radio-selection"}>
          <span className={"bold-label"}>Event:</span>
          <br />
          <div className={"half-width"}>
              <input
                  id="classic"
                type="radio"
                name="event"
                value="CL"
                checked={this.state.event === "CL"}
                onChange={this.handleEventChange}
              />
            <label htmlFor={"classic"}>
              Classic/Raw
            </label>
          </div>
          <div className={"half-width"}>
              <input
                  id="equipped"
                type="radio"
                name="event"
                value="EQ"
                checked={this.state.event === "EQ"}
                onChange={this.handleEventChange}
              />
            <label htmlFor={"equipped"}>
              Equipped
            </label>
          </div>
        </div>
        <br />
        <div className={"clear padding-5-0"}></div>
        <div className={"radio-selection"}>
          <span className={"bold-label"}>Category:</span>
          <br />
          <div className={"half-width"}>
              <input
                  id="full"
                type="radio"
                name="category"
                value="PL"
                checked={this.state.category === "PL"}
                onChange={this.handleCategoryChange}
              />
            <label htmlFor={"full"}>
              Full Meet
            </label>
          </div>
          <div className={"half-width"}>
              <input
                  id={"bench"}
                type="radio"
                name="category"
                value="BN"
                checked={this.state.category === "BN"}
                onChange={this.handleCategoryChange}
              />
            <label htmlFor={"bench"}>
              Bench Only
            </label>
          </div>
        </div>
              </div>
        <br />
        <br />
        <input type="submit" className={"bold-label"} value="Calculate Scores" />
      </form>
    );
  }
}

function Calculate_OldWilks(bodyWeight: number, weightLifted: number, isFemale: boolean){
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
    denominator += coeff[i] * Math.pow(bodyWeight, i);
  }

  let score = (500 / denominator) * weightLifted;
  return score.toFixed(2);
}

function Calculate_NewWilks(bodyWeight: number, weightLifted: number, isFemale: boolean){
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
    denominator += coeff[i] * Math.pow(bodyWeight, i);
  }

  let score = (600 / denominator) * weightLifted;
  return score.toFixed(2);
}

function Calculate_DOTS(bodyWeight: number, weightLifted: number, isFemale: boolean){
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
      denominator += coeff[i] * Math.pow(bodyWeight, i);
    }

    let score = (500 / denominator) * weightLifted;
    return score.toFixed(2);
}

function Calculate_IPF(bodyWeight: number, weightLifted: number, isFemale: boolean, competition: string){
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
    let lnbw = Math.log(bodyWeight);
    let score =
      500 +
      100 *
        ((weightLifted - (coeff[0] * lnbw - coeff[1])) / (coeff[2] * lnbw - coeff[3]));
    return score.toFixed(2);
}

function Calculate_IPFGL(bodyWeight: number, weightLifted: number, isFemale: boolean, competition: string){
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
    let power = -coeff[2] * bodyWeight;
    let score = weightLifted * (100 / (coeff[0] - coeff[1] * Math.pow(Math.E, power)));
    return score.toFixed(2);
}

function GetScores(bodyWeight: number, weightLifted: number, isKG: boolean, isFemale: boolean, competition: string): Scores{
    let weightCoeff = 0.45359237;
    let bw = isKG
      ? bodyWeight
      : bodyWeight * weightCoeff;
    let wl = isKG
      ? weightLifted
      : weightLifted * weightCoeff;
    let unit = isKG ? "KG" : "LB";
  return {bodyWeight :  bodyWeight
      , weightLifted: weightLifted
      , unit: isKG ? "KG" : "LB"
    ,  IPFGL : Calculate_IPFGL(bw, wl, isFemale, competition)
    , NewWilks : Calculate_NewWilks(bw, wl, isFemale)
    , DOTS : Calculate_DOTS(bw, wl, isFemale)
    , IPF : Calculate_IPF(bw, wl, isFemale, competition)
    , OldWilks : Calculate_OldWilks(bw, wl, isFemale)};
}

function DisplayRow(scores: Scores){
    return (<div className={"result-box"}>
            <div>
                <span className={"weight"}>{scores.bodyWeight}</span>&nbsp;{scores.unit}&nbsp;lifting&nbsp;
                <span className={"weight"}>{scores.weightLifted}</span>&nbsp;{scores.unit}</div>
        <div className={"clear"}></div>
        <div className={"score-box"}>
            <span className={"small-label"}>IPF GL</span>
            <div className={"clear"}></div>
            <span className={"score"}>{scores.IPFGL}</span>
        </div>
        <div className={"score-box"}>
            <span className={"small-label"}>Wilks2</span>
            <div className={"clear"}></div>
            <span className={"score"}>{scores.NewWilks}</span>
        </div>
        <div className={"score-box"}>
            <span className={"small-label"}>DOTS</span>
            <div className={"clear"}></div>
            <span className={"score"}>{scores.DOTS}</span>
        </div>
        <div className={"score-box"}>
            <span className={"small-label"}>IPF</span>
            <div className={"clear"}></div>
            <span className={"score"}>{scores.IPF}</span>
        </div>
        <div className={"score-box"}>
            <span className={"small-label"}>Old Wilks</span>
            <div className={"clear"}></div>
            <span className={"score"}>{scores.OldWilks}</span>
        </div>
    </div>);
}

class History extends React.Component<ScoreList, {}>{
  constructor(props: any) {
    super(props);
  };

  render(){
      let hist = this.props.list.map((scores) => {return DisplayRow(scores)});
    return(
        <div>
            {hist}
        </div>
    );
  }
}

class App extends React.Component<{}, ScoreList> {
  constructor(props: any) {
    super(props);
    this.state = {
      list: [],
    };

    this.handleInfoUpdate = this.handleInfoUpdate.bind(this);
  }

  handleInfoUpdate(
    bodyWeight: number,
    weightLifted: number,
    isKG: boolean,
    isFemale: boolean,
    competition: string
  ) {
    let newScores = GetScores(bodyWeight, weightLifted, isKG, isFemale, competition);
    this.setState(() => {
      return {
        list: [newScores].concat(this.state.list),
      };
    });
  }

  render() {
    return (
      <div>
        <UserData onInfoSubmit={this.handleInfoUpdate} />
        <br />
        <History
          list={this.state.list}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
