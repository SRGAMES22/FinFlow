module Api
  module V1
    class TransactionsController < ApplicationController
      def index
        transactions = current_user.transactions
                                   .includes(:category)
                                   .order(date: :desc)

        render json: transactions.as_json(include: :category)
      end

      def create
        transaction = current_user.transactions.build(transaction_params)

        if transaction.save
          render json: transaction.as_json(include: :category), status: :created
        else
          render json: { errors: transaction.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def show
        transaction = current_user.transactions.find(params[:id])
        render json: transaction.as_json(include: :category)
      end

      def update
        transaction = current_user.transactions.find(params[:id])

        if transaction.update(transaction_params)
          render json: transaction.as_json(include: :category)
        else
          render json: { errors: transaction.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        transaction = current_user.transactions.find(params[:id])
        transaction.destroy
        head :no_content
      end

      private

      def transaction_params
        params.permit(:amount, :description, :transaction_type, :date, :category_id)
      end
    end
  end
end
