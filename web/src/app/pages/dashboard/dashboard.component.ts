import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService, Theme } from '../../core/services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen" style="background-color: var(--bg)">
      <!-- Header -->
      <header class="border-b px-6 py-4 flex items-center justify-between" style="border-color: var(--border); background-color: var(--card)">
        <div class="flex items-center gap-3">
          <h1 class="text-xl font-bold" style="color: var(--primary)">FinFlow</h1>
          <span *ngIf="auth.currentUser()?.subscription_type === 'mercenary'"
                class="text-xs px-2 py-1 rounded-full font-medium"
                style="background-color: #e31c25; color: white">
            MERCENARY
          </span>
        </div>

        <div class="flex items-center gap-4">
          <!-- Theme Switcher -->
          <div class="flex gap-1 p-1 rounded-lg" style="background-color: var(--bg)">
            <button
              (click)="setTheme('light')"
              class="px-3 py-1.5 rounded-md text-sm transition"
              [class.font-semibold]="theme.currentTheme() === 'light'"
              style="color: var(--text)"
            >Light</button>
            <button
              (click)="setTheme('dark')"
              class="px-3 py-1.5 rounded-md text-sm transition"
              [class.font-semibold]="theme.currentTheme() === 'dark'"
              style="color: var(--text)"
            >Dark</button>
            <button
              (click)="setTheme('mercenary')"
              [disabled]="auth.currentUser()?.subscription_type !== 'mercenary'"
              class="px-3 py-1.5 rounded-md text-sm transition disabled:opacity-40"
              [class.font-semibold]="theme.currentTheme() === 'mercenary'"
              style="color: var(--text)"
              title="Disponível no plano Mercenary"
            >Mercenary</button>
          </div>

          <button (click)="logout()" class="text-sm" style="color: var(--muted)">Sair</button>
        </div>
      </header>

      <main class="p-6 max-w-6xl mx-auto">
        <!-- Cards de resumo -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="p-6 rounded-2xl" style="background-color: var(--card); border: 1px solid var(--border)">
            <p class="text-sm" style="color: var(--muted)">Saldo atual</p>
            <p class="text-3xl font-bold mt-1" [style.color]="(summary()?.balance || 0) >= 0 ? '#22c55e' : '#ef4444'">
              R$ {{ summary()?.balance | number:'1.2-2' }}
            </p>
          </div>

          <div class="p-6 rounded-2xl" style="background-color: var(--card); border: 1px solid var(--border)">
            <p class="text-sm" style="color: var(--muted)">Receitas</p>
            <p class="text-3xl font-bold mt-1 text-green-500">
              R$ {{ summary()?.total_income | number:'1.2-2' }}
            </p>
          </div>

          <div class="p-6 rounded-2xl" style="background-color: var(--card); border: 1px solid var(--border)">
            <p class="text-sm" style="color: var(--muted)">Despesas</p>
            <p class="text-3xl font-bold mt-1 text-red-500">
              R$ {{ summary()?.total_expense | number:'1.2-2' }}
            </p>
          </div>
        </div>

        <!-- Transações recentes -->
        <div class="rounded-2xl overflow-hidden" style="background-color: var(--card); border: 1px solid var(--border)">
          <div class="px-6 py-4 border-b" style="border-color: var(--border)">
            <h2 class="font-semibold" style="color: var(--text)">Transações recentes</h2>
          </div>

          <div *ngIf="transactions().length === 0" class="p-8 text-center" style="color: var(--muted)">
            Nenhuma transação ainda
          </div>

          <div *ngFor="let t of transactions()" class="px-6 py-4 flex items-center justify-between border-b last:border-0" style="border-color: var(--border)">
            <div>
              <p class="font-medium" style="color: var(--text)">{{ t.description }}</p>
              <p class="text-sm" style="color: var(--muted)">{{ t.date | date:'dd/MM/yyyy' }} • {{ t.category?.name || 'Sem categoria' }}</p>
            </div>
            <p class="font-semibold" [class.text-green-500]="t.transaction_type === 'income'" [class.text-red-500]="t.transaction_type === 'expense'">
              {{ t.transaction_type === 'income' ? '+' : '-' }} R$ {{ t.amount | number:'1.2-2' }}
            </p>
          </div>
        </div>
      </main>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  summary = signal<any>(null);
  transactions = signal<any[]>([]);

  constructor(
    public auth: AuthService,
    public theme: ThemeService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.api.getDashboard().subscribe(data => this.summary.set(data));
    this.api.getTransactions().subscribe((data: any) => this.transactions.set(data.slice(0, 10)));
  }

  setTheme(theme: Theme) {
    if (theme === 'mercenary' && this.auth.currentUser()?.subscription_type !== 'mercenary') {
      return;
    }
    this.theme.setTheme(theme);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
