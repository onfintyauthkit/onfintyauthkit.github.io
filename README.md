<div align="center">

![OnFiNtY Auth UI Kit Banner](Screenshots/banner.png)

# 🚀 OnFiNtY Auth UI Kit

### Premium Glassmorphic Authentication UI for Flutter

[![Flutter](https://img.shields.io/badge/Flutter-3.10.4+-02569B?logo=flutter)](https://flutter.dev)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web%20%7C%20Desktop-blue)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

**A complete, production-ready authentication UI kit with stunning glassmorphic design, multi-language support, and backend flexibility.**

### 🤯 117,649+ Unique Combinations!
**7 Themes** × **7 Languages** × **7 Backgrounds** × **7 Welcome Layouts** × **7 Login Layouts** × **7 Register Layouts** = *One Kit to Rule Them All*

</div>

---

## 🎨 Features

### ✨ **8 Complete Screens**
Every authentication flow you need, beautifully designed:
- 🏠 **Welcome Screen** - Eye-catching entry point
- 🔐 **Login Screen** - Email/password + social auth
- 📝 **Register Screen** - With avatar upload
- 🔑 **Forgot Password** - Password recovery flow
- 🔢 **OTP Verification** - Code verification UI
- 🔄 **Reset Password** - New password setup
- ✅ **Success Screen** - Contextual success messages
- ❌ **Error Screen** - Beautiful error handling

### 🎨 **14 Stunning Themes** (7 Light + 7 Dark!)
One codebase, fourteen unique looks:

![Theme Showcase](Screenshots/themes_showcase.png)

**Light Themes:**
- 🌌 **Cosmic** - Purple, blue, and pink gradients
- 🌊 **Ocean** - Blue and teal vibes
- 🌿 **Nature** - Green and earth tones
- 🌅 **Sunset** - Orange and red warmth
- 👑 **Royal** - Purple and gold elegance
- 🌙 **Midnight** - Dark blue mystery
- ⚪ **Minimal** - Clean black and white

**Dark Themes:** 🌑
- All 7 themes now have true dark variants with higher contrast and accessibility!

### 🎥 **7 Professional Backgrounds**
Choose from 7 stunning animation styles (yes, SEVEN!):
- **🌈 Mesh** - Trending aurora-like soft gradients
- **🔮 Orbs** - Floating glass spheres with physics 
- **💎 Geometric** - Abstract 3D floating shapes
- **🌌 Galactic** - Deep space with twinkling stars and aurora
- **✨ Particles** - Floating stardust with depth layers
- **🌫️ Nebula** - Dreamy cloud-like formations
- **📊 Grid** - Retro-wave cyber perspective grids

### 🌍 **Multi-Language Support**
Built-in translations for 7 languages:
- 🇬🇧 English
- 🇸🇦 Arabic (RTL support)
- 🇪🇸 Spanish
- 🇫🇷 French
- 🇨🇳 Chinese
- 🇮🇳 Hindi
- 🇩🇪 German

**Easily add your own!** Simple map-based localization, no code generation required.

### 🔌 **Backend Agnostic**
Works with any backend through a simple interface:
- ✅ **Firebase** - Complete example included
- ✅ **Supabase** - Production-ready implementation
- ✅ **REST API** - Custom backend template
- ✅ **Mock** - Testing without backend

### 🎨 **21 Layout Varieties**
Mix and match to find YOUR perfect look:

**Welcome Screen (7 layouts):** Classic, Hero, Split, Minimal, Card, Illustration, BottomCTA

**Login Screen (7 layouts):** ClassicForm, SplitAuth, CenteredCard, MinimalFocus, BottomSheet, StepByStep, HeroAuth

**Register Screen (7 layouts):** ClassicForm, SplitAuth, CenteredCard, MinimalFocus, BottomSheet, StepByStep, HeroAuth

### 🎯 **Production Ready**
- ✅ Form validation
- ✅ Error handling
- ✅ Session persistence
- ✅ Avatar upload support
- ✅ Real-time validation (optional)
- ✅ Password strength meter
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ **Keyboard navigation** (Next/Done focus traversal)
- ✅ Smooth animations
- ✅ **Performance Quality Tiers** (High/Medium/Low/Off)
- ✅ **Standardized Glassmorphism** (Centralized `AppBlur` system)
- ✅ **Full social login** (Google, Apple, Facebook)
- ✅ **WCAG accessibility** (semantic headers, live regions, configurable touch targets)
- ✅ **High contrast mode** for maximum readability



---

## ⚡ Quick Start

### 1️⃣ **Installation**

Add dependencies to your `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # Required dependencies
  go_router: ^13.2.0
  flutter_screenutil: ^5.9.0
  flutter_animate: ^4.5.0
  google_fonts: ^6.1.0
  lucide_icons: ^0.257.0
  intl: ^0.20.2
  image_picker: ^1.2.1
  
  flutter_localizations:
    sdk: flutter
```

Run:
```bash
flutter pub get
```

### 2️⃣ **Basic Setup**

Create or update your `lib/main.dart`:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:go_router/go_router.dart';

import 'onfinty_auth/core/l10n/app_localization.dart';
import 'onfinty_auth/backend/auth_backend_examples.dart';
import 'onfinty_auth/core/router/auth_router.dart';
import 'onfinty_auth/core/theme/auth_theme.dart';
import 'onfinty_auth/auth_config.dart';
import 'onfinty_auth/backend/auth_service.dart';
import 'onfinty_auth/core/router/auth_wrapper.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Configure with Mock backend (perfect for testing!)
  AuthService.instance.configure(MockAuthImplementation());
  
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(375, 812),
      builder: (_, child) {
        return MaterialApp.router(
          title: 'My App',
          theme: AppTheme.getTheme(ClientConfig.defaultLocale),
          debugShowCheckedModeBanner: false,
          routerConfig: GoRouter(
            initialLocation: '/',
            routes: [
              GoRoute(
                path: '/',
                builder: (context, state) => AuthWrapper(
                  home: const HomePage(), // Your home screen
                ),
              ),
              ...getAuthRoutes(),
            ],
          ),
          locale: ClientConfig.defaultLocale,
          localizationsDelegates: const [
            AppLocalization.delegate,
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
          ],
          supportedLocales: AppLocalization.supportedLocales,
        );
      },
    );
  }
}

