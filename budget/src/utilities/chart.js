import {inject} from 'aurelia-framework';
import {User} from '../services/user';
import * as HighCharts from "highcharts";
import Exporting from "node_modules/highcharts/modules/exporting.js"
import {Constants} from '../services/constants';

@inject(User, Constants)
export class Chart {
    constructor(user, constants) {
        this.user = user;
        this.constants = constants;
    }

    createChart(containerID, results) {
        var categories = ['Home', 'Car', 'Health', 'Discretionary'],
            data = [{
                y: 56.33,
                drilldown: {
                    name: 'Home Expenses',
                    categories: this.constants.homeCategories,
                    data: [1.06, 0.5, 17.2, 8.11, 5.33, 12.13, 3, 3, 3, 3],
                }
            }, {
                y: 10.38,
                drilldown: {
                    name: 'Car Expenses',
                    categories: this.constants.carCategories,
                    data: [0.33, 0.15, 3.56, 3.58, 2.76],
                }
            }, {
                y: 24.03,
                drilldown: {
                    name: 'Health Expenses',
                    categories: this.constants.healthCategories,
                    data: [1.56, 4.8, 4.87, 3.87, 5.14, 1.23, 2.53],
                }
            }, {
                y: 4.77,
                drilldown: {
                    name: 'Discretionary Expenses',
                    categories: this.constants.discretionaryCategories,
                    data: [2.86, 0.68, 0.29, 0.94],
                }
            }],
            browserData = [],
            versionsData = [],
            i,
            j,
            dataLen = data.length,
            drillDataLen,
            brightness;


        // Build the data arrays
        for (i = 0; i < dataLen; i += 1) {

            // add browser data
            browserData.push({
                name: categories[i],
                y: data[i].y,
            });

            // add version data
            drillDataLen = data[i].drilldown.data.length;
            for (j = 0; j < drillDataLen; j += 1) {
                brightness = 0.2 - (j / drillDataLen) / 5;
                versionsData.push({
                    name: data[i].drilldown.categories[j],
                    y: data[i].drilldown.data[j],
                });
            }
        }

        // Create the chart
        Highcharts.chart(containerID, {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'My Budet Plan'
            },
            subtitle: {
                text: 'My Expenses'
            },
            yAxis: {
                title: {
                    text: 'Total percent market share'
                }
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    center: ['50%', '50%']
                }
            },
            tooltip: {
                valueSuffix: '%'
            },
            series: [{
                name: 'Percentage of Total Expense',
                data: browserData,
                size: '50%',
                dataLabels: {
                    formatter: function () {
                        return this.y > 5 ? this.point.name : null;
                    },
                    color: '#ffffff',
                    distance: -30
                }
            }, {
                name: 'Amount',
                data: versionsData,
                size: '80%',
                innerSize: '60%',
                dataLabels: {
                    formatter: function () {
                        // display only if larger than 1
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
                            this.y + '%' : null;
                    }
                },
                id: 'versions'
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 400
                    },
                    chartOptions: {
                        series: [{
                            id: 'versions',
                            dataLabels: {
                                enabled: false
                            }
                        }]
                    }
                }]
            }
        });
    }


    // createChart(containerID, results) {
    //     Highcharts.chart(containerID, {
    //         chart: {
    //             type: 'pie',
    //             options3d: {
    //                 enabled: true,
    //                 alpha: 45
    //             }
    //         },
    //         title: {
    //             text: 'Your Budget Plan'
    //         },
    //         subtitle: {
    //             text: 'Your Expenses'
    //         },
    //         plotOptions: {
    //             pie: {
    //                 innerSize: 100,
    //                 depth: 45
    //             }
    //         },
    //         series: [{
    //             name: 'Delivered amount',
    //             data: results.expensesResults
    //         }]
    //     });
    // }

    createRecommendedChart(containerID, results) {
        Highcharts.chart(containerID, {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45
                }
            },
            title: {
                text: 'Recommended Budget Plan'
            },
            subtitle: {
                text: 'Recommended Expenses'
            },
            plotOptions: {
                pie: {
                    innerSize: 100,
                    depth: 45,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>'
                    }
                }
            },
            series: [{
                name: 'Expense amount',
                data: results.recommendedResults
            }]
        });
    }
}