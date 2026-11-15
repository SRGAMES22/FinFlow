class User < ApplicationRecord
  has_secure_password

  has_many :transactions, dependent: :destroy
  has_many :categories, dependent: :destroy
  has_many :goals, dependent: :destroy

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true
  validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }

  # subscription_type: free | mercenary
  enum subscription_type: { free: 0, mercenary: 1 }, _default: :free
end