// Simple home page example
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final user = AuthService.instance.currentUser;
    return Scaffold(
      appBar: AppBar(title: const Text("Home")),
      body: Center(
        child: Text("Welcome, ${user?.name ?? 'Guest'}!"),
      ),
    );
  }
}
```

### 3️⃣ **Run**

```bash
flutter run
```

🎉 **That's it!** You now have a complete authentication UI running with the Mock backend.

---

## 🎨 Customization

### Change Theme

Edit `lib/onfinty_auth/auth_config.dart`:

```dart
class ClientConfig {
  // Pick your favorite theme!
  static const AppThemeType themeType = AppThemeType.cosmic;
  // Options: cosmic, ocean, nature, sunset, royal, midnight, minimal
}
```

### Change Language

```dart
class ClientConfig {
  static const Locale defaultLocale = Locale('ar'); // Arabic
  // Options: 'en', 'ar', 'es', 'fr', 'zh', 'hi', 'de'
}
```

### Add Your Logo

```dart
class ClientConfig {
  static const String? logoPath = 'assets/images/logo.png';
  static const double loginLogoWidth = 80;
  static const double loginLogoHeight = 80;
}
```

### Custom Text

```dart
class ClientConfig {
  static const Map<String, String> customWelcomeTitle = {
    'en': 'Welcome to MyApp!',
    'ar': '!مرحبا بك في تطبيقي',
  };
}
```

Want more? Check the [Complete Customization Guide](lib/onfinty_auth/CLIENT_GUIDE.md#customization-guide).

---

## 🔌 Backend Integration

### Firebase Setup

```dart
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'backend/firebase_auth_implementation.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  
  AuthService.instance.configure(FirebaseAuthImplementation());
  
  runApp(const MyApp());
}
```

### Supabase Setup

```dart
import 'package:supabase_flutter/supabase_flutter.dart';
import 'backend/supabase_auth_implementation.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  await Supabase.initialize(
    url: 'https://your-project.supabase.co',
    anonKey: 'your-anon-key',
  );
  
  AuthService.instance.configure(SupabaseAuthImplementation());
  
  runApp(const MyApp());
}
```

### Custom REST API

Create your own implementation following the `AuthInterface`:

```dart
class MyBackendAuth implements AuthInterface {
  // Implement login, register, forgotPassword, etc.
}

