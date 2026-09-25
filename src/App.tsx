import React, { useState } from 'react';
import { 
  Film, Shield, Award, ArrowRight, Calendar, DollarSign, Lock, 
  ChevronRight, CheckCircle2, Sparkles, Layers, Terminal, Server,
  AlertCircle, Check, Phone, Plane, Thermometer, Compass, Fuel, Gauge,
  Clock, Camera, CheckSquare, FileText, UploadCloud, Eye
} from 'lucide-react';
import { AdminPortalModal } from './AdminPortalModal.tsx';

interface CineLensSet {
  id: string;
  name: string;
  type: string;
  focalLengths: string[];
  maxAperture: string;
  frontDiameter: string;
  mount: string;
  coverage: string;
  replacementValue: number;
  dayRate: number;
  weekRate: number;
  opticalCharacteristics: string;
  img: string;
}

const LENS_VAULT: CineLensSet[] = [
  {
    id: "COOKE-FF-PLUS",
    name: "Cooke Anamorphic/i Full Frame Plus (5-Lens Set)",
    type: "2x Anamorphic Prime Set",
    focalLengths: ["32mm", "40mm", "50mm", "75mm", "100mm"],
    maxAperture: "T2.3 across all focal lengths",
    frontDiameter: "110mm Unified Fronts",
    mount: "PL Mount (with /i Technology)",
    coverage: "Full Frame 24x36 Sensor Coverage",
    replacementValue: 185000,
    dayRate: 2400,
    weekRate: 7200,
    opticalCharacteristics: "Legendary 'Cooke Look' oval bokeh, warm cinematic skin rendering, and controlled streak flaring without harsh chromatic artifacts.",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
  },
  {
    id: "ARRI-ALEXA-35",
    name: "ARRI ALEXA 35 Production Cinema Camera Package",
    type: "Super 35 Digital Cinema Camera",
    focalLengths: ["4.6K Sensor", "17 Stops Dynamic Range", "REVEAL Color Science"],
    maxAperture: "Native EI 800 - EI 6400",
    frontDiameter: "LPL / PL Mount with LDS-2",
    mount: "ARRI LPL & PL Adapters",
    coverage: "Native 4K ProRes & ARRIRAW",
    replacementValue: 98000,
    dayRate: 1800,
    weekRate: 5400,
    opticalCharacteristics: "Unrivaled dynamic range, organic highlight roll-off, and low-light fidelity trusted on Academy Award-winning feature productions.",
    img: "https://images.unsplash.com/photo-1485846234645-a62644f84728"
  },
  {
    id: "ATLAS-ORION-SET",
    name: "Atlas Orion 2x Anamorphic Series A (3-Lens Core Set)",
    type: "2x Front Anamorphic Cinema Primes",
    focalLengths: ["40mm", "65mm", "100mm"],
    maxAperture: "T2.0 Fast Aperture",
    frontDiameter: "114mm Unified Front",
    mount: "Interchangeable PL / EF Mount",
    coverage: "Super 35 / Full Frame w/ 1.6x Expander",
    replacementValue: 32000,
    dayRate: 950,
    weekRate: 2850,
    opticalCharacteristics: "Iconic blue streak horizontal flares, creamy painterly falloff, and modern mechanical precision built for indie and commercial DP rigs.",
    img: "https://images.unsplash.com/photo-1502982720700-bfff97f2da8d"
  }
];

