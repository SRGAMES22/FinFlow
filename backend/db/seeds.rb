puts "Criando usuário de demonstração..."

user = User.find_or_create_by!(email: "demo@finflow.app") do |u|
  u.name = "Demo User"
  u.password = "123456"
  u.password_confirmation = "123456"
  u.subscription_type = :mercenary
end

puts "Usuário criado: #{user.email} / senha: 123456"

categories_data = [
  { name: "Alimentação", color: "#ef4444", icon: "utensils" },
  { name: "Transporte", color: "#3b82f6", icon: "car" },
  { name: "Moradia", color: "#8b5cf6", icon: "home" },
  { name: "Lazer", color: "#ec4899", icon: "gamepad" },
  { name: "Saúde", color: "#10b981", icon: "heart" },
  { name: "Salário", color: "#22c55e", icon: "wallet" },
  { name: "Investimentos", color: "#f59e0b", icon: "trending-up" }
]

categories_data.each do |data|
  user.categories.find_or_create_by!(name: data[:name]) do |c|
    c.color = data[:color]
    c.icon = data[:icon]
  end
end

puts "Categorias criadas."

# Algumas transações de exemplo
if user.transactions.count.zero?
  cat_alimentacao = user.categories.find_by(name: "Alimentação")
  cat_salario = user.categories.find_by(name: "Salário")
  cat_transporte = user.categories.find_by(name: "Transporte")

  user.transactions.create!([
    { amount: 4500.00, description: "Salário mensal", transaction_type: :income, date: Date.today.beginning_of_month, category: cat_salario },
    { amount: 89.90, description: "Mercado", transaction_type: :expense, date: Date.today - 2, category: cat_alimentacao },
    { amount: 45.00, description: "Uber", transaction_type: :expense, date: Date.today - 1, category: cat_transporte },
    { amount: 120.50, description: "Restaurante", transaction_type: :expense, date: Date.today, category: cat_alimentacao }
  ])
end

# Metas de exemplo
if user.goals.count.zero?
  user.goals.create!([
    { title: "Reserva de emergência", target_amount: 10000, current_amount: 3200, deadline: 6.months.from_now },
    { title: "Viagem", target_amount: 5000, current_amount: 1500, deadline: 4.months.from_now }
  ])
end

puts "Seeds finalizados com sucesso!"
