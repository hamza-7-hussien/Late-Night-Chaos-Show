export type Language = 'ar' | 'en';

export interface Translations {
  appName: string;
  appTagline: string;
  liveBadge: string;
  roomCode: string;
  copyLink: string;
  copied: string;
  shareWithFriends: string;
  
  // Auth & Onboarding
  authTitle: string;
  signIn: string;
  signOut: string;
  playAsGuest: string;
  googleSignIn: string;
  guestNamePlaceholder: string;
  selectAvatar: string;
  continueBtn: string;
  welcomePlayer: string;
  guestBadge: string;
  customProfile: string;

  // Lobby UI
  startBroadcastBtn: string;
  createRoomBtn: string;
  joinRoomBtn: string;
  selectGameMode: string;
  playersConnected: string;
  allReady: string;
  changeMode: string;
  hostBadge: string;
  youBadge: string;
  anchorBadge: string;
  spectatorBadge: string;

  // Modes
  anchorModeTitle: string;
  anchorModeDesc: string;
  anchorModeHighlight: string;
  
  secretModeTitle: string;
  secretModeDesc: string;
  secretModeHighlight: string;

  // Game Play
  liveOnAir: string;
  readingNow: string;
  timeLeft: string;
  laughCounter: string;
  sabotageBoxTitle: string;
  sabotagePlaceholder: string;
  dropWordBtn: string;
  quickSuggestions: string;
  caughtLaughingBtn: string;
  directorInstruction: string;
  finishRoundVote: string;

  // Secret Mode
  secretPromptTitle: string;
  secretAnswerPlaceholder: string;
  submitSecretAnswer: string;
  blindVotingTitle: string;
  blindVotingSubtitle: string;
  voteThisAnswer: string;
  votedSuccessfully: string;
  secretAuthorRevealed: string;

  // Results
  podiumTitle: string;
  winnerDeclared: string;
  backToLobby: string;
  points: string;

  // PWA
  installAppBtn: string;
  installAppTitle: string;
  installAppDesc: string;
  iosInstallGuideTitle: string;
  iosStep1: string;
  iosStep2: string;
  closeBtn: string;
  offlineBanner: string;
}

