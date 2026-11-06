import React, { useState } from 'react';
import { 
  X, Check, Copy, Settings, Users, Volume2, Mic, MicOff, 
  Headphones, RefreshCw, Sliders, Shield, LogOut, Sparkles
} from 'lucide-react';
import { RoomSettings, Player } from '../types/game';
import { useAuth } from '../context/AuthContext';
import { soundEffects } from '../utils/soundEffects';
import { Language, translations } from '../i18n/translations';

// 1. مودال الانضمام لاستوديو بكود
interface JoinRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (code: string) => void;
  lang: Language;
}

export const JoinRoomModal: React.FC<JoinRoomModalProps> = ({ isOpen, onClose, onJoin, lang }) => {
  const [code, setCode] = useState('');
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    soundEffects.playVoteClick();
    onJoin(code.trim().toUpperCase());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-right space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800/60"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 mx-auto flex items-center justify-center text-2xl shadow">
            🔑
          </div>
          <h3 className="text-lg font-black text-white">الانضمام لاستوديو الأصدقاء</h3>
          <p className="text-xs text-slate-400">
            أدخل كود الغرفة المكون من 4 إلى 8 حروف (مثل LATE-99)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            autoFocus
            maxLength={10}
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="مثال: LATE-99"
            className="w-full bg-slate-950 border-2 border-slate-700 text-white font-mono text-center text-lg tracking-widest py-3 rounded-2xl focus:outline-none focus:border-red-500 uppercase"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow transition active:scale-95 cursor-pointer"
          >
            دخول الاستوديو 🎬
          </button>
        </form>
      </div>
    </div>
  );
};

// 2. مودال إعدادات الاستوديو (للمشرف Host)
interface RoomSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: RoomSettings;
  onSave: (newSettings: RoomSettings) => void;
  lang: Language;
}

export const RoomSettingsModal: React.FC<RoomSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
  lang
}) => {
  const [localSettings, setLocalSettings] = useState<RoomSettings>(settings);
  if (!isOpen) return null;

  const handleSave = () => {
    soundEffects.playVoteClick();
    onSave(localSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-right space-y-5 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800/60"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-white">إعدادات الاستوديو والجولة</h3>
            <p className="text-xs text-slate-400">تحكم بقوانين اللعبة وحساس الضحك</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          {/* عدد الجولات */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">عدد جولات اللعب:</label>
            <div className="grid grid-cols-3 gap-2">
              {[3, 5, 7].map((rounds) => (
                <button
                  key={rounds}
                  type="button"
                  onClick={() => setLocalSettings({ ...localSettings, totalRounds: rounds })}
                  className={`py-2 rounded-xl font-bold border transition ${
                    localSettings.totalRounds === rounds
                      ? 'bg-red-600 border-red-400 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  {rounds} جولات
                </button>
              ))}
            </div>
          </div>

          {/* سرعة التيليبرومبتر */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">سرعة نص التيليبرومبتر:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'slow', label: 'هادي 🐢' },
                { id: 'normal', label: 'عادي ⚡' },
                { id: 'fast', label: 'صاروخ 🚀' }
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setLocalSettings({ ...localSettings, teleprompterSpeed: s.id as any })}
                  className={`py-2 rounded-xl font-bold border transition ${
                    localSettings.teleprompterSpeed === s.id
                      ? 'bg-amber-600 border-amber-400 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* حساسية كاشف الضحك */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">حساسية لاقط الضحك (Laugh Sensor):</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'low', label: 'منخفضة (ضحك عالي)' },
                { id: 'medium', label: 'متوسطة (طبيعي)' },
                { id: 'high', label: 'عالية (أي ابتسامة)' }
              ].map((sens) => (
                <button
                  key={sens.id}
                  type="button"
                  onClick={() => setLocalSettings({ ...localSettings, laughDetectorSensitivity: sens.id as any })}
                  className={`py-2 rounded-xl font-bold border transition text-[11px] ${
                    localSettings.laughDetectorSensitivity === sens.id
                      ? 'bg-cyan-600 border-cyan-400 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  {sens.label}
                </button>
              ))}
            </div>
          </div>

          {/* السماح بكلمات توريط مخصصة */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <p className="font-bold text-slate-200">السماح بكتابة كلمات توريط خاصة</p>
              <p className="text-[10px] text-slate-400">إتاحة خانة كتابة حرة للجمهور</p>
            </div>
            <input
              type="checkbox"
              checked={localSettings.allowCustomSabotages}
              onChange={(e) => setLocalSettings({ ...localSettings, allowCustomSabotages: e.target.checked })}
              className="w-4 h-4 accent-red-600 rounded cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow transition"
        >
          حفظ وتطبيق الإعدادات ✓
        </button>
      </div>
    </div>
  );
};

// 3. مودال إعدادات اللاعب الشخصية والصوتية
interface PlayerSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const PlayerSettingsModal: React.FC<PlayerSettingsModalProps> = ({ isOpen, onClose, lang }) => {
  const { user, updateProfile, logout } = useAuth();
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [micActive, setMicActive] = useState(true);
  const [speakerActive, setSpeakerActive] = useState(!soundEffects.isMuted);

  if (!isOpen) return null;

  const handleSave = () => {
    soundEffects.playVoteClick();
    updateProfile(name, avatar);
    soundEffects.isMuted = !speakerActive;
    onClose();
  };

  const handleLogout = () => {
    soundEffects.playVoteClick();
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-right space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800/60"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 rounded-2xl bg-slate-950 border border-slate-800">
            {avatar}
          </span>
          <div>
            <h3 className="text-base font-black text-white">إعداداتك الشخصية</h3>
            <p className="text-xs text-slate-400">{user.email || 'حساب زائر في الاستوديو'}</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          {/* تعديل الاسم */}
          <div className="space-y-1">
            <label className="font-bold text-slate-300">اسم الظهور:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white px-3 py-2 rounded-xl focus:outline-none focus:border-red-500 text-xs"
            />
          </div>

          {/* إعدادات الصوت والمايكروفون */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="font-bold text-slate-300">أجهزة الصوت والمايك:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMicActive(!micActive)}
                className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 font-bold transition ${
                  micActive
                    ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4 text-rose-400" />}
                <span>{micActive ? 'المايك شغال' : 'المايك مكتوم'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSpeakerActive(!speakerActive)}
                className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 font-bold transition ${
                  speakerActive
                    ? 'bg-cyan-950/60 border-cyan-800 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Headphones className="w-4 h-4" />
                <span>{speakerActive ? 'السماعة شغالة' : 'السماعة مكتومة'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={handleSave}
            className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition"
          >
            حفظ التعديلات ✓
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2 rounded-xl bg-slate-950 hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 border border-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل الخروج والعودة للشاشة الأولى</span>
          </button>
        </div>
      </div>
    </div>
  );
};
