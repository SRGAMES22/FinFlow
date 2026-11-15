module Api
  module V1
    class DashboardController < ApplicationController
      def summary
        transactions = current_user.transactions

        total_income = transactions.income.sum(:amount)
        total_expense = transactions.expense.sum(:amount)
        balance = total_income - total_expense

        render json: {
          balance: balance,
          total_income: total_income,
          total_expense: total_expense,
          transactions_count: transactions.count,
          goals_count: current_user.goals.count
        }
      end
    end
  end
end