AuthService.instance.configure(MyBackendAuth());
```

📚 **Complete backend guides** with code examples: [Backend Integration Guide](lib/onfinty_auth/BACKEND_INTEGRATION.md)

---

## 📖 Documentation

### 📚 Comprehensive Guides

- **[📘 Client Guide](lib/onfinty_auth/CLIENT_GUIDE.md)** - Complete setup, customization, and usage guide (1000+ lines!)
- **[🔌 Backend Integration](lib/onfinty_auth/BACKEND_INTEGRATION.md)** - Firebase, Supabase, REST API examples
- **[📝 Changelog](lib/onfinty_auth/CHANGELOG.md)** - Version history and updates

### 🏗️ Architecture

```
onfinty_auth/
├── auth_config.dart          # 👈 Your customization hub
├── core/
│   ├── theme/               # Theme system
│   ├── router/              # Navigation
│   ├── utils/               # Validators, helpers
│   └── l10n/                # Localization
├── backend/
│   ├── auth_interface.dart   # Backend contract
│   ├── auth_service.dart     # Singleton service
│   └── auth_backend_examples.dart  # Mock, Firebase, Supabase examples
├── models/
│   └── user_entity.dart      # User data model
├── screens/                  # 8 authentication screens
└── widgets/                  # Reusable UI components
```

### 🎯 Key Concepts

**Backend Agnostic**: The UI doesn't care about your backend. All interaction goes through `AuthInterface`, making it easy to swap backends or migrate.

**Session Persistence**: Uses `AuthWrapper` to automatically show home screen if user is logged in, or welcome screen if not.

**Theme System**: All colors, fonts, and styles are centralized. Change one file, update entire app.

**Localization**: Simple map-based system. Add a new language in minutes without code generation.

---

## 🎯 Demo

### Try it Online
> 🚧 **Coming Soon**: Live web demo

### Run Example Project
```bash
cd example
flutter run
```

The example app includes:
- All 8 screens working
- Theme switcher
- Language switcher
- Mock backend showing all flows

---

## 🛠️ Requirements

- **Flutter**: 3.10.4 or higher
- **Dart**: ^3.10.4
- **Platforms**: iOS 11+, Android 5.0+, Web, macOS, Windows, Linux

---

## 📦 What's Included

### The Magic Numbers ✨
> "Why 7? Because 7 is the number of awesomeness!" — *The OnFiNtY Team*

| Feature | Count | Why It's Cool |
|---------|-------|---------------|
| 🎨 Themes | 7 | From cosmic purple to minimal white |
| 🌍 Languages | 7 | Including RTL Arabic! |
| 🎬 Backgrounds | 7 | Mesh, orbs, galactic, and more |
| 🏠 Welcome Layouts | 7 | Classic, hero, split, card... |
| 🔐 Login Layouts | 7 | Step-by-step, centered, minimal... |
| 📝 Register Layouts | 7 | Same flexibility as login |
| 📺 Screens | 8 | Complete auth flow covered |

**Do the math:** 7 × 7 × 7 × 7 × 7 × 7 = **117,649** possible combinations! Good luck trying them all. 😏

### Core Package
✅ 8 complete authentication screens  
✅ 7 pre-built color themes  
✅ 7 language translations  
✅ 7 animated background styles  
✅ 21 layout varieties (7 per main screen)  
✅ Glassmorphic UI components  
✅ Form validation system  
✅ Error handling dialogs  
✅ Responsive layouts  
✅ Smooth animations  

### Backend Examples
✅ Mock implementation (for testing)  
✅ Firebase complete example  
✅ Supabase complete example  
✅ REST API template  

### Documentation
✅ 2000+ lines of guides  
✅ Copy-paste code examples  
✅ Troubleshooting tips  
✅ Best practices  

---

## 🎓 Learning Resources

### For Beginners
Start here: [Step-by-Step Client Guide](lib/onfinty_auth/CLIENT_GUIDE.md#getting-started)

### For Experienced Developers
Jump to: [Backend Integration](lib/onfinty_auth/BACKEND_INTEGRATION.md) or [Architecture Overview](#architecture)


---

## 🌟 Why OnFiNtY Auth UI Kit?

| Feature | OnFiNtY | Others |
|---------|---------|--------|
| Combinations | ✅ **117,649** unique looks | ❌ 1 boring look |
| Glassmorphic Design | ✅ Premium | ❌ Basic |
| Backend Flexibility | ✅ Any backend | ❌ Locked to one |
| Multi-Language | ✅ 7 languages | ❌ English only |
| Themes | ✅ 7 themes | ❌ 1-2 themes |
| Backgrounds | ✅ 7 animated styles | ❌ Static gradient |
| Layout Varieties | ✅ 21 layouts (7×3) | ❌ None |
| Documentation | ✅ 2000+ lines | ❌ Minimal |
| Session Persistence | ✅ Built-in | ❌ DIY |
| Avatar Upload | ✅ Included | ❌ Not included |
| Production Ready | ✅ Yes | ❌ Demo quality |

---

## ⏱️ Time Savings Calculator

### The Math That'll Make Your Manager Smile 🧮

Let's break down what you're NOT building from scratch:

| Task | DIY Time | With OnFiNtY | You Save |
|------|----------|--------------|----------|
| 8 Auth Screens | 40+ hours | 10 minutes | **39+ hours** |
| Glassmorphism Design | 20 hours | 0 minutes | **20 hours** |
| 7 Color Themes | 10 hours | 0 minutes | **10 hours** |
| 7 Languages + RTL | 15 hours | 0 minutes | **15 hours** |
| 7 Background Animations | 25 hours | 0 minutes | **25 hours** |
| Backend Abstraction Layer | 8 hours | 0 minutes | **8 hours** |
| Form Validation | 4 hours | 0 minutes | **4 hours** |
| Session Persistence | 3 hours | 0 minutes | **3 hours** |
| Password Strength Meter | 2 hours | 0 minutes | **2 hours** |
| Social Login (Google/Apple/FB) | 12 hours | 0 minutes | **12 hours** |
| Accessibility (WCAG) | 10 hours | 0 minutes | **10 hours** |
| Responsive Layouts | 6 hours | 0 minutes | **6 hours** |
| Documentation | 10 hours | 0 minutes | **10 hours** |
| **TOTAL** | **165+ hours** | **~1 hour** | **~164 hours** |

> **Translation:** That's **4+ weeks** of full-time development condensed into a coffee break. ☕

### But Wait, There's More! 🎁

What you're ALSO not doing:
- ❌ Debugging layout overflow issues at 2 AM
- ❌ Googling "flutter glassmorphism blur not working"
- ❌ Fighting with Arabic right-to-left layouts
- ❌ Writing the same form validation code for the 47th time
- ❌ Explaining to your client why the login screen "isn't pretty enough"

**What you ARE doing:**
- ✅ Copy → Paste → Ship 🚀
- ✅ Looking like a hero to your team
- ✅ Finally taking that lunch break

## 🤝 Contributing

### Areas We'd Love Help With
- 🌍 More language translations
- 🎨 New theme variants
- 🔌 More backend examples (AWS Cognito, Auth0, etc.)
- 📱 Platform-specific improvements
- 🐛 Bug fixes and optimizations

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What does this mean?
✅ Use in personal projects  
✅ Use in commercial projects  
✅ Modify and customize  
✅ Distribute  

**Attribution appreciated but not required!**

---

## 💬 Support

### Need Help?

- 📧 **Email**: onfinty@gmail.com
- 📖 **Docs**: All guides are in the `lib/onfinty_auth/` folder
-   **LinkedIn**: [linkedin.com/in/kyrillos-sameh/](https://linkedin.com/in/kyrillos-sameh/)

---

## 🎉 Success Stories

> 💡 **Using OnFiNtY Auth UI Kit in your app?** Let us know! We'd love to feature you here.

---

## 🗺️ Roadmap

### ✅ Completed
- [x] 8 authentication screens
- [x] 7 color themes + 7 dark variants (14 total!)
- [x] Multi-language support (7 languages)
- [x] Backend-agnostic architecture
- [x] Firebase integration
- [x] Supabase integration
- [x] Comprehensive documentation
- [x] **Dark mode variants** ✨ *NEW in 1.6.7!*
- [x] **Google Sign-In implementation** ✨ *NEW in 1.6.3!*
- [x] **Apple Sign-In implementation** ✨ *NEW in 1.6.3!*
- [x] **Facebook Sign-In implementation** ✨ *NEW in 1.6.3!*
- [x] **WCAG Accessibility enhancements** ✨ *NEW in 1.6.5!*
- [x] **Logo alignment system** ✨ *NEW in 1.6.6!*
- [x] **Premium Forgot Password** (Deep Glass redesign) ✨ *NEW in 1.6.8!*
- [x] **Keyboard navigation** (Next/Done focus) ✨ *NEW in 1.6.8!*
- [x] **HeroAuth layout fixes** ✨ *NEW in 1.6.8!*
- [x] **Background Performance Tiers** (Low-end device support) ✨ *NEW in 1.6.9!*
- [x] **Smart Validation Debouncing** ✨ *NEW in 1.6.9!*
- [x] **Standardized `AppBlur` Constants** ✨ *NEW in 1.6.9!*

### 📋 Planned
- [ ] Biometric authentication support (Face ID / Touch ID)
- [ ] 2FA/MFA implementation
- [ ] More language translations
- [ ] Performance optimizations
- [ ] Full widget/unit test coverage

---

## 🙏 Acknowledgments

Built with ❤️ using:
- [Flutter](https://flutter.dev) - The best cross-platform framework
- [Go Router](https://pub.dev/packages/go_router) - Declarative routing
- [Google Fonts](https://pub.dev/packages/google_fonts) - Beautiful typography
- [Flutter Animate](https://pub.dev/packages/flutter_animate) - Smooth animations
- [Lucide Icons](https://pub.dev/packages/lucide_icons) - Clean icon set

Special thanks to the Flutter community for inspiration and support!

---

<div align="center">

**Made with 💜 by the OnFiNtY Team**


---

</div>
