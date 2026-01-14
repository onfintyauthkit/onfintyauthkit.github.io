# 📘 OnFiNtY Auth UI Kit - Client Integration Guide

Welcome, fellow developer! 🎉 You've just unlocked **117,649** ways to make your authentication screens look absolutely stunning. Grab a coffee, maybe a snack, and let's turn your app into a masterpiece!

---

## 🚀 Quick Navigation

Jump straight to what you need:

### Getting Started
- [Quick Start Checklist](#-quick-start-checklist)
- [Step 1: Add the Kit](#step-1-add-the-kit-to-your-project)
- [Step 2: Install Dependencies](#step-2-install-dependencies)
- [Step 3: Configure main.dart](#step-3-configure-maindart)
- [Step 4: Customize auth_config.dart](#step-4-customize-auth_configdart)

### 🚦 Routing (New!)
- [**ROUTER GUIDE**](ROUTER_GUIDE.md) - *GoRouter, GetX, Navigator 2.0*
- [Scenario A: Fresh Project](#scenario-a-fresh-project-no-existing-router)
- [Scenario B: Existing GoRouter](#scenario-b-existing-gorouter-project)
- [Scenario C: With Splash Screen](#scenario-c-with-splash-screen)
- [Scenario D: Bottom Navigation](#scenario-d-with-bottom-navigation-bar)

### Customization
- [Layout Configuration](#-layout-configuration) - *117,649 Combinations!*
- [Background Styles](#-background-styles)
- [Theme Configuration](#customization-reference)
- [Logo Configuration](#logo-configuration)
- [Validation Configuration](#-validation-configuration)
- [Performance & Quality](#-performance--quality-new-v169)
- [Standardized Blurs](#-standardized-blurs-new-v169)

### Integration
- [Backend Setup](#step-7-choose-your-backend)
- [Success Screen](#step-6-understanding-the-success-screen)
- [Logout](#logout-implementation)

### Help
- [Testing Guide](#-testing-new-in-v170) - *Test your auth flows!*
- [Disposal Guide](#-disposal--cleanup) - *Memory management done right*
- [Troubleshooting](#troubleshooting)
- [Need More Help?](#need-more-help)

---

## 📋 Quick Start Checklist

Use this checklist to track your progress (mentally check them off, we believe in you!):

- [ ] **Step 1**: Copy `onfinty_auth` folder to your `lib/` directory
- [ ] **Step 2**: Add dependencies to `pubspec.yaml` and run `flutter pub get`
- [ ] **Step 3**: Configure your `main.dart` file
- [ ] **Step 4**: Customize `auth_config.dart` settings
- [ ] **Step 5**: Set up your router (pick your scenario below!)
- [ ] **Step 6**: Choose and configure your backend
- [ ] **Step 7**: Do a little victory dance 💃🕺

> ⚡ **In a hurry?** Check out [QUICK_START.md](QUICK_START.md) for a 5-minute copy-paste setup!

---

## 🆕 New to Flutter?

No shame in being new! Everyone starts somewhere. Here's what you need before diving in:

### Prerequisites Checklist

- [ ] Flutter 3.10.4+ installed (`flutter --version` to check)
- [ ] An IDE (VS Code with Flutter extension or Android Studio)
- [ ] Basic Dart knowledge (variables, functions, classes)
- [ ] Understand what a `StatelessWidget` is
- [ ] Know how to run `flutter pub get`

**Missing something?** Here are great resources:
- [Flutter Official Tutorial](https://flutter.dev/docs/get-started/codelab)
- [Dart Language Tour](https://dart.dev/guides/language/language-tour)
- [Flutter for Beginners (YouTube)](https://www.youtube.com/watch?v=VPvVD8t02U8)

### 🚨 Common Beginner Mistakes

| Mistake | Solution |
|---------|----------|
| "flutter pub get" fails | Run `flutter doctor` to diagnose issues |
| "Widget not found" errors | Make sure imports are correct (check file paths) |
| Hot reload doesn't work | Try full restart: `flutter run` again |
| "Null check operator used on null" | Initialize AuthService BEFORE runApp() |
| Screens look too small/big | You're missing `ScreenUtilInit` wrapper |

### 💡 Pro Tips for Beginners

1. **Start with Mock Backend** - Get the UI working before adding Firebase/Supabase
2. **Use the QUICK_START.md** - It has a complete, working main.dart you can copy
3. **Customize ONE thing at a time** - Don't change everything at once
4. **Read error messages** - Flutter errors are actually quite helpful!

## Step 1: Add the Kit to Your Project

This is the easiest part. Seriously.

1. Navigate to the kit folder you downloaded
2. Copy the entire `lib/onfinty_auth/` folder
3. Paste it into your project's `lib/` directory
4. Pat yourself on the back ✋

**Your project structure should look like this:**

```
your_app/
├── lib/
│   ├── main.dart              ← Your app entry point
│   ├── onfinty_auth/          ← The auth kit (you just added this!)
│   │   ├── auth_config.dart   ← Your customization file (THE MAGIC HAPPENS HERE)
│   │   ├── backend/
│   │   ├── core/
│   │   ├── models/
│   │   ├── screens/
│   │   └── widgets/
│   │   └── test/
│   │   └── ... (your other awesome code)
```

---

## Step 2: Install Dependencies

Add these dependencies to your `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # ==========================================
  # 📦 REQUIRED - These are non-negotiable!
  # ==========================================
  go_router: ^13.2.0              # Navigation (because context.push is life)
  flutter_screenutil: ^5.9.0      # Responsive design (looks good on ALL screens)
  flutter_animate: ^4.5.0         # Animations (smooth like butter 🧈)
  google_fonts: ^6.1.0            # Typography (fonts that don't suck)
  lucide_icons: ^0.257.0          # Icons (clean and pretty)
  intl: ^0.20.2                   # Internationalization (مرحبا!)
  image_picker: ^1.2.1            # Avatar uploads (selfie time! 📸)
  
  # REQUIRED - Localization
  flutter_localizations:
    sdk: flutter
  
  # ==========================================
  # 🔌 BACKEND - Choose ONE (or build your own!)
  # ==========================================
  
  # For Firebase:
  # firebase_core: ^4.3.0
  # firebase_auth: ^6.1.3
  # firebase_storage: ^13.0.5
  
  # For Supabase:
  # supabase_flutter: ^2.12.0
  
  # For REST API:
  # http: ^1.2.0
  
  # For GraphQL:
  # graphql_flutter: ^5.1.2
  
  # ==========================================
  # 🔑 SOCIAL LOGIN - Only if you need them
  # ==========================================
  # See BACKEND_INTEGRATION.md for setup instructions!
  
  # google_sign_in: ^6.2.1           # Google Sign-In
  # sign_in_with_apple: ^6.1.1       # Apple Sign-In
  # crypto: ^3.0.3                   # Required for Apple Sign-In
  # flutter_facebook_auth: ^7.0.1    # Facebook Sign-In
```

**Run:**
```bash
flutter pub get
```

> 💡 **Not using GoRouter?** Check out [ROUTER_GUIDE.md](ROUTER_GUIDE.md) for GetX and Navigator 2.0 alternatives!

Done? Awesome! You're 33% there! 🎊

---

## Step 3: Configure main.dart

Here's the essential setup for your `main.dart`:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:go_router/go_router.dart';

// Auth Kit imports
import 'onfinty_auth/core/l10n/app_localization.dart';
import 'onfinty_auth/backend/auth_backend_examples.dart';  // For MockAuthImplementation
import 'onfinty_auth/core/router/auth_router.dart';
import 'onfinty_auth/core/theme/auth_theme.dart';
import 'onfinty_auth/auth_config.dart';
import 'onfinty_auth/backend/auth_service.dart';
import 'onfinty_auth/core/router/auth_wrapper.dart';

void main() async {
  // 1. REQUIRED: Initialize Flutter bindings
  WidgetsFlutterBinding.ensureInitialized();

  // 2. REQUIRED: Configure authentication backend
  // Use MockAuthImplementation for testing, then switch to your real backend
  AuthService.instance.configure(MockAuthImplementation());

  // 3. Run your app
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    // REQUIRED: Wrap with ScreenUtilInit for responsive design
    return ScreenUtilInit(
      designSize: const Size(375, 812),
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (_, child) {
        return MaterialApp.router(
          title: ClientConfig.appName,
          theme: AppTheme.getTheme(ClientConfig.defaultLocale),
          debugShowCheckedModeBanner: false,

          // Router configuration - See Step 5 for your specific scenario
          routerConfig: _router,

          // REQUIRED: Localization setup
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

// See Step 5 for router configuration based on your scenario
final _router = GoRouter(
  initialLocation: '/',
  routes: [
    // Your routes here - see Step 5
  ],
);
```

---

## Step 4: Customize auth_config.dart

This is where the magic happens! ✨ Open `lib/onfinty_auth/auth_config.dart` and make it yours.

### Essential Settings

```dart
class ClientConfig {
  // Your app name (show it off on the welcome screen!)
  static const String appName = "Your App Name";
  
  // Default language (en, ar, es, fr, zh, hi, de)
  static const Locale defaultLocale = Locale('en');
  
  // Where to go after successful login/register 
  static const String successRoute = '/home';
  
  // Theme selection (pick your vibe!)
  static const AppThemeType themeType = AppThemeType.midnight;
  
  // Background animation style (7 options!!!)
  static const AuthBackgroundStyle backgroundStyle = AuthBackgroundStyle.orbs;
}
```

### Password Reset Method

```dart
// Set based on your backend:
// - Firebase/Supabase: Set to FALSE (they use email links)
// - Custom backend with OTP: Set to TRUE
static const bool useOtpPage = false;
```

### Logo Configuration (Now with 87% Less Frustration! ✨)

Tired of tweaking `Offset(12.5, -34.7)` until your eyes bleed? Say hello to the new **LogoAlignment** system!

```dart
// NEW WAY - Just pick a preset! 🎯
static const LogoAlignment logoAlignment = LogoAlignment.center;
// Options: center, topCenter, bottomCenter, topLeft, topRight, custom

// Global sizing - set once, works everywhere
static const Size? logoSize = Size(100, 100); // or null for auto-sizing

// Legacy way still works (for backwards compatibility):
static const String? logoPath = 'assets/images/logo.png';
static const double loginLogoWidth = 100;
static const double loginLogoHeight = 100;

// Only needed if logoAlignment == LogoAlignment.custom:
static const Offset customLogoOffset = Offset(0, 0);
```

**Pro tip:** Start with `LogoAlignment.center` and only switch to `custom` if you REALLY need pixel-perfect control!

### Social Login Toggles

Social login is now fully implemented! 🎉 Toggle them on/off as needed:

```dart
static const bool enableGoogleSignIn = true;   // Works on iOS & Android
static const bool enableFacebookSignIn = false; // Because not everyone loves Facebook
static const bool enableAppleSignIn = true;     // Required for iOS (Apple's rules, not ours 🍎)
```

> 📚 **Need setup help?** See [BACKEND_INTEGRATION.md → Social Login Setup](BACKEND_INTEGRATION.md#-social-login-setup) for per-platform instructions!

---

## 🌑 Dark Theme Variants *(NEW in 1.6.7!)*

Welcome to the Dark Side! We have cookies... and 7 beautiful dark themes!

```dart
// In auth_config.dart
static const AppThemeType themeType = AppThemeType.midnightDark;
```

| Light Theme | Dark Variant | Vibe |
|-------------|--------------|------|
| `cosmic` | `cosmicDark` | Deep space purple 🌌 |
| `ocean` | `oceanDark` | Midnight sea vibes 🌊 |
| `nature` | `natureDark` | Forest at dusk 🌲 |
| `sunset` | `sunsetDark` | Ember glow 🔥 |
| `royal` | `royalDark` | Throne room elegance 👑 |
| `midnight` | `midnightDark` | Classic dark mode 🌙 |
| `minimal` | `minimalDark` | Sleek and simple ⚫ |

**Why dark variants?**
- ✅ True OLED black for battery savings
- ✅ Better contrast for accessibility
- ✅ Glass cards actually look like glass in the dark
- ✅ Your users' eyes at 2am will thank you

---

## ♿ Accessibility Configuration *(NEW in 1.6.5!)*

Making apps accessible isn't just nice—it's the right thing to do. And now it's easy!

```dart
// In auth_config.dart

// Enable full accessibility mode (recommended for healthcare, finance, elderly apps)
static const bool accessibilityMode = false;

// Minimum touch target size (WCAG recommends 48dp)
static const double minTouchTargetSize = 48.0;

// High contrast mode - maximum readability
static const bool highContrastMode = false;
```

### What `accessibilityMode` Does:

| Feature | Normal | Accessibility Mode |
|---------|--------|-------------------|
| Touch targets | Standard | 48dp minimum |
| Glass opacity | Stylish | Higher contrast |
| Font sizes | Design-first | Readability-first |
| Button padding | Compact | Generous |

### What's Under the Hood:

- **Semantic Headers**: All screen titles are proper semantic headers for screen readers
- **Live Regions**: Password strength announcements happen in real-time
- **Localized Labels**: All 7 languages have proper accessibility labels
- **Button Roles**: Every button has an explicit role defined

> 💡 **Pro tip:** Even if you don't enable `accessibilityMode`, all the semantic improvements are always active. The flag just cranks contrast and sizing up to 11!

---

## 🎨 Layout Configuration

This is where it gets FUN! You have **7 layout options for EACH main screen**. Mix and match to create **343 unique combinations** just from layouts alone!

### Welcome Screen Layouts

```dart
// In auth_config.dart
static const WelcomeLayoutStyle welcomeLayoutStyle = WelcomeLayoutStyle.split;
```

| Layout | Vibe | Best For |
|--------|------|----------|
| `classic` | Logo → Title → Glass Card Buttons | Traditional apps |
| `hero` | Large centered typography, buttons at bottom | Bold branding |
| `split` | Top content, bottom action sheet | Modern mobile |
| `minimal` | No glass cards, solid/outline buttons | Clean aesthetic |
| `card` | All content in a center glass card | Floating feel |
| `illustration` | Icon/Image → Title → Buttons | App showcase |
| `bottomCTA` | Content flows, fixed bottom glass sheet | E-commerce |

### Login Screen Layouts

```dart
// In auth_config.dart
static const LoginLayoutStyle loginLayoutStyle = LoginLayoutStyle.centeredCard;
```

| Layout | Vibe | Best For |
|--------|------|----------|
| `classicForm` | Baseline centered form in glass card | Traditional |
| `splitAuth` | Top branding, bottom form sheet | Professional |
| `centeredCard` | Premium floating center card | Elegance |
| `minimalFocus` | No glass, clean solid buttons | Zen mode |
| `bottomSheet` | Scrollable, fixed CTA at bottom | Mobile-first |
| `stepByStep` | Multi-step with progress indicator | Onboarding |
| `heroAuth` | Large typography, dramatic layout | Bold apps |

### Register Screen Layouts

```dart
// In auth_config.dart
static const RegisterLayoutStyle registerLayoutStyle = RegisterLayoutStyle.stepByStep;
```

Same 7 options as Login! Pick what feels right for your user journey.

---

## 🌈 Background Styles

Seven beautiful animated backgrounds to choose from. Yes, SEVEN! 

```dart
// In auth_config.dart
static const AuthBackgroundStyle backgroundStyle = AuthBackgroundStyle.galactic;
```

| Style | Description | Mood |
|-------|-------------|------|
| `mesh` | Soft aurora-like gradients blending | Calm, premium |
| `orbs` | Floating glass spheres with physics | Playful, modern |
| `geometric` | Abstract 3D shapes with glass effect | Tech, sophisticated |
| `galactic` | Deep space with twinkling stars | Cosmic, dramatic |
| `particles` | Floating stardust with depth layers | Magical, subtle |
| `nebula` | Dreamy cloud-like formations | Ethereal, artistic |
| `grid` | Retro-wave cyber perspective grids | Cyberpunk, edgy |

**Pro tip:** Try different backgrounds with different themes. `cosmic` + `galactic` = 🔥. `nature` + `mesh` = 🌿✨

---

## 🚀 Performance & Quality (NEW in v1.6.9!)

Is your app running on a shiny new iPhone 16 Pro Max or a trusty old Android from 2018? Either way, we've got you covered! 🏎️

### Background Quality Tiers

You can now adjust the visual complexity of our animated backgrounds to match the device's hardware.

```dart
// In auth_config.dart
static const BackgroundQuality backgroundQuality = BackgroundQuality.high;
```

| Tier | What it does | Best For |
|------|--------------|----------|
| `high` | Full visual glory: All blobs, particles, shadows, and deep blurs. | Modern flagships |
| `medium` | Reduces element count and blur intensity by 50%. | Mid-range devices |
| `low` | Removes expensive `BackdropFilter` and complex box shadows. Core animation remains. | Older/Entry-level devices |
| `off` | Replaces animation with a beautiful static `AppColors.mainGradient`. | Battery-saving mode |

### 🛠 Under the Hood: RepaintBoundaries
We've wrapped every animated layer in a `RepaintBoundary`. This tells Flutter: "Hey, don't redraw the whole screen just because this background is moving!" This drastically reduces CPU/GPU usage.

---

## 🧊 Standardized Blurs (NEW in v1.6.9!)

No more magic numbers! We've centralized all glassmorphic blur values so your UI stays consistent across every screen.

```dart
// Use these constants via the AppBlur class
AppBlur.none        // 0.0
AppBlur.extraLight  // 10.0
AppBlur.light       // 20.0
AppBlur.medium      // 25.0
AppBlur.heavy       // 30.0
AppBlur.extraHeavy  // 80.0
```

Want to change the "vibe" of your entire app's glassmorphism? Just update the `AppBlur` class in `auth_theme.dart` and watch the magic happen! ✨

---

## 🛡️ Validation Configuration

Take control of security with the new validation settings!

```dart
// In auth_config.dart

// 1. Weak (min 6 chars)
// 2. Medium (min 8 chars, 1 number)
// 3. Strong (min 8 chars, 1 number, 1 uppercase, 1 special char)
// 4. Custom (Define your own rules!)
static const PasswordStrength passwordStrength = PasswordStrength.strong;

// If Custom:
static const PasswordValidationConfig? customPasswordRules = PasswordValidationConfig(
  minLength: 12,
  requireUppercase: true, 
  requireSpecialChar: true,
);

// Email Logic
// 1. Standard (Normal email check)
// 2. Relaxed (Just checks for '@' and '.')
// 3. Custom (Your own Regex)
static const EmailValidationMode emailValidationMode = EmailValidationMode.standard;
```

---

## Step 5: Router Configuration

Choose YOUR scenario below and follow the specific instructions. We've got you covered no matter what your app looks like!

> 📚 **Want more router options?** Check out [ROUTER_GUIDE.md](ROUTER_GUIDE.md) for:
> - 🔵 **GoRouter** (Default) - URL-based, official Flutter package
> - 🟢 **GetX** - State management + routing in one
> - 🟣 **Navigator 2.0** - Full manual control

---

### Scenario A: Fresh Project (No Existing Router)

*"I'm starting from scratch and don't have any routing yet!"*

Use this if you're building a brand new project. Lucky you!

```dart
import 'onfinty_auth/core/router/auth_router.dart';
import 'onfinty_auth/core/router/auth_wrapper.dart';

final _router = GoRouter(
  initialLocation: '/',
  routes: [
    // Root route with AuthWrapper for session management
    GoRoute(
      path: '/',
      builder: (context, state) => AuthWrapper(
        home: const HomePage(),  // Your home screen widget
      ),
    ),
    
    // Your home route (where users go after login)
    GoRoute(
      path: '/home',
      builder: (context, state) => const HomePage(),
    ),
    
    // Auth routes from the kit (the magic ✨)
    ...getAuthRoutes(),
    
    // Add your other app routes here
  ],
);
```

**How it works:**
1. User opens app → `AuthWrapper` checks if logged in
2. If logged in → Shows `HomePage`
3. If not logged in → Shows `WelcomeScreen`
4. After login/register → Navigates to `/home`

Simple! 🎉

---

### Scenario B: Existing GoRouter Project

*"I already have a bunch of routes and don't want to break anything!"*

If you already have a GoRouter setup, just add the auth routes. Minimal disruption, maximum benefit!

```dart
// Your existing router
final _router = GoRouter(
  initialLocation: '/your-initial-route',
  routes: [
    // === ADD THIS: Auth wrapper as entry point ===
    GoRoute(
      path: '/',
      builder: (context, state) => AuthWrapper(
        home: const YourExistingHomePage(),
      ),
    ),
    
    // === ADD THIS: Your success route ===
    GoRoute(
      path: '/home',  // Must match ClientConfig.successRoute
      builder: (context, state) => const YourExistingHomePage(),
    ),
    
    // === ADD THIS: Spread auth routes ===
    ...getAuthRoutes(),
    
    // === Your existing routes below ===
    GoRoute(path: '/settings', builder: (_, __) => const SettingsPage()),
    GoRoute(path: '/profile', builder: (_, __) => const ProfilePage()),
    // ... etc
  ],
);
```

**Important:** Make sure `ClientConfig.successRoute` matches your home route path!

---

### Scenario C: With Splash Screen

*"I need that beautiful branding moment when my app opens!"*

If your app has a splash screen that shows before auth:

```dart
final _router = GoRouter(
  initialLocation: '/splash',  // Start at splash
  routes: [
    // 1. Splash screen (first thing user sees)
    GoRoute(
      path: '/splash',
      builder: (context, state) => const SplashScreen(),
    ),
    
    // 2. Auth check (splash navigates here)
    GoRoute(
      path: '/',
      builder: (context, state) => AuthWrapper(
        home: const HomePage(),
      ),
    ),
    
    // 3. Home route
    GoRoute(
      path: '/home',
      builder: (context, state) => const HomePage(),
    ),
    
    // 4. Auth routes
    ...getAuthRoutes(),
  ],
);
```

**Your SplashScreen should:**

```dart
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _navigateAfterDelay();
  }

  Future<void> _navigateAfterDelay() async {
    await Future.delayed(const Duration(seconds: 2));
    if (mounted) {
      context.go('/');  // Go to AuthWrapper after splash
    }
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(child: YourSplashContent()),
    );
  }
}
```

---

### Scenario D: With Bottom Navigation Bar

*"My app has tabs at the bottom. Don't mess with my tabs!"*

If your app uses a bottom navigation bar after login:

```dart
final _router = GoRouter(
  initialLocation: '/',
  routes: [
    // Auth wrapper at root
    GoRoute(
      path: '/',
      builder: (context, state) => AuthWrapper(
        home: const MainShell(),  // Your shell with bottom nav
      ),
    ),
    
    // Shell route for bottom navigation (after login)
    ShellRoute(
      builder: (context, state, child) => MainShell(child: child),
      routes: [
        GoRoute(path: '/home', builder: (_, __) => const HomeTab()),
        GoRoute(path: '/search', builder: (_, __) => const SearchTab()),
        GoRoute(path: '/profile', builder: (_, __) => const ProfileTab()),
      ],
    ),
    
    // Auth routes (these show fullscreen, not inside shell)
    ...getAuthRoutes(),
  ],
);
```

**Your MainShell widget:**

```dart
class MainShell extends StatefulWidget {
  final Widget? child;
  const MainShell({super.key, this.child});

  @override
  State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: widget.child ?? const HomeTab(),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() => _currentIndex = index);
          switch (index) {
            case 0: context.go('/home');
            case 1: context.go('/search');
            case 2: context.go('/profile');
          }
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.search), label: 'Search'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }
}
```

**Important:** Update `ClientConfig.successRoute` to match your first tab:
```dart
static const String successRoute = '/home';
```

---

### Scenario E: With Both Splash AND Bottom Navigation

*"I want the splash AND the tabs. Give me everything!"*

Combine the approaches:

```dart
final _router = GoRouter(
  initialLocation: '/splash',
  routes: [
    // 1. Splash screen
    GoRoute(
      path: '/splash',
      builder: (context, state) => const SplashScreen(),
    ),
    
    // 2. Auth wrapper
    GoRoute(
      path: '/',
      builder: (context, state) => AuthWrapper(
        home: const MainShell(),
      ),
    ),
    
    // 3. Bottom nav shell
    ShellRoute(
      builder: (context, state, child) => MainShell(child: child),
      routes: [
        GoRoute(path: '/home', builder: (_, __) => const HomeTab()),
        GoRoute(path: '/search', builder: (_, __) => const SearchTab()),
        GoRoute(path: '/profile', builder: (_, __) => const ProfileTab()),
      ],
    ),
    
    // 4. Auth routes
    ...getAuthRoutes(),
  ],
);
```

You've got it all now! 🏆

---

### Scenario F: Handling Deep Links (Password Reset)

*"My users will click password reset links from their email!"*

For Firebase/Supabase password reset email links:

```dart
final _router = GoRouter(
  initialLocation: '/',
  
  // Handle deep links
  redirect: (context, state) {
    final uri = state.uri;
    
    // Check if this is a password reset deep link
    if (uri.queryParameters.containsKey('mode') && 
        uri.queryParameters['mode'] == 'resetPassword') {
      // Redirect to reset password screen with the token
      return '/reset-password?token=${uri.queryParameters['oobCode']}';
    }
    
    return null;  // No redirect
  },
  
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => AuthWrapper(home: const HomePage()),
    ),
    GoRoute(
      path: '/home',
      builder: (context, state) => const HomePage(),
    ),
    ...getAuthRoutes(),
  ],
);
```

**Platform configuration required:**

**Android** (`android/app/src/main/AndroidManifest.xml`):
```xml
<intent-filter>
  <action android:name="android.intent.action.VIEW"/>
  <category android:name="android.intent.category.DEFAULT"/>
  <category android:name="android.intent.category.BROWSABLE"/>
  <data android:scheme="https" android:host="your-domain.com"/>
</intent-filter>
```

**iOS** (`ios/Runner/Info.plist`):
```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>your-app-scheme</string>
    </array>
  </dict>
</array>
```

---

## Step 6: Understanding the Success Screen

The success screen shows different messages based on what action was completed. It's smart like that. 🧠

### How It Works

When navigating to the success screen, pass these query parameters:
- `action` - Determines which message to show
- `next` - Where to navigate after the success screen

### Available Actions

| Action Value | Title | Subtitle | Typical Next Route |
|--------------|-------|----------|-------------------|
| `login` | "Welcome Back!" | "You have logged in successfully" | `/home` |
| `register` | "Account Created!" | "Your account has been created successfully" | `/home` |
| `register_verify_email` | "Account Created!" | "Please verify your email before logging in" | `/login` |
| `password_reset` | "Password Changed!" | "Your password has been reset successfully" | `/login` |
| `forgot_password` | "Email Sent!" | "Password reset instructions have been sent" | `/login` |

### Example Navigation

```dart
// After login
context.go(
  Uri(
    path: ClientConfig.authSuccessPath,
    queryParameters: {
      'next': '/home',
      'action': 'login',
    },
  ).toString(),
);

// After registration (needs email verification)
context.go(
  Uri(
    path: ClientConfig.authSuccessPath,
    queryParameters: {
      'next': '/login',
      'action': 'register_verify_email',
    },
  ).toString(),
);
```

### Auto-Navigation Timing

The success screen auto-navigates to the `next` route after a configurable delay:

```dart
// In auth_config.dart
static const int successScreenAutoNavSeconds = 3;
```

---

## Step 7: Choose Your Backend

The kit is backend-agnostic. It doesn't care! Use whatever you want:

| Backend | Best For | Setup Complexity |
|---------|----------|------------------|
| **Mock** | Testing/Demo | None (instant!) |
| **Firebase** | Google ecosystem | Medium |
| **Supabase** | Open-source BaaS | Medium |
| **REST API** | Custom backend | Varies |

### Quick Backend Setup

**Mock (Default - for testing):**
```dart
AuthService.instance.configure(MockAuthImplementation());
```

**Firebase:**
```dart
await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
AuthService.instance.configure(FirebaseAuthImplementation());
```

**Supabase:**
```dart
await Supabase.initialize(url: 'YOUR_URL', anonKey: 'YOUR_KEY');
AuthService.instance.configure(SupabaseAuthImplementation());
```

**For complete backend setup instructions, see [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md).**

---

## Backend Integration & Customization

This section explains how to hook up your own backend if you aren't using the provided examples.

### The AuthInterface
The kit uses an abstract `AuthInterface` to talk to your backend. You must implement this interface.

```dart
abstract class AuthInterface {
  Stream<UserEntity?> get authStateChanges;
  UserEntity? get currentUser;
  Future<AuthResult<UserEntity?>> login({required String email, required String password});
  Future<AuthResult<UserEntity?>> register({
    required String email, 
    required String password, 
    required String name, 
    dynamic avatarImage
  });
  // ... and others
}
```

### Password Reset Flow
The kit supports two types of password reset flows:
1. **Link-based (Firebase/Supabase)**: The user clicks a link in their email which opens the app.
   - **Configuration**: Set `useOtpPage = false` in `auth_config.dart`.
   - **Deep Link**: The router acts on `reset-password?token=XYZ` and passes the token to the screen.
   - **Backend**: Your `resetPassword` implementation receives the `token` argument.

2. **OTP-based (Custom)**: The user receives a code via email/SMS.
   - **Configuration**: Set `useOtpPage = true` in `auth_config.dart`.
   - **UI**: The user enters the code manually.
   - **Backend**: You implement `verifyOtp` validation.

### Switching Backends
To switch backends, simply change the configuration in your `main.dart` **before** `runApp`:

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // 1. Initialize your SDK (if needed)
  await Firebase.initializeApp(...); 
  
  // 2. Configure AuthService
  AuthService.instance.configure(FirebaseAuthImplementation());
  
  runApp(const MyApp());
}
```

---

## Accessing User Data

After login, access the current user anywhere in your app:

```dart
import 'onfinty_auth/backend/auth_service.dart';

// Get current user (synchronous)
final user = AuthService.instance.currentUser;
print('Name: ${user?.name}');
print('Email: ${user?.email}');
print('Avatar: ${user?.photoUrl}');


// Listen to auth changes (reactive)
StreamBuilder<UserEntity?>(
  stream: AuthService.instance.authStateChanges,
  builder: (context, snapshot) {
    if (snapshot.hasData) {
      return Text('Hello ${snapshot.data!.name}');
    }
    return const Text('Not logged in');
  },
);
```

## 🧠 Managing User Data (The Pro Way)

Okay, so `AuthService.instance.currentUser` is cool, but you know what's cooler? having a butler who holds your user's coat and remembers their name for you.

We created a shiny new **`UserDataManager`** class just for you. It's like a backpack for your user's data—it automatically fills up when they login and empties itself when they logout (so no awkward "Hey... who are you again?" moments).

**How to use it:**

1. **Initialize it** in your `main.dart` (right after `AuthService`):
   ```dart
   AuthService.instance.configure(YourBackend());
   UserDataManager.instance.initialize(); // <--- Wake up the butler!
   ```

2. **Use it anywhere** without async awaiting or stream building:
   ```dart
   Text("Welcome back, ${UserDataManager.instance.displayName}!");
   
   if (UserDataManager.instance.isLoggedIn) {
      // Do secret member stuff
   }
   ```

It's located in `lib/onfinty_auth/backend/user_data_manager.dart`. Feel free to add more stuff to it, like `userPoints`, `subscriptionLevel`, or `favoriteFlavorOfIceCream`. It's your backpack now! 🎒

---

---

## Logout Implementation

```dart
import 'package:go_router/go_router.dart';
import 'onfinty_auth/backend/auth_service.dart';
import 'onfinty_auth/auth_config.dart';

// In your logout button:
ElevatedButton(
  onPressed: () async {
    await AuthService.instance.logout();
    context.go('/');  // Returns to AuthWrapper which shows WelcomeScreen
  },
  child: const Text('Logout'),
);
```

---

## 🧪 Testing (NEW in v1.7.0!)

The Auth UI Kit is designed with testability in mind. Here's how to test your auth flows:

### Setting Up Tests

Use `AuthService.instance.reset()` in your test teardown to ensure clean state between tests:

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:your_app/onfinty_auth/backend/auth_service.dart';

void main() {
  tearDown(() {
    // Clean up AuthService after each test
    AuthService.instance.reset();
  });

  test('login should work with valid credentials', () async {
    // Configure with a test mock
    AuthService.instance.configure(YourTestMockImplementation());
    
    final result = await AuthService.instance.login(
      email: 'test@example.com',
      password: 'password123',
    );
    
    expect(result.success, isTrue);
  });
}
```

### Creating Test Mocks

Implement `AuthInterface` for your test scenarios:

```dart
class TestMockImplementation implements AuthInterface {
  bool loginCalled = false;
  AuthResult<UserEntity?>? nextResult;
  
  @override
  Future<AuthResult<UserEntity?>> login({
    required String email,
    required String password,
  }) async {
    loginCalled = true;
    return nextResult ?? AuthResult.success(null);
  }
  
  // ... implement other methods ...
  
  @override
  void dispose() {}
}
```

### Running Existing Tests

The kit comes with pre-built tests:

```bash
# Run all unit tests
flutter test lib/onfinty_auth/test/unit/

# Run specific test file
flutter test lib/onfinty_auth/test/unit/auth_service_test.dart
```

---

## 🧹 Disposal & Cleanup

### AuthService Lifecycle

The `AuthService` properly disposes backends when reconfigured:

```dart
// Old backend is automatically disposed when you reconfigure
AuthService.instance.configure(newBackend);
```

### Custom Backend Disposal

If you implement a custom backend, make sure to close any streams or controllers:

```dart
class MyBackend implements AuthInterface {
  final _authController = StreamController<UserEntity?>.broadcast();
  
  @override
  void dispose() {
    _authController.close(); // Always close your streams!
  }
}
```

### When to Call Reset

Use `reset()` only in testing:

```dart
// ✅ Good: In test tearDown
tearDown(() {
  AuthService.instance.reset();
});

// ❌ Bad: In production code (just reconfigure instead)
// AuthService.instance.reset();
```

---

## Troubleshooting

### "AuthService not configured!"
**Cause:** `AuthService.instance.configure()` wasn't called before use.
**Fix:** Add it to `main()` before `runApp()`.

### Navigation issues after login
**Cause:** `ClientConfig.successRoute` doesn't match your router.
**Fix:** Ensure the route exists in your GoRouter configuration.

### Success screen shows wrong message
**Cause:** Wrong `action` parameter passed.
**Fix:** Use one of: `login`, `register`, `register_verify_email`, `password_reset`, `forgot_password`.

### Logo not showing
**Cause:** Asset not registered or wrong path.
**Fix:** Check:
1. Image is in `assets/images/`
2. Path in `pubspec.yaml` matches
3. `logoPath` in `auth_config.dart` is correct

### Theme colors not applying
**Cause:** `AppTheme.getTheme()` not being used.
**Fix:** Ensure your MaterialApp uses: `theme: AppTheme.getTheme(ClientConfig.defaultLocale)`

---

## Customization Reference

### Available Themes

**Light Themes:**
- `AppThemeType.cosmic` - Purple/blue/pink gradients
- `AppThemeType.ocean` - Blue/teal tones
- `AppThemeType.nature` - Green/earth tones
- `AppThemeType.sunset` - Orange/red warmth
- `AppThemeType.royal` - Purple/gold luxury
- `AppThemeType.midnight` - Dark blue/purple
- `AppThemeType.minimal` - Clean black/white

**Dark Variants:** *(NEW in 1.6.7!)*
- `AppThemeType.cosmicDark` - Deep space purple
- `AppThemeType.oceanDark` - Midnight sea
- `AppThemeType.natureDark` - Forest at dusk
- `AppThemeType.sunsetDark` - Ember glow
- `AppThemeType.royalDark` - Throne room elegance
- `AppThemeType.midnightDark` - Classic dark mode ⭐ (default)
- `AppThemeType.minimalDark` - Sleek and simple

### Available Backgrounds
- `AuthBackgroundStyle.mesh` - Aurora gradient waves
- `AuthBackgroundStyle.orbs` - Floating glass spheres
- `AuthBackgroundStyle.geometric` - Abstract 3D shapes
- `AuthBackgroundStyle.galactic` - Deep space with stars
- `AuthBackgroundStyle.particles` - Floating stardust
- `AuthBackgroundStyle.nebula` - Dreamy cloud formations
- `AuthBackgroundStyle.grid` - Retro-wave cyber grids

### Available Languages
English (`en`), Arabic (`ar`), Spanish (`es`), French (`fr`), Chinese (`zh`), Hindi (`hi`), German (`de`)

---

## 🎊 Congratulations!

You've made it to the end! You now have access to **117,649** unique authentication experiences:

> 7 Themes × 7 Languages × 7 Backgrounds × 7 Welcome Layouts × 7 Login Layouts × 7 Register Layouts = **Pure Magic** ✨

Go forth and build something amazing! And remember, if your app's auth screen looks boring, that's on you now—not us. 😎

---

## Need More Help?

- **Backend Setup:** [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md)
- **Change Log:** [CHANGELOG.md](CHANGELOG.md)
- **Code Examples:** `lib/onfinty_auth/backend/auth_backend_examples.dart`

---

*Made with ❤️ (and probably too much coffee ☕) by OnFiNtY*