export default function App() {
  const [selectedPkg, setSelectedPkg] = useState<CineLensSet>(LENS_VAULT[0]);
  const [productionName, setProductionName] = useState('Paramount / Horizon Feature');
  const [coiPolicyNumber, setCoiPolicyNumber] = useState('HISCOX-ENT-90214-COI');
  const [coiAmount, setCoiAmount] = useState(1000000); // $1M standard floater
  const [shootDates, setShootDates] = useState('2026-11-04 to 2026-11-08 (4 Shoot Days)');
  const [coiVerified, setCoiVerified] = useState(true);
  const [subRentalSuccess, setSubRentalSuccess] = useState(false);

  const [isAdminOpen, setIsAdminOpen] = useState(
    typeof window !== 'undefined' && (
      window.location.search.includes('admin') || 
      window.location.pathname.endsWith('/admin') ||
      window.location.hash === '#admin'
    )
  );

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-zinc-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Telemetry Header */}
      <header className="border-b border-zinc-800 bg-[#0E0F14] px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 font-mono text-sm">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
          <span className="font-bold tracking-wider text-rose-400 flex items-center gap-2 text-base">
            <Camera size={18} /> CINEGRIP // ANAMORPHIC LENS VAULT & INSURANCE SPEC PANEL
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400 uppercase text-xs">ARCHETYPE E: SPLIT-SCREEN SPEC & PROOF PANEL</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Shield size={14} />
            <span>IATSE LOCAL 600 / ASC RENTAL HOUSE CERTIFIED</span>
          </div>
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-lg text-xs font-mono font-bold transition-all"
          >
            [ VAULT MASTER PASS ]
          </button>
        </div>
      </header>

      {/* Split-Screen Container */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Fixed Panel: Lens Visual Inspection & Optical Specs */}
        <section className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-zinc-800 p-6 sm:p-8 bg-[#0D0E13] overflow-y-auto space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {LENS_VAULT.map(l => (
                <button
                  key={l.id}
                  onClick={() => setSelectedPkg(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
                    selectedPkg.id === l.id 
                      ? 'bg-rose-500 text-white border-rose-500' 
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {l.id}
                </button>
              ))}
            </div>
            <span className="text-xs font-mono text-zinc-400">REPLACEMENT: ${selectedPkg.replacementValue.toLocaleString()}</span>
          </div>

          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-800">
            <img 
              src={selectedPkg.img} 
              alt={selectedPkg.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 font-mono text-xs">
              <span className="text-zinc-400 block text-[10px]">DAILY SUB-RENTAL RATE</span>
              <span className="text-2xl font-black text-rose-400">${selectedPkg.dayRate.toLocaleString()} / Day</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-mono text-rose-400 uppercase font-bold tracking-wider">{selectedPkg.type}</span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">{selectedPkg.name}</h1>
            <p className="text-sm text-zinc-300 mt-2 font-sans leading-relaxed">
              {selectedPkg.opticalCharacteristics}
            </p>
          </div>

          {/* Focal Lengths Pill Matrix */}
          <div className="space-y-2 font-mono text-xs">
            <span className="text-zinc-400 uppercase tracking-wider font-bold">Package Prime Focal Array</span>
            <div className="flex flex-wrap gap-2">
              {selectedPkg.focalLengths.map(f => (
                <span key={f} className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-bold">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Right Scrollable Panel: Technical Caliber Breakdown & COI Insurance Gate */}
        <section className="w-full lg:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-6 bg-[#0A0A0C]">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="text-rose-400" /> Optical Caliber & Mechanical Parameters
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Certified optical bench collimation, sensor illumination circle, and gearing specs.
            </p>
          </div>

          {/* Specifications Table */}
          <div className="bg-[#12141C] border border-zinc-800 rounded-xl overflow-hidden font-mono text-xs">
            <div className="divide-y divide-zinc-800">
              <div className="flex justify-between p-3.5"><span className="text-zinc-400">Maximum Photometric T-Stop</span><span className="text-white font-bold">{selectedPkg.maxAperture}</span></div>
              <div className="flex justify-between p-3.5"><span className="text-zinc-400">Front Outer Diameter</span><span className="text-white font-bold">{selectedPkg.frontDiameter}</span></div>
              <div className="flex justify-between p-3.5"><span className="text-zinc-400">Lens Mount Interface</span><span className="text-white font-bold">{selectedPkg.mount}</span></div>
              <div className="flex justify-between p-3.5"><span className="text-zinc-400">Sensor Image Circle</span><span className="text-white font-bold">{selectedPkg.coverage}</span></div>
              <div className="flex justify-between p-3.5"><span className="text-zinc-400">3-Day Week Rate (Discounted)</span><span className="text-emerald-400 font-bold">${selectedPkg.weekRate.toLocaleString()} / Wk</span></div>
            </div>
          </div>

          {/* Certificate of Insurance (COI) Verification Gate */}
          <div className="bg-[#12141C] border border-rose-500/40 p-5 rounded-2xl space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Shield size={16} className="text-rose-400" /> Certificate of Insurance (COI) Gate
              </span>
              <span className="text-emerald-400 font-bold">✓ POLICY VERIFIED</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-zinc-400">Production / LLC Name</label>
                <input 
                  type="text"
                  value={productionName}
                  onChange={e => setProductionName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-white" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-zinc-400">Insurance Carrier & Policy #</label>
                <input 
                  type="text"
                  value={coiPolicyNumber}
                  onChange={e => setCoiPolicyNumber(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-white" 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-zinc-400">Shoot Dates / Production Schedule</label>
              <input 
                type="text"
                value={shootDates}
                onChange={e => setShootDates(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-white" 
              />
            </div>

            <div className="p-3 bg-black border border-zinc-800 rounded-lg text-zinc-300 text-[11px] leading-relaxed">
              Certificate must name <strong>CineGrip Vault LLC</strong> as Certificate Holder and Loss Payee with minimum $1,000,000 miscellaneous rented equipment coverage.
            </div>
          </div>

          {/* Sub-Rental Checkout Action */}
          <div className="pt-4 border-t border-zinc-800 space-y-2 font-mono">
            {subRentalSuccess ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-xl text-center text-xs font-bold space-y-1">
                <div>✓ OPTICAL PACKAGE ALLOCATED & DISPATCHED TO STAGING</div>
                <div className="text-[11px] text-zinc-300">Prep bay reserved for 1st AC bench inspection tomorrow at 09:00 AM.</div>
              </div>
            ) : (
              <button
                onClick={() => setSubRentalSuccess(true)}
                className="w-full py-4 bg-rose-500 hover:bg-rose-400 text-white font-black text-sm rounded-xl transition-all shadow-xl shadow-rose-500/20 cursor-pointer min-h-[44px]"
              >
                SUBMIT COI & RESERVE OPTICAL PACKAGE
              </button>
            )}
          </div>
        </section>
      </div>

      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
