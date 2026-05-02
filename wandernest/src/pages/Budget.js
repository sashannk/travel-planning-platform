import { useMemo, useState } from 'react';
import PageTransition from '../components/PageTransition';

const categories = ['Flights', 'Hotel', 'Food', 'Travel'];
const formatRupees = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

export default function Budget() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ name: '', category: 'Flights', amount: '' });
  const [travelerCount, setTravelerCount] = useState(1);

  const perPersonBreakdown = useMemo(
    () =>
      categories.map((category) => ({
        category,
        total: expenses
          .filter((expense) => expense.category === category)
          .reduce((sum, expense) => sum + expense.amount, 0),
      })),
    [expenses],
  );
  const perPersonTotal = perPersonBreakdown.reduce((sum, item) => sum + item.total, 0);
  const total = perPersonTotal * travelerCount;
  const breakdown = perPersonBreakdown.map((item) => ({
    ...item,
    total: item.total * travelerCount,
  }));

  const addExpense = (event) => {
    event.preventDefault();
    const amount = Number(form.amount);

    if (!form.name.trim() || !amount || amount < 0) {
      return;
    }

    const id = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
    setExpenses((current) => [...current, { id, ...form, amount }]);
    setForm({ name: '', category: 'Flights', amount: '' });
  };

  return (
    <PageTransition>
      <section className="min-h-screen bg-dark px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1420px]">
          <div className="mb-10 text-center">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-primary">Budget</p>
            <h1 className="mt-3 font-serif text-5xl font-black leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
              Budget <span className="text-accent">planner</span>
            </h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="space-y-8">
              <div className="rounded-[28px] bg-gradient-to-br from-primary via-sky-500 to-accent p-8 shadow-2xl shadow-sky-950/30">
                <p className="text-sm font-black uppercase tracking-[0.34em] text-white/85">
                  Total for {travelerCount} {travelerCount === 1 ? 'traveler' : 'travelers'}
                </p>
                <p className="mt-4 font-serif text-6xl font-black leading-none text-white sm:text-7xl lg:text-8xl">
                  {formatRupees(total)}
                </p>
                <p className="mt-5 text-lg font-bold text-white/90">
                  {expenses.length} {expenses.length === 1 ? 'entry' : 'entries'} - per-person amounts
                </p>

                <div className="my-8 h-px bg-white/25" />

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.3em] text-white">Travelers</p>
                    <p className="mt-8 text-lg font-black text-white">{formatRupees(perPersonTotal)} / person</p>
                  </div>

                  <div className="flex items-center gap-6 rounded-full bg-dark/25 px-5 py-3 text-2xl font-black text-white shadow-inner">
                    <button
                      type="button"
                      onClick={() => setTravelerCount((count) => Math.max(1, count - 1))}
                      className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-white/15"
                      aria-label="Decrease travelers"
                    >
                      -
                    </button>
                    <span className="min-w-6 text-center">{travelerCount}</span>
                    <button
                      type="button"
                      onClick={() => setTravelerCount((count) => count + 1)}
                      className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-white/15"
                      aria-label="Increase travelers"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <form
                onSubmit={addExpense}
                className="rounded-[28px] border border-white/10 bg-slate-900 p-8 shadow-2xl shadow-black/20"
              >
                <h2 className="font-serif text-3xl font-black text-white">Add expense</h2>
                <div className="mt-8 space-y-6">
                  <label className="block">
                    <span className="mb-2 block text-sm font-black uppercase tracking-wider text-slate-300">
                      Description
                    </span>
                    <input
                      value={form.name}
                      onChange={(event) => setForm({ ...form, name: event.target.value })}
                      placeholder="Flight to Lisbon"
                      className="w-full rounded-2xl border border-white/10 bg-dark px-5 py-4 text-xl text-sky-100 outline-none transition placeholder:text-slate-500 focus:border-primary"
                    />
                  </label>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-black uppercase tracking-wider text-slate-300">
                        Amount (INR)
                      </span>
                      <input
                        value={form.amount}
                        onChange={(event) => setForm({ ...form, amount: event.target.value })}
                        type="number"
                        min="0"
                        placeholder="0.00"
                        className="w-full rounded-2xl border border-white/10 bg-dark px-5 py-4 text-xl text-sky-100 outline-none transition placeholder:text-slate-500 focus:border-primary"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-black uppercase tracking-wider text-slate-300">
                        Category
                      </span>
                      <select
                        value={form.category}
                        onChange={(event) => setForm({ ...form, category: event.target.value })}
                        className="w-full rounded-2xl border border-white/10 bg-dark px-5 py-4 text-xl font-semibold text-white outline-none transition focus:border-primary"
                      >
                        {categories.map((category) => (
                          <option key={category}>{category}</option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <button className="w-full rounded-2xl bg-accent px-5 py-4 text-xl font-black text-white shadow-lg shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-500">
                    + Add expense
                  </button>
                </div>
              </form>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-900 p-8 shadow-2xl shadow-black/20">
              <h2 className="font-serif text-3xl font-black text-white">Expenses</h2>

              {expenses.length === 0 ? (
                <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                  <div className="mb-9 h-28 w-28 rounded-full bg-gradient-to-br from-primary to-accent" />
                  <h3 className="font-serif text-3xl font-black text-white">No expenses yet</h3>
                  <p className="mt-4 text-xl font-semibold text-slate-300">
                    Start by adding your first expense on the left.
                  </p>
                </div>
              ) : (
                <div className="mt-8 space-y-4">
                  {expenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-dark p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="text-xl font-black text-white">{expense.name}</p>
                        <p className="mt-1 text-sm font-bold uppercase tracking-wider text-slate-400">
                          {expense.category} - {formatRupees(expense.amount)} per person
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-2xl font-black text-accent">
                          {formatRupees(expense.amount * travelerCount)}
                        </p>
                        <p className="text-sm font-semibold text-slate-400">for {travelerCount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {breakdown.map((item) => (
                  <div key={item.category} className="rounded-2xl border border-white/10 bg-dark p-4">
                    <p className="text-sm font-black uppercase tracking-wider text-slate-400">{item.category}</p>
                    <p className="mt-2 text-xl font-black text-primary">{formatRupees(item.total)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
