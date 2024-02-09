let validBtn = document.getElementById('validBtn');
let dateDebutInput = document.getElementById('dateDebut');
let dateFinInput = document.getElementById('dateFin');
let errorDiv = document.getElementById('errorDiv')

let dateDebutTitle = document.getElementById('dateDebutTitle')
let dateFinTitle = document.getElementById('dateFinTitle')

let numbersOfDays = document.getElementById('numbersOfDays')

let detailBetweenTwoDatesSpan = document.getElementById('detailBetweenTwoDatesSpan')

        
        
validBtn.addEventListener("click", function(e) {
    
    e.preventDefault()
    
    let dateDebut = new Date(dateDebutInput.value)
    let dateFin = new Date(dateFinInput.value)
    let error = false;

    if(dateDebut > dateFin){

        errorDiv.innerHTML = "La date de début doit être supérieure ou égale à la date de fin !";

        errorDiv.classList.add('show');

        setTimeout(() => {
            errorDiv.classList.remove('show')
        }, 2000)

        error = true

    }

    if(dateDebut == "" || dateFin == ""){

        errorDiv.innerHTML = "Veuillez renseigner les deux dates SVP !";

        errorDiv.classList.add('show');

        setTimeout(() => {
            errorDiv.classList.remove('show')
        }, 2000)

        error = true

    }

    if(error == false){

        //title
        dateDebutTitle.innerHTML = (dateDebut.getDate() > 9 ? dateDebut.getDate() : "0" + dateDebut.getDate()) + "/" + ((dateDebut.getMonth() + 1) > 9 ? (dateDebut.getMonth() + 1) : "0" + (dateDebut.getMonth() + 1)) + "/" + dateDebut.getFullYear()
        dateFinTitle.innerHTML = (dateFin.getDate() > 9 ? dateFin.getDate() : "0" + dateFin.getDate()) + "/" + ((dateFin.getMonth() + 1) > 9 ? (dateFin.getMonth() + 1) : "0" + (dateFin.getMonth() + 1)) + "/" + dateFin.getFullYear()

        //detail                                        
        var detailBetweenTwoDates = getBetweenTwoDatesDetails(dateDebut, dateFin);
        detailBetweenTwoDatesSpan.innerHTML = detailBetweenTwoDates.years + 'an ' + (detailBetweenTwoDates.years <= 1 ? ' ' : 's ') + detailBetweenTwoDates.months + 'mois ' + detailBetweenTwoDates.days + 'jour' + (detailBetweenTwoDates.days <= 1 ? '' : 's');

        //nombre de jours
        let numbersOfDaysInVue = getNumberOfDays(dateDebut, dateFin)
        numbersOfDays.innerHTML = numbersOfDaysInVue

        alert(dateDebut.getDay())
    }
})

function getNumberOfDays(dateDebut, dateFin){

    let numbersOfTime = new Date(dateFin) - new Date(dateDebut)

    let numbersOfDays = Math.round(numbersOfTime / (1000 * 3600 * 24));

    return numbersOfDays;

}

function getBetweenTwoDatesDetails(startDate, endDate){

    var startYear = startDate.getFullYear();
    var startMonth = startDate.getMonth();
    var startDay = startDate.getDate();

    var endYear = endDate.getFullYear();
    var endMonth = endDate.getMonth();
    var endDay = endDate.getDate();

    // We calculate February based on end year as it might be a leep year which might influence the number of days.
    var february = (endYear % 4 == 0 && endYear % 100 != 0) || endYear % 400 == 0 ? 29 : 28;
    var daysOfMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var startDateNotPassedInEndYear = (endMonth < startMonth) || endMonth == startMonth && endDay < startDay;
    var years = endYear - startYear - (startDateNotPassedInEndYear ? 1 : 0);

    var months = (12 + endMonth - startMonth - (endDay < startDay ? 1 : 0)) % 12;

    // (12 + ...) % 12 makes sure index is always between 0 and 11
    var days = startDay <= endDay ? endDay - startDay : daysOfMonth[(12 + endMonth - 1) % 12] - startDay + endDay;

    return {
        years: years,
        months: months,
        days: days
    };

}