import {PersonalInfoData} from '../services/data/personalInfoData';
import {GoalsData} from '../services/data/goalsData';
import {ExpensesData} from '../services/data/expensesData';
import {ResultsData} from '../services/data/resultsData';
import {RecommendedData} from '../services/data/recommendedData';

export class User {
    constructor() {
        this.personalInfo = new PersonalInfoData();
        this.goals = new GoalsData();
        this.expenses = new ExpensesData();
        this.results = new ResultsData();
        this.recommend = new RecommendedData();
    }
}