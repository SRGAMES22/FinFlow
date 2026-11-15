import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const API_URL = 'http://localhost:3000/api/v1';

export default function HomeScreen() {
  const { user, token, logout } = useAuth();
  const { theme, themeName, setTheme } = useTheme();
  const [summary, setSummary] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [sumRes, txRes] = await Promise.all([
        axios.get(`${API_URL}/dashboard/summary`, { headers }),
        axios.get(`${API_URL}/transactions`, { headers }),
      ]);
      setSummary(sumRes.data);
      setTransactions(txRes.data.slice(0, 8));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const cycleTheme = () => {
    const order: any[] = ['light', 'dark'];
    if (user?.subscription_type === 'mercenary') order.push('mercenary');
    const next = order[(order.indexOf(themeName) + 1) % order.length];
    setTheme(next);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* Header */}
      <View style={{ paddingTop: 56, paddingHorizontal: 20, paddingBottom: 16, backgroundColor: theme.card, borderBottomWidth: 1, borderBottomColor: theme.border }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.primary }}>FinFlow</Text>
            {user?.subscription_type === 'mercenary' && (
              <Text style={{ fontSize: 11, color: '#e31c25', fontWeight: '600', marginTop: 2 }}>MERCENARY</Text>
            )}
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity onPress={cycleTheme}>
              <Text style={{ color: theme.muted, fontSize: 13 }}>Tema</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
              <Text style={{ color: theme.muted, fontSize: 13 }}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />}
      >
        {/* Cards */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
          <View style={{ flex: 1, backgroundColor: theme.card, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: theme.border }}>
            <Text style={{ color: theme.muted, fontSize: 12 }}>Saldo</Text>
            <Text style={{ color: (summary?.balance || 0) >= 0 ? '#22c55e' : '#ef4444', fontSize: 20, fontWeight: 'bold', marginTop: 4 }}>
              R$ {Number(summary?.balance || 0).toFixed(2)}
            </Text>
          </View>
          <View style={{ flex: 1, backgroundColor: theme.card, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: theme.border }}>
            <Text style={{ color: theme.muted, fontSize: 12 }}>Receitas</Text>
            <Text style={{ color: '#22c55e', fontSize: 18, fontWeight: 'bold', marginTop: 4 }}>
              R$ {Number(summary?.total_income || 0).toFixed(2)}
            </Text>
          </View>
        </View>

        <Text style={{ color: theme.text, fontSize: 16, fontWeight: '600', marginBottom: 12 }}>Últimas transações</Text>

        {transactions.map((t) => (
          <View
            key={t.id}
            style={{
              backgroundColor: theme.card,
              padding: 16,
              borderRadius: 14,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: theme.border,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View>
              <Text style={{ color: theme.text, fontWeight: '500' }}>{t.description}</Text>
              <Text style={{ color: theme.muted, fontSize: 12, marginTop: 2 }}>
                {t.category?.name || 'Sem categoria'}
              </Text>
            </View>
            <Text style={{ color: t.transaction_type === 'income' ? '#22c55e' : '#ef4444', fontWeight: '600' }}>
              {t.transaction_type === 'income' ? '+' : '-'} R$ {Number(t.amount).toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
