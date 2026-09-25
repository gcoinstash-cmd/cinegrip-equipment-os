import React, { useState } from 'react';
import { 
  Camera, Shield, Award, Calendar, DollarSign, Lock, ArrowRight, Check, 
  Layers, FileText, CheckCircle2, Film, Video, Upload, Trash2, Box, Eye
} from 'lucide-react';
import { AdminPortalModal } from './AdminPortalModal.tsx';

interface GearItem {
  id: string;
  name: string;
  category: 'camera' | 'lenses' | 'grip' | 'monitoring';
  dayRate: number;
  replacementValue: number;
  status: 'IN_LOCKER' | 'ON_PRODUCTION' | 'PREP_BAY';
  specs: string[];
  img: string;
}

const GEAR: GearItem[] = [
  {
    id: 'CAM-ALEXA35',
    name: 'ARRI Alexa 35 4.6K Super 35 Production Kit',
    category: 'camera',
    dayRate: 1450,
    replacementValue: 85000,
    status: 'IN_LOCKER',
    specs: ['17 Stops Dynamic Range', '3x 2TB Codex Compact Drives', 'LPL Mount + PL Adapter', 'SmallHD Cine 7 Monitor'],
    img: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39'
  },
  {
    id: 'CAM-RED-V',
    name: 'RED V-Raptor XL 8K VV Cinema Package',
    category: 'camera',
    dayRate: 1250,
    replacementValue: 55000,
    status: 'PREP_BAY',
    specs: ['8K Large Format Sensor', 'Integrated Electronic ND (2-7 Stops)', '120fps @ 8K 17:9', '4x 2TB RED PRO CFexpress'],
    img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d'
  },
  {
    id: 'LENS-COOKE-FF',
    name: 'Cooke Anamorphic/i Full Frame Plus 4-Lens Set',
    category: 'lenses',
    dayRate: 1800,
    replacementValue: 140000,
    status: 'IN_LOCKER',
    specs: ['32mm, 40mm, 75mm, 100mm T2.3', '1.8x Anamorphic Squeeze', '/i Technology Lens Metadata', 'Classic Cooke Organic Flare'],
    img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728'
  },
  {
    id: 'LENS-ARRI-SIGNATURE',
    name: 'ARRI Signature Prime 3-Lens Trio (24, 47, 75mm)',
    category: 'lenses',
    dayRate: 1350,
    replacementValue: 95000,
    status: 'IN_LOCKER',
    specs: ['LPL Native Mount // T1.8', 'Magnesium Lightweight Barrel', 'Soft Creamy Bokeh Falloff', 'Magnetic Rear Filter Holder'],
    img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077'
  },
  {
    id: 'GRIP-5TON-PKG',
    name: '5-Ton Grip & Electric Rolling Package',
    category: 'grip',
    dayRate: 2100,
    replacementValue: 120000,
    status: 'IN_LOCKER',
    specs: ['Aputure 1200d & Nova P600c LED', '12x12 & 20x20 Overhead Frame Rags', 'Dana Dolly Portable Track System', 'Speed Rail & Rigging Hardware'],
    img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d'
  },
  {
    id: 'MON-TERADEK-BOLT',
    name: 'Teradek Bolt 4K MAX 750 Transmitter & 2x RX',
    category: 'monitoring',
    dayRate: 550,
    replacementValue: 18500,
    status: 'IN_LOCKER',
    specs: ['Zero-Delay 4K HDR Wireless Video', '750ft Line of Sight Range', 'Director Handheld Monitor Rig', 'Gold-Mount Battery Plates'],
    img: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39'
  }
];

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(
    typeof window !== 'undefined' && (
      window.location.search.includes('admin') || 
      window.location.pathname.endsWith('/admin') ||
      window.location.hash === '#admin'
    )
  );

  const [activeCategory, setActiveCategory] = useState<'all' | 'camera' | 'lenses' | 'grip' | 'monitoring'>('all');
  const [cart, setCart] = useState<string[]>(['CAM-ALEXA35', 'LENS-COOKE-FF']);
  const [rentalDuration, setRentalDuration] = useState<'1day' | '3day-week' | 'feature-month'>('3day-week');
  const [coiUploaded, setCoiUploaded] = useState(true);
  const [prodCompany, setProdCompany] = useState('');
  const [producerPhone, setProducerPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Cart operations
  const toggleCart = (id: string) => {
    if (cart.includes(id)) {
      setCart(cart.filter(item => item !== id));
    } else {
      setCart([...cart, id]);
    }
  };

  const filteredGear = activeCategory === 'all' 
    ? GEAR 
    : GEAR.filter(g => g.category === activeCategory);

  // Multiplier: industry standard 3-day week gives 7 calendar days!
  const multiplier = rentalDuration === '1day' ? 1 : rentalDuration === '3day-week' ? 3 : 9;

  const totalDayRate = cart.reduce((sum, id) => {
    const item = GEAR.find(g => g.id === id);
    return sum + (item ? item.dayRate : 0);
  }, 0);

  const totalRentalCost = totalDayRate * multiplier;
  const totalReplacementLiability = cart.reduce((sum, id) => {
    const item = GEAR.find(g => g.id === id);
    return sum + (item ? item.replacementValue : 0);
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodCompany || !producerPhone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setProdCompany('');
      setProducerPhone('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-100 font-sans flex flex-col md:flex-row selection:bg-amber-500/20 selection:text-amber-400">
      {/* Persistent Left Industrial Side-Rail */}
      <aside className="w-full md:w-64 bg-[#121214] border-r border-zinc-800 p-6 flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Logo / Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-zinc-950 font-black shadow-lg shadow-amber-500/20">
              <Camera className="w-5 h-5 text-zinc-950" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block font-bold">STAGE EQUIPMENT VAULT</span>
              <h1 className="text-sm font-extrabold text-white leading-none">CINEGRIP OS</h1>
            </div>
          </div>

          {/* Side-Rail Categories */}
          <nav className="space-y-1.5 text-xs font-mono">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-2 px-2">GEAR LOCKERS</span>
            {[
              { id: 'all', label: 'All Equipment' },
              { id: 'camera', label: 'Cinema Cameras' },
              { id: 'lenses', label: 'Anamorphic Glass' },
              { id: 'grip', label: 'Grip & Electric' },
              { id: 'monitoring', label: 'Wireless & Video' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition flex items-center justify-between ${
                  activeCategory === cat.id 
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <span>{cat.label}</span>
                {activeCategory === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Locker Stats & Admin Door */}
        <div className="pt-6 border-t border-zinc-800/80 space-y-4 text-xs font-mono">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase block">GEAR READINESS</span>
            <span className="text-sm font-bold text-amber-400 font-mono">99.8% QC CHECKED</span>
          </div>

          <button
            onClick={() => setIsAdminOpen(true)}
            className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 font-bold transition flex items-center justify-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>[ CINEGRIP PASS ]</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-5xl">
        {/* Top Operational Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-1">
              <Film className="w-3 h-3" />
              <span>HOLLYWOOD & INDIE PRODUCTION READY // 3-DAY WEEK RATES</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Cinema Rental Manifest & Sub-Rentals</h2>
          </div>

          {/* Shoot Duration Selector */}
          <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs font-mono">
            {[
              { id: '1day', label: '1 Day Shoot (1x)' },
              { id: '3day-week', label: '3-Day Week (7 Days!)' },
              { id: 'feature-month', label: 'Feature Run (30 Days)' }
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setRentalDuration(d.id as any)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  rentalDuration === d.id ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Master Gear Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredGear.map((item) => {
            const inCart = cart.includes(item.id);
            return (
              <div 
                key={item.id}
                className={`p-5 rounded-2xl border transition flex flex-col justify-between ${
                  inCart 
                    ? 'bg-amber-950/15 border-amber-500/50 shadow-xl' 
                    : 'bg-[#121214] border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-zinc-950">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-amber-400 border border-zinc-700">
                      {item.status}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{item.id}</span>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">{item.name}</h3>

                  <div className="space-y-1 mb-4">
                    {item.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                        <Check className="w-3 h-3 text-amber-400 flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-extrabold font-mono text-amber-400">${item.dayRate} / Day</span>
                    <span className="text-[10px] font-mono text-zinc-500 block">Repl Value: ${item.replacementValue.toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => toggleCart(item.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 ${
                      inCart 
                        ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' 
                        : 'bg-amber-500 text-zinc-950 hover:bg-amber-400 shadow-md shadow-amber-500/20'
                    }`}
                  >
                    {inCart ? 'Remove from Package' : '+ Add to Rental'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sub-Rental Cart & COI Verification Manifest */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#121214] border border-amber-500/30 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4 mb-6">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">PRODUCTION GEAR MANIFEST</span>
              <h3 className="text-xl font-bold text-white">Active Rental Package ({cart.length} Items)</h3>
            </div>

            {/* COI Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-mono">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>COI INSURANCE: <strong>{coiUploaded ? 'CERTIFICATE ON FILE' : 'PENDING UPLOAD'}</strong></span>
            </div>
          </div>

          {/* Cart Item Row Summary */}
          <div className="space-y-2 mb-6">
            {cart.map((cId) => {
              const item = GEAR.find(g => g.id === cId);
              if (!item) return null;
              return (
                <div key={cId} className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-amber-400" />
                    <span className="text-white font-bold">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-400">${item.dayRate} / day × {multiplier} = <strong className="text-amber-400">${item.dayRate * multiplier}</strong></span>
                    <button onClick={() => toggleCart(cId)} className="text-zinc-500 hover:text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Financial Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 mb-6 text-xs font-mono">
            <div>
              <span className="text-zinc-500 block mb-1">TOTAL EQUIPMENT REPLACEMENT LIABILITY:</span>
              <span className="text-base font-bold text-rose-400">${totalReplacementLiability.toLocaleString()} USD</span>
              <span className="text-[10px] text-zinc-500 block">Requires $1M Inland Marine Floater naming CineGrip as Loss Payee</span>
            </div>
            <div className="text-right">
              <span className="text-zinc-500 block mb-1">TOTAL ESTIMATED RENTAL INVOICE:</span>
              <span className="text-2xl font-extrabold text-amber-400">${totalRentalCost.toLocaleString()} USD</span>
              <span className="text-[10px] text-zinc-500 block">{rentalDuration.toUpperCase()} Rate Multiplier Applied</span>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              required
              value={prodCompany}
              onChange={(e) => setProdCompany(e.target.value)}
              placeholder="Production Company / LLC"
              className="px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <input
              type="tel"
              required
              value={producerPhone}
              onChange={(e) => setProducerPhone(e.target.value)}
              placeholder="Producer Line (Call Sheet)"
              className="px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider transition shadow-lg shadow-amber-500/25"
            >
              {submitted ? '✓ RENTAL PACK RESERVED' : 'SUBMIT PRODUCTION ORDER'}
            </button>
          </form>
        </section>
      </main>

      {/* Admin Modal */}
      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
