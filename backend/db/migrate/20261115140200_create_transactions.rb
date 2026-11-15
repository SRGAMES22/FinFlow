class CreateTransactions < ActiveRecord::Migration[7.2]
  def change
    create_table :transactions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :category, foreign_key: true
      t.decimal :amount, precision: 12, scale: 2, null: false
      t.string :description, null: false
      t.integer :transaction_type, null: false, default: 0
      t.date :date, null: false

      t.timestamps
    end

    add_index :transactions, [:user_id, :date]
  end
end
