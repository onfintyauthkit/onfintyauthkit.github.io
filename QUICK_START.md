# ⚡ Quick Start: 5-Minute Setup

*No fluff. No philosophy. Just copy, paste, and run.*

---

## Step 1: Copy the Folder (30 seconds)

Copy the entire `onfinty_auth` folder into your project's `lib/` directory:

```
your_app/
├── lib/
│   ├── main.dart
│   └── onfinty_auth/    ← Put it here
```

---

## Step 2: Add Dependencies (1 minute)

Open `pubspec.yaml` and add:

```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  go_router: ^13.2.0
  flutter_screenutil: ^5.9.0
  flutter_animate: ^4.5.0
  google_fonts: ^6.1.0
  lucide_icons: ^0.257.0
  intl: ^0.20.2
  image_picker: ^1.2.1
```

Run:
```bash
flutter pub get
```

---

## Step 3: Replace main.dart (2 minutes)

**Delete everything** in your `main.dart` and paste this:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:go_router/go_router.dart';

// Auth Kit imports
import 'onfinty_auth/core/l10n/app_localization.dart';
import 'onfinty_auth/backend/auth_backend_examples.dart';
import 'onfinty_auth/core/router/auth_router.dart';
import 'onfinty_auth/core/theme/auth_theme.dart';
import 'onfinty_auth/auth_config.dart';
import 'onfinty_auth/backend/auth_service.dart';
import 'onfinty_auth/core/router/auth_wrapper.dart';
import 'onfinty_auth/models/user_entity.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // This uses a mock backend - swap later for Firebase/Supabase
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
          title: ClientConfig.appName,
          theme: AppTheme.getTheme(ClientConfig.defaultLocale),
          debugShowCheckedModeBanner: false,
          routerConfig: GoRouter(
            initialLocation: '/',
            routes: [
              GoRoute(
                path: '/',
                builder: (_, __) => AuthWrapper(home: const HomePage()),
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

// Simple home page - replace with your actual home later
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final user = AuthService.instance.currentUser;
    return Scaffold(
      appBar: AppBar(title: const Text('Home')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Welcome, ${user?.name ?? "User"}!'),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                AuthService.instance.logout();
                context.go('/');
              },
              child: const Text('Logout'),
            ),
          ],
        ),
      ),
    );
  }
}
```

---

## Step 4: Run It! (30 seconds)

```bash
flutter run
```

🎉 **That's it!** You should see the beautiful auth screens.

---

## What's Next?

| Task | Time | Guide |
|------|------|-------|
| Customize theme/colors | 5 min | [auth_config.dart](auth_config.dart) |
| Add your logo | 2 min | [CLIENT_GUIDE.md](CLIENT_GUIDE.md#logo-configuration) |
| Optimize for low-end devices | 2 min | [CLIENT_GUIDE.md](CLIENT_GUIDE.md#-performance--quality-new-v169) |
| Connect real backend | 30 min | [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) |
| Add social login | 1 hour | [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md#-social-login-setup) |

---

## Test Credentials (Mock Backend)

The mock backend accepts **any email/password** except:
- Email containing `error` → Returns error
- Email containing `exists` → "Email already exists"
- OTP code → Always `1234`

---

## Common Issues

**"flutter pub get" fails?**
→ Check your Flutter version: `flutter --version` (need 3.10.4+)

**Screens look weird?**
→ Wrap your `MaterialApp` in `ScreenUtilInit` (already done in template above)

**"AuthService not configured" error?**
→ Make sure `AuthService.instance.configure()` is called BEFORE `runApp()`

---

*Still stuck? Check the full [CLIENT_GUIDE.md](CLIENT_GUIDE.md) or [ROUTER_GUIDE.md](ROUTER_GUIDE.md)*
