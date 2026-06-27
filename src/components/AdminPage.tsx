import { useEffect, useState } from 'react';
import { supabase, type Reservation } from '../lib/supabase';
import { LogOut, Lock, RefreshCw, Calendar, Home, User, Phone, Mail, Download } from 'lucide-react';

const ADMIN_PASSWORD = 'cawd11';

const unitLabels: Record<string, string> = {
  '250': 'Tipe 250 (4+1 KT)',
  '350': 'Tipe 350 (5+1 KT)',
  '500': 'Signature 500 (6+2 KT)',
};

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authenticated', 'true');
      onLogin();
    } else {
      setError('Password salah. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-6">
      <div className="bg-white p-8 md:p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-4">
            <Lock className="w-7 h-7 text-gold" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal mb-2">
            Admin Panel
          </h1>
          <p className="text-gray-500 text-sm font-light">
            Masukkan password untuk mengakses data reservasi.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full bg-gray-50 border border-gray-200 text-charcoal px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
              placeholder="Masukkan password"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-gold text-white uppercase tracking-widest text-sm font-bold hover:bg-gold-hover transition-colors"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReservations = async () => {
    setLoading(true);
    setError('');

    const { data, error: fetchError } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError('Gagal memuat data. Pastikan policy SELECT sudah ditambahkan di Supabase.');
    } else {
      setReservations(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    onLogout();
  };

  const exportCSV = () => {
    const headers = ['Nama', 'WhatsApp', 'Email', 'Tipe Unit', 'Tanggal'];
    const rows = reservations.map((r) => [
      r.name,
      r.phone,
      r.email || '',
      unitLabels[r.unit_type] ?? `Tipe ${r.unit_type}`,
      r.created_at ? new Date(r.created_at).toLocaleString('id-ID') : '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reservasi_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const total = reservations.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-charcoal text-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl font-bold">Admin Panel</h1>
            <p className="text-white/60 text-xs font-light">
              Data Reservasi {total > 0 && `— ${total} total`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              disabled={reservations.length === 0}
              className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-colors disabled:opacity-30"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={fetchReservations}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 mb-6 text-sm">
            {error}
            <p className="mt-2 text-xs text-red-500">
              Jalankan SQL berikut di Supabase Dashboard → SQL Editor:
            </p>
            <pre className="mt-2 bg-red-100 p-3 text-xs overflow-x-auto">
              CREATE POLICY "anon_can_select_reservations" ON reservations FOR SELECT TO anon USING (true);
            </pre>
          </div>
        )}

        {loading ? (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-light">Memuat data...</p>
          </div>
        ) : reservations.length === 0 ? (
          <div className="text-center py-24">
            <Home className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 font-light text-lg">Belum ada data reservasi.</p>
          </div>
        ) : (
          <div className="bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-charcoal text-white text-xs uppercase tracking-wider">
                    <th className="px-5 py-4 font-semibold">No</th>
                    <th className="px-5 py-4 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" /> Nama
                      </span>
                    </th>
                    <th className="px-5 py-4 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" /> WhatsApp
                      </span>
                    </th>
                    <th className="px-5 py-4 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> Email
                      </span>
                    </th>
                    <th className="px-5 py-4 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Home className="w-3.5 h-3.5" /> Tipe Unit
                      </span>
                    </th>
                    <th className="px-5 py-4 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> Tanggal
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {reservations.map((r, i) => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 text-gray-400 text-sm font-mono">{i + 1}</td>
                      <td className="px-5 py-4 font-medium text-charcoal">{r.name}</td>
                      <td className="px-5 py-4">
                        <a
                          href={`https://wa.me/${r.phone.replace(/^0/, '62')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold hover:text-gold-hover transition-colors text-sm"
                        >
                          {r.phone}
                        </a>
                      </td>
                      <td className="px-5 py-4 text-gray-600 text-sm">
                        {r.email || <span className="text-gray-300 italic">—</span>}
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-block bg-gold/10 text-gold text-xs font-semibold px-3 py-1">
                          {unitLabels[r.unit_type] ?? `Tipe ${r.unit_type}`}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-sm whitespace-nowrap">
                        {r.created_at ? formatDate(r.created_at) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(
    sessionStorage.getItem('admin_authenticated') === 'true'
  );

  if (!authenticated) {
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;
  }

  return <Dashboard onLogout={() => setAuthenticated(false)} />;
}