export const translations: Record<Language, Translations> = {
  ar: {
    appName: 'Late Show',
    appTagline: 'استوديو النشرة الكوميدية • لعبة الحفلات الجماعية مع الأصدقاء',
    liveBadge: 'مباشر • LIVE',
    roomCode: 'كود الاستوديو',
    copyLink: 'نسخ الكود',
    copied: 'تم النسخ!',
    shareWithFriends: 'شارك الكود مع أصحابك للدخول',

    authTitle: 'الدخول إلى Late Show',
    signIn: 'تسجيل الدخول',
    signOut: 'تسجيل الخروج',
    playAsGuest: 'دخول سريع كـ زائر',
    googleSignIn: 'المتابعة بحساب Google',
    guestNamePlaceholder: 'اكتب اسمك أو لقبك هنا...',
    selectAvatar: 'اختر شخصيتك وأفاتارك:',
    continueBtn: 'دخول الاستوديو 🎬',
    welcomePlayer: 'أهلاً بك يا نجم',
    guestBadge: 'زائر',
    customProfile: 'تعديل البروفايل',

    startBroadcastBtn: 'بدء البث المباشر الآن! 🎬',
    createRoomBtn: 'إنشاء استوديو جديد',
    joinRoomBtn: 'دخول بكود',
    selectGameMode: 'طور اللعبة المختار',
    playersConnected: 'طاقم الأصدقاء المتواجد',
    allReady: 'الجميع جاهز للبث!',
    changeMode: 'تبديل الطور',
    hostBadge: '👑 المشرف',
    youBadge: 'أنت',
    anchorBadge: '🎙️ المذيع',
    spectatorBadge: 'مشاهد',

    anchorModeTitle: 'المذيع المتورط',
    anchorModeDesc: 'اقرأ نشرة عاجلة بجدية تامة من التيليبرومبتر، والأصحاب يقذفون كلمات محرجة ومفاجئة لإفحامك وإضحاكك على الهواء!',
    anchorModeHighlight: 'تيليبرومبتر حي • كلمات مفاجئة • حساس الضحك',

    secretModeTitle: 'السر الكوميدي',
    secretModeDesc: 'سؤال محرج أو موقف غريب، الكل يكتب أروش إجابة سراً، ثم تصويت أعمى بدون معرفة الكاتب لاختيار أضحك رد!',
    secretModeHighlight: 'إجابات سرية • تصويت أعمى • كشف الهويات',

    liveOnAir: 'على الهواء مباشرة',
    readingNow: 'المذيع على الهواء:',
    timeLeft: 'الوقت المتبقي',
    laughCounter: 'ضحكات المذيع',
    sabotageBoxTitle: 'لوحة قصف المذيع بالكلمات المفاجئة',
    sabotagePlaceholder: 'اكتب أي كلمة أو جملة محرجة ترميها للمذيع في التيليبرومبتر فجأة...',
    dropWordBtn: 'اقذف الكلمة! 💥',
    quickSuggestions: 'اقتراحات سريعة:',
    caughtLaughingBtn: '🤣 مسكته بيضحك! (+1 للجمهور)',
    directorInstruction: 'تعليمات المخرج:',
    finishRoundVote: 'انتهت النشرة! الانتقال للتقييم والتصويت',

    secretPromptTitle: 'السؤال السري للجولة',
    secretAnswerPlaceholder: 'اكتب إجابتك هنا في سرية تامة قبل ما العداد يخلص...',
    submitSecretAnswer: 'اعتماد الإجابة السرية! 🔒',
    blindVotingTitle: 'التصويت الأعمى للجمهور 🗳️',
    blindVotingSubtitle: 'اضغط على الإجابة اللي فركشتك من الضحك.. الأسماء ستُكشف بعد التصويت!',
    voteThisAnswer: 'صوّت لهذه 👏',
    votedSuccessfully: '✓ صوتك مسجل',
    secretAuthorRevealed: 'بقلم:',

    podiumTitle: 'نهاية البث • تتويج بطل الضحك',
    winnerDeclared: 'مبروك لنجم الاستوديو! 🎉',
    backToLobby: 'العودة للوبي ولعب جولة جديدة',
    points: 'نقطة',

    installAppBtn: 'تنزيل التطبيق 📲',
    installAppTitle: 'تثبيت Late Show على جهازك',
    installAppDesc: 'العب في وضع ملء الشاشة بدون أشرطة المتصفح، مع سرعة فائقة وتنبيهات اللعب!',
    iosInstallGuideTitle: 'طريقة التثبيت على الآيفون / الآيباد',
    iosStep1: 'اضغط على زر المشاركة (Share) في شريط سفاري.',
    iosStep2: 'مرر لأسفل واختر "إضافة إلى الشاشة الرئيسية" (Add to Home Screen).',
    closeBtn: 'إغلاق',
    offlineBanner: 'أنت في وضع عدم الاتصال حالياً. البيانات المؤقتة قيد الاستخدام.'
  },
  en: {
    appName: 'Late Show',
    appTagline: 'Comedy News Studio • Multiplayer Party Web Game',
    liveBadge: 'LIVE • ON AIR',
    roomCode: 'Studio Code',
    copyLink: 'Copy Code',
    copied: 'Copied!',
    shareWithFriends: 'Share code with friends to join',

    authTitle: 'Enter Late Show',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    playAsGuest: 'Quick Guest Play',
    googleSignIn: 'Continue with Google',
    guestNamePlaceholder: 'Enter your nickname...',
    selectAvatar: 'Choose your avatar:',
    continueBtn: 'Enter Studio 🎬',
    welcomePlayer: 'Welcome, Superstar',
    guestBadge: 'Guest',
    customProfile: 'Edit Profile',

    startBroadcastBtn: 'Start Live Broadcast! 🎬',
    createRoomBtn: 'Create Studio Room',
    joinRoomBtn: 'Join with Code',
    selectGameMode: 'Selected Game Mode',
    playersConnected: 'Friends Cast in Studio',
    allReady: 'Everyone is ready!',
    changeMode: 'Switch Mode',
    hostBadge: '👑 Host',
    youBadge: 'You',
    anchorBadge: '🎙️ Anchor',
    spectatorBadge: 'Audience',

    anchorModeTitle: 'Caught Anchor',
    anchorModeDesc: 'Read breaking news seriously on a live teleprompter while friends inject hilarious sabotage words in real time!',
    anchorModeHighlight: 'Live Teleprompter • Sabotage Injections • Laugh Sensor',

    secretModeTitle: 'Comedy Secret',
    secretModeDesc: 'An awkward scenario appears, everyone submits an anonymous punchline, followed by a blind vote for the funniest response!',
    secretModeHighlight: 'Secret Answers • Blind Voting • Author Reveals',

    liveOnAir: 'LIVE ON AIR',
    readingNow: 'Broadcasting live:',
    timeLeft: 'Time Left',
    laughCounter: 'Anchor Laughs',
    sabotageBoxTitle: 'Sabotage Bombardment Console',
    sabotagePlaceholder: 'Type any ridiculous phrase to inject into the teleprompter...',
    dropWordBtn: 'Launch Sabotage! 💥',
    quickSuggestions: 'Quick Sabotages:',
    caughtLaughingBtn: '🤣 Caught Laughing! (+1 Audience)',
    directorInstruction: "Director's Note:",
    finishRoundVote: 'Broadcast Ended! Proceed to Voting',

    secretPromptTitle: 'Secret Prompt of the Round',
    secretAnswerPlaceholder: 'Type your secret punchline before the clock runs out...',
    submitSecretAnswer: 'Submit Secret Answer! 🔒',
    blindVotingTitle: 'Blind Audience Voting 🗳️',
    blindVotingSubtitle: 'Vote for the answer that cracked you up. Identities are revealed after voting!',
    voteThisAnswer: 'Vote for this 👏',
    votedSuccessfully: '✓ Vote Cast',
    secretAuthorRevealed: 'Written by:',

    podiumTitle: 'Broadcast Finale • Comedy Champion',
    winnerDeclared: 'Congratulations to the Studio Champion! 🎉',
    backToLobby: 'Back to Lobby & Play Again',
    points: 'pts',

    installAppBtn: 'Install App 📲',
    installAppTitle: 'Install Late Show',
    installAppDesc: 'Play in fullscreen standalone mode with instant loading and party notifications!',
    iosInstallGuideTitle: 'How to install on iPhone / iPad',
    iosStep1: 'Tap the Share button in the Safari toolbar.',
    iosStep2: 'Scroll down and tap "Add to Home Screen".',
    closeBtn: 'Close',
    offlineBanner: 'You are currently offline. Local cache is active.'
  }
};
