var app = angular.module('CarCostCalculatorApp', ['ui.utils.masks']);
app.controller('CarCostCalculatorCtrl', function($scope){

  // opinionated startup parameters
  $scope.params = {
    fuel: {
      km_month: 1000,
      km_per_liter: 8.9,
      liter_price: 3.4
    },
    fixed_expenses: {
      annual: {
        ipva: 1800,
        insurance: 0
      },
      monthly: {
        garage_home: 0,
        garage_work: 0,
        parking: 200,
      }
    }
  };

  $scope.calculateFuelCost = function(){
    // fuel consumption per distance
    var liters_consumed = $scope.params.fuel.km_month / $scope.params.fuel.km_per_liter;
    var fuel_cost_per_month = liters_consumed * $scope.params.fuel.liter_price;
    return 12 * fuel_cost_per_month;
  };

  $scope.calculateFixedExpenses = function(){
    var monthlyExpenses = 0;
    var annualExpenses = 0;

    for(i in $scope.params.fixed_expenses.annual){
      annualExpenses += $scope.params.fixed_expenses.annual[i];
    }

    for(i in $scope.params.fixed_expenses.monthly){
      monthlyExpenses += $scope.params.fixed_expenses.monthly[i];
    }

    return monthlyExpenses * 12 + annualExpenses;
  }

  $scope.calculateTotalCost = function(){
    var cost = 0;

    cost += $scope.calculateFuelCost();
    cost += $scope.calculateFixedExpenses();

    return cost;
  };
});