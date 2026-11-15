module Api
  module V1
    class CategoriesController < ApplicationController
      def index
        categories = current_user.categories.order(:name)
        render json: categories
      end

      def create
        category = current_user.categories.build(category_params)

        if category.save
          render json: category, status: :created
        else
          render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def category_params
        params.permit(:name, :color, :icon)
      end
    end
  end
end
