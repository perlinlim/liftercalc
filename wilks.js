$(function() {
    var maleCoeff = [-216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863E-06, -1.291E-08];
    var femaleCoeff = [594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 4.731582E-05, -9.054E-08];
    var weightCoeff = 0.45359237;

    function GetWilks(bw, wl, gender) {
        var denominator = (gender == "male") ? maleCoeff[0] : femaleCoeff[0];
        var coeff = (gender == "male") ? maleCoeff : femaleCoeff;

        for(i=1; i<coeff.length; i++){
            denominator += coeff[i]*(Math.pow(bw, i));
        }

        return (500/denominator)*wl;
    };

    function GetBodyweight(wl, ws, gender) {
        return "not implemented";
    };

    function GetWeightLifted(bw, ws, gender) {
        var denominator = (gender == 'male') ? maleCoeff[0] : femaleCoeff[0];
        var coeff = (gender == 'male') ? maleCoeff : femaleCoeff;
        var weightConversion = ($("input[name=units]:checked").val() == "kg") ? 1 : weightCoeff;

        for(i=1; i<coeff.length; i++){
            denominator += coeff[i]*(Math.pow(bw, i));
        }

        return ((denominator/500)*ws)/weightConversion;
    };

    function ClearFields(panel){
        $("#" + panel + "-input-panel :input[type='text']").val("");
    };

    $("#calculate").click(function(){
        var fbw = +($("#firstBodyweight")[0].value);
        var fwl = +($("#firstWeightLifted")[0].value);
        var fws = +($("#firstWilksScore")[0].value);
        var gender = $("input[name=firstGender]:checked").val();

        var unit = $("input[name=units]:checked").val();
        var bw = (unit == "kg") ? fbw : fbw*weightCoeff;
        var wl = (unit == "kg") ? fwl : fwl*weightCoeff;

        var selectedUnknown = $("input[name='first-calc']:checked").val();
        switch(selectedUnknown){
            case "ws":
                if (fwl && (fwl > 0) && fbw && (fbw > 0)){
                    $("#output-div").show();
                    $("#output-span").text("Wilks Score: " + GetWilks(bw, wl, gender));
                    return;
                }
                alert("Please enter only positive, non-zero numbers.")
                return;
            case "wl":
                if (fws && (fws > 0) && fbw && (fbw > 0)){
                    $("#output-div").show();
                    $("#output-span").text("Weight Lifted: " + GetWeightLifted(bw, fws, gender) + " " + unit);
                    return;
                }
                alert("Please enter only positive, non-zero numbers.")
                return;
            case "bw":
                if (fwl && (fwl > 0) && fws && (fws > 0)){
                    $("#output-div").show();
                    $("#output-span").text("Bodyweight: " + GetBodyweight(wl, fws, gender) + " " + unit);
                    return;
                }
                alert("Please enter only positive, non-zero numbers.")
                return;
        }
    });

    $("input[name='first-calc']").click(function(){
        $("#output-div").hide();

        var selectedUnknown = $("input[name='first-calc']:checked").val();
        switch(selectedUnknown){
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