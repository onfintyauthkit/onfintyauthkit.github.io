<div align="center">

![OnFiNtY Auth UI Kit Banner](Screenshots/banner.png)

# 🚀 OnFiNtY Auth UI Kit

### Premium Glassmorphic Authentication UI for Flutter

[![Flutter](https://img.shields.io/badge/Flutter-3.10.4+-02569B?logo=flutter)](https://flutter.dev)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web%20%7C%20Desktop-blue)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

**A complete, production-ready authentication UI kit with stunning glassmorphic design, multi-language support, and backend flexibility.**

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

### 🎨 **7 Stunning Themes**
One codebase, seven unique looks:

![Theme Showcase](Screenshots/themes_showcase.png)

- 🌌 **Cosmic** - Purple, blue, and pink gradients
- 🌊 **Ocean** - Blue and teal vibes
- 🌿 **Nature** - Green and earth tones
- 🌅 **Sunset** - Orange and red warmth
- 👑 **Royal** - Purple and gold elegance
- 🌙 **Midnight** - Dark blue mystery
- ⚪ **Minimal** - Clean black and white

### 🎥 **Professional Backgrounds**
Choose from 3 stunning animation styles:
- **Mesh** - Trending aurora-like soft gradients
- **Orbs** - Floating glass spheres with physics
- **Geometric** - Abstract 3D floating shapes

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

### 🎯 **Production Ready**
- ✅ Form validation
- ✅ Error handling
- ✅ Session persistence
- ✅ Avatar upload support
- ✅ Real-time validation (optional)
- ✅ Password strength meter
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations
- ✅ Accessibility support

---

## 📱 Screenshots

![Screen Showcase](Screenshots/screens_showcase.png)

<details>
<summary>📸 View More Screenshots</summary>

> 💡 **Note**: More detailed screenshots of each screen and theme are available in the `/Screenshots` directory.

</details>

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

### Core Package
✅ 8 complete authentication screens  
✅ 7 pre-built color themes  
✅ 7 language translations  
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

### Video Tutorials
> 🚧 **Coming Soon**: YouTube channel with setup tutorials

---

## 🌟 Why OnFiNtY Auth UI Kit?

| Feature | OnFiNtY | Others |
|---------|---------|--------|
| Glassmorphic Design | ✅ Premium | ❌ Basic |
| Backend Flexibility | ✅ Any backend | ❌ Locked to one |
| Multi-Language | ✅ 7 languages | ❌ English only |
| Themes | ✅ 7 themes | ❌ 1-2 themes |
| Documentation | ✅ 2000+ lines | ❌ Minimal |
| Session Persistence | ✅ Built-in | ❌ DIY |
| Avatar Upload | ✅ Included | ❌ Not included |
| Production Ready | ✅ Yes | ❌ Demo quality |

---

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
- [x] 7 color themes
- [x] Multi-language support
- [x] Backend-agnostic architecture
- [x] Firebase integration
- [x] Supabase integration
- [x] Comprehensive documentation

### 🚧 In Progress
- [ ] Dark mode variants
- [ ] Google Sign-In implementation
- [ ] Video tutorials
- [ ] Live demo website

### 📋 Planned
- [ ] Biometric authentication support
- [ ] 2FA/MFA implementation
- [ ] More language translations
- [ ] Additional themes
- [ ] Accessibility enhancements
- [ ] Performance optimizations

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

[⬆ Back to Top](#🚀-OnFiNtY-Auth-UI-Kit)

---

</div>
