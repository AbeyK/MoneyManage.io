export class ResultsData {
    constructor() {
        this.simpleChartResults = [];
        this.recommendedResults = [];
        this.showGoals = false;

        //CHECK WHICH CHART TO SHOW
        this.showBudget = true;
        this.showAdvanced = false;
        this.showGoalsChart = false;
        this.showExpenses = false;
        this.showAdvancedRecommended = false;

        //FIVE YEAR VALUES
        this.fiveYearExpenses = [];
        this.fiveYearIncome = [];
        this.fiveYearSavings = [];
        this.fiveYearEarnings = [];

        //FIVE YEAR GOALS
        this.fiveYearPrivateSchoolGoal = [];
        this.fiveYearCollegeGoal = [];
        this.fiveYearWeddingGoal = [];
        this.fiveYearVacationGoal = [];
        this.fiveYearBoatGoal = [];
        this.fiveYearNewCarGoal = [];
        this.fiveYearOtherGoal = [];

        //MEETING GOALS
        this.PrivateSchoolMetGoal = false;
        this.CollegeMetGoal = false;
        this.WeddingMetGoal = false;
        this.VacationMetGoal = false;
        this.BoatMetGoal = false;
        this.NewCarMetGoal = false;
        this.OtherMetGoal = false;

        this.chartGoals = [];

        //HOME PERCENTAGES
        this.homePercentage = 0;
        this.mortgagePercentage = 0;
        this.propertyTaxPercentage = 0;
        this.phonePercentage = 0;
        this.internetPercentage = 0;
        this.cablePercentage = 0;
        this.netflixPercentage = 0;
        this.groceriesPercentage = 0;
        this.utilitiesPercentage = 0;
        this.homeMaintenancePercentage = 0;
        this.clothesPercentage = 0;
        this.homePercentageArray = [];
        this.homeFiveYears = [];
        this.advancedHomeAmounts = [];

        //CAR PERCENTAGES
        this.carPercentage = 0;
        this.carPaymentPercentage = 0;
        this.carInsurancePercentage = 0;
        this.publicTransportPercentage = 0;
        this.gasPercentage = 0;
        this.carMaintenancePercentage = 0;
        this.carPercentageArray = [];
        this.carFiveYears = [];
        this.advancedCarAmounts = [];

        //HEALTH PERCENTAGES
        this.healthPercentage = 0;
        this.healthInsurancePercentage = 0;
        this.medicationPercentage = 0;
        this.unexpectedMedicalProblemsPercentage = 0;
        this.eyeCarePercentage = 0;
        this.dentalInsurancePercentage = 0;
        this.cavitiesPercentage = 0;
        this.bracesPercentage = 0;
        this.healthPercentageArray = [];
        this.healthFiveYears = [];
        this.advancedHealthAmounts = [];

        //DISCRETIONARY PERCENTAGES
        this.discretionaryPercentage = 0;
        this.eatingOutPercentage = 0;
        this.barsPercentage = 0; 
        this.funMoneyPercentage = 0;
        this.otherPercentage = 0;
        this.discretionaryPercentageArray = [];
        this.discretionaryFiveYears = [];
        this.advancedDiscretionaryAmounts = [];
    }
}