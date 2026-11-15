module Api
  module V1
    class GoalsController < ApplicationController
      def index
        goals = current_user.goals.order(created_at: :desc)
        render json: goals
      end

      def create
        goal = current_user.goals.build(goal_params)

        if goal.save
          render json: goal, status: :created
        else
          render json: { errors: goal.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        goal = current_user.goals.find(params[:id])

        if goal.update(goal_params)
          render json: goal
        else
          render json: { errors: goal.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        goal = current_user.goals.find(params[:id])
        goal.destroy
        head :no_content
      end

      private

      def goal_params
        params.permit(:title, :target_amount, :current_amount, :deadline)
      end
    end
  end
end
