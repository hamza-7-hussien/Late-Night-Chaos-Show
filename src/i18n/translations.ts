export type Language = 'ar' | 'en';

export interface Translations {
  appName: string;
  appTagline: string;
  liveBadge: string;
  roomCode: string;
  copyLink: string;
  copied: string;
  shareWithFriends: string;
  
  // Navigation / Tabs
  tabLobby: string;
  tabSimulator: string;
  tabStructure: string;
  tabTypes: string;
  tabContent: string;
  tabVercel: string;
  tabGithub: string;

  // Auth
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
    appName: 'استوديو النشرة الكوميدية',
    appTagline: 'لعبة جماعية أونلاين للأصحاب • طور المذيع المتورط + طور السر الكوميدي',
    liveBadge: 'مباشر • ON AIR',
    roomCode: 'كود الاستوديو',
    copyLink: 'نسخ رابط الغرفة',
    copied: 'تم النسخ!',
    shareWithFriends: 'شارك الكود مع أصحابك للدخول',

    tabLobby: 'الاستوديو (Lobby)',
    tabSimulator: 'تجربة اللعب',
    tabStructure: 'هيكل Next.js',
    tabTypes: 'الـ Types والـ State',
    tabContent: 'بنك الأسئلة (JSON)',
    tabVercel: 'حل Vercel Realtime',
    tabGithub: 'ربط GitHub Repo',

    authTitle: 'الدخول إلى الاستوديو',
    signIn: 'تسجيل الدخول',
    signOut: 'تسجيل الخروج',
    playAsGuest: 'دخول سريع كـ زائر (بدون تسجيل)',
    googleSignIn: 'المتابعة بحساب Google',
    guestNamePlaceholder: 'اكتب اسمك أو لقبك هنا...',
    selectAvatar: 'اختر شخصيتك في الاستوديو:',
    continueBtn: 'تأكيد ودخول الاستوديو 🎬',
    welcomePlayer: 'أهلاً بك يا نجم',
    guestBadge: 'زائر',
    customProfile: 'تعديل البروفايل',

    startBroadcastBtn: 'بدء البث المباشر الآن! 🎬',
    createRoomBtn: 'إنشاء استوديو جديد',
    joinRoomBtn: 'انضمام لاستوديو',
    selectGameMode: 'طور اللعبة المختار',
    playersConnected: 'طاقم الاستوديو المتواجد',
    allReady: 'الجميع جاهز للبث!',
    changeMode: 'تغيير الطور',
    hostBadge: '👑 المشرف',
    youBadge: 'أنت',
    anchorBadge: '🎙️ المذيع',
    spectatorBadge: 'مشاهد',

    anchorModeTitle: 'المذيع المتورط',
    anchorModeDesc: 'مذيع يقرأ نشرة عاجلة من التيليبرومبتر، والأصحاب يقذفون كلمات محرجة ومفاجئة لإفحامه وإضحاكه على الهواء!',
    anchorModeHighlight: 'تيليبرومبتر حي • كلمات مفاجئة • عداد الضحك',

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
    backToLobby: 'العودة للوبي واللعب من جديد',
    points: 'نقطة',

    installAppBtn: 'تنزيل اللعبة كـ تطبيق 📲',
    installAppTitle: 'تثبيت استوديو النشرة على جهازك',
    installAppDesc: 'العب في وضع ملء الشاشة بدون أشرطة المتصفح، مع سرعة فائقة وتنبيهات اللعب!',
    iosInstallGuideTitle: 'طريقة التثبيت على الآيفون / الآيباد',
    iosStep1: 'اضغط على زر المشاركة (Share) في شريط سفاري.',
    iosStep2: 'مرر لأسفل واختر "إضافة إلى الشاشة الرئيسية" (Add to Home Screen).',
    closeBtn: 'إغلاق',
    offlineBanner: 'أنت في وضع عدم الاتصال حالياً. البيانات المؤقتة قيد الاستخدام.'
  },
  en: {
    appName: 'Comedy News Studio',
    appTagline: 'Multiplayer Party Web Game • Caught Anchor + Secret Punchline Modes',
    liveBadge: 'LIVE • ON AIR',
    roomCode: 'Studio Code',
    copyLink: 'Copy Room Link',
    copied: 'Copied!',
    shareWithFriends: 'Share code with friends to join',

    tabLobby: 'Studio Lobby',
    tabSimulator: 'Live Gameplay',
    tabStructure: 'Next.js Tree',
    tabTypes: 'Types & State',
    tabContent: 'Prompt Bank (JSON)',
    tabVercel: 'Vercel Realtime',
    tabGithub: 'GitHub Repo Link',

    authTitle: 'Enter Comedy Studio',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    playAsGuest: 'Quick Guest Play (No Signup)',
    googleSignIn: 'Continue with Google',
    guestNamePlaceholder: 'Enter your nickname...',
    selectAvatar: 'Choose your studio avatar:',
    continueBtn: 'Confirm & Enter Studio 🎬',
    welcomePlayer: 'Welcome, Superstar',
    guestBadge: 'Guest',
    customProfile: 'Edit Profile',

    startBroadcastBtn: 'Start Live Broadcast! 🎬',
    createRoomBtn: 'Create Studio Room',
    joinRoomBtn: 'Join Studio',
    selectGameMode: 'Selected Game Mode',
    playersConnected: 'Connected Studio Cast',
    allReady: 'Everyone is ready!',
    changeMode: 'Switch Mode',
    hostBadge: '👑 Host',
    youBadge: 'You',
    anchorBadge: '🎙️ Anchor',
    spectatorBadge: 'Audience',

    anchorModeTitle: 'Caught Anchor',
    anchorModeDesc: 'One player reads serious breaking news on a live teleprompter while friends inject hilarious sabotage words in real time!',
    anchorModeHighlight: 'Live Teleprompter • Sabotage Injections • Laugh Meter',

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

    installAppBtn: 'Install App on Mobile 📲',
    installAppTitle: 'Install Comedy Studio',
    installAppDesc: 'Play in fullscreen standalone mode with instant loading and party notifications!',
    iosInstallGuideTitle: 'How to install on iPhone / iPad',
    iosStep1: 'Tap the Share button in the Safari toolbar.',
    iosStep2: 'Scroll down and tap "Add to Home Screen".',
    closeBtn: 'Close',
    offlineBanner: 'You are currently offline. Local cache is active.'
  }
};
