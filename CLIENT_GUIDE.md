# 📘 Client Guide - OnFiNtY Auth UI Kit

Welcome! You just bought (or are evaluating) the **OnFiNtY Auth UI Kit**, and you're probably thinking: "Okay, this looks cool, but how do I actually USE it in my app?"

Great question! This guide will walk you through everything from the moment you download the kit to the moment you're sipping coffee while watching your users sign in with style. ☕

## 📚 Table of Contents

- [What You Just Got](#what-you-just-got)
- [Getting Started](#getting-started)
  - [Step 1: Add the Kit to Your Project](#step-1-add-the-kit-to-your-project)
  - [Step 2: Install Dependencies](#step-2-install-dependencies)
  - [Step 3: Set Up Your main.dart](#step-3-set-up-your-maindart)
  - [Step 4: Choose Your Backend](#step-4-choose-your-backend)
- [Customization Guide](#customization-guide)
- [Understanding the Structure](#understanding-the-structure)
- [Adding a Backend (The Complete Story)](#adding-a-backend-the-complete-story)
- [Tips, Tricks & Best Practices](#tips-tricks--best-practices)

---

## What You Just Got

This isn't just a login screen. You got:

- ✨ **8 Premium Screens**: Welcome, Login, Register, Forgot Password, OTP, Reset Password, Success, Error
- 🎨 **7 Glassmorphic Themes**: Cosmic, Ocean, Nature, Sunset, Royal, Midnight, Minimal
- 🌍 **Multi-language Support**: English and Arabic (easily extensible)
- 🔌 **Backend-Agnostic Architecture**: Works with Firebase, Supabase, REST APIs, or your custom backend
- 📱 **Responsive Design**: Looks gorgeous on all screen sizes
- 🎭 **Smooth Animations**: Flutter Animate for buttery transitions
- 🔒 **Production-Ready**: Error handling, validation, session management included

Think of it as a complete authentication experience in a box. All you need to do is plug in your backend. Speaking of which...

---

## Getting Started

### Step 1: Add the Kit to Your Project

You have two options:

#### Option A: Copy the `onfinty_auth` folder

1. Open the kit folder you downloaded
2. Navigate to `lib/onfinty_auth/`
3. Copy the entire `onfinty_auth` folder
4. Paste it into your project's `lib/` directory

Your project structure should look like:
```
my_app/
├── lib/
│   ├── main.dart
│   ├── onfinty_auth/        ← The magic folder
│   │   ├── screens/
│   │   ├── widgets/
│   │   ├── models/
│   │   ├── l10n/
│   │   ├── auth_interface.dart
│   │   ├── auth_service.dart
│   │   ├── auth_backend_examples.dart
│   │   ├── auth_config.dart
│   │   ├── auth_theme.dart
│   │   ├── ...
```

#### Option B: Use it as a module (Advanced)

If you want to keep it separate, you can set it up as a local package. But let's be honest - Option A is easier. 😉

---

### Step 2: Install Dependencies

Open your `pubspec.yaml` and add these dependencies:

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # Core dependencies (REQUIRED)
  go_router: ^13.2.0              # Navigation
  flutter_screenutil: ^5.9.0      # Responsive design
  flutter_animate: ^4.5.0         # Animations
  google_fonts: ^6.1.0            # Typography
  lucide_icons: ^0.257.0          # Icons
  intl: ^0.20.2                   # Internationalization
  
  # Localization (REQUIRED)
  flutter_localizations:
    sdk: flutter
  
  # Image picker (REQUIRED for avatar uploads)
  image_picker: ^1.2.1

  # Add ONE of these backend packages (or none if using custom REST API):
  
  # For Firebase:
  # firebase_core: ^4.3.0
  # firebase_auth: ^6.1.3
  # firebase_storage: ^13.0.5      # Optional: for avatar uploads
  
  # For Supabase:
  # supabase_flutter: ^2.12.0
```

**Then run:**
```bash
flutter pub get
```

☕ Grab a coffee while it downloads. This might take a minute.

---

### Step 3: Set Up Your main.dart

Here's where the magic starts! Open (or create) your `lib/main.dart` file.

#### 🎯 The Minimal Setup (Using Mock Backend)

Start here if you just want to see the UI in action:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:go_router/go_router.dart';

// Auth Kit imports
import 'onfinty_auth/l10n/app_localization.dart';
import 'onfinty_auth/auth_backend_examples.dart';
import 'onfinty_auth/auth_router.dart';
import 'onfinty_auth/auth_theme.dart';
import 'onfinty_auth/auth_config.dart';
import 'onfinty_auth/auth_service.dart';
import 'onfinty_auth/auth_wrapper.dart';
import 'onfinty_auth/models/user_entity.dart';

void main() async {
  // 1. Initialize Flutter bindings
  WidgetsFlutterBinding.ensureInitialized();

  // 2. Configure Auth Service with Mock backend (for testing)
  AuthService.instance.configure(MockAuthImplementation());

  // 3. Run your app
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(375, 812), // Base design size
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (_, child) {
        return MaterialApp.router(
          title: ClientConfig.appName,
          theme: AppTheme.getTheme(ClientConfig.defaultLocale),
          debugShowCheckedModeBanner: false,

          // Router configuration
          routerConfig: GoRouter(
            initialLocation: '/',
            routes: [
              GoRoute(
                path: '/',
                builder: (context, state) => AuthWrapper(
                  home: const HomePage(), // Your home screen
                ),
              ),
              ...getAuthRoutes(), // Auth screens (login, register, etc.)
            ],
          ),

          // Localization
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

// Simple home page (replace with your actual home screen)
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final UserEntity? user = AuthService.instance.currentUser;

    return Scaffold(
      appBar: AppBar(title: const Text("Home")),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                "Welcome, ${user?.name ?? 'Guest'}!",
                style: Theme.of(context).textTheme.headlineMedium,
              ),
              const SizedBox(height: 16),
              Text("Email: ${user?.email ?? 'N/A'}"),
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: () {
                  AuthService.instance.logout();
                  context.go('/'); // Redirects to auth wrapper
                },
                child: const Text("Logout"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

**Run it!**
```bash
flutter run
```

🎉 **Boom!** You should see the auth UI. Try logging in with any email (except ones with "error" in them).

---

### Step 4: Choose Your Backend

The Mock backend is great for testing, but for production, you'll want a real backend.

You have several options:

1. **Firebase** - Google's BaaS (Backend as a Service)
2. **Supabase** - Open-source Firebase alternative
3. **Custom REST API** - Your own backend
4. **Build Your Own** - Connect to anything!

**See the [Backend Integration Guide](BACKEND_INTEGRATION.md) for complete instructions on each option.**

Here's a quick preview of what changes in `main.dart` for each:

#### Firebase Setup

```dart
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart'; // Generated by flutterfire configure
import 'backend/firebase_auth_implementation.dart'; // You'll create this

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Firebase
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  
  // Configure with Firebase backend
  AuthService.instance.configure(FirebaseAuthImplementation());
  
  runApp(const MyApp());
}
```

> **First-time Firebase setup?** Run `flutterfire configure` in terminal and follow the prompts. It'll create `firebase_options.dart` for you.

#### Supabase Setup

```dart
import 'package:supabase_flutter/supabase_flutter.dart';
import 'backend/supabase_auth_implementation.dart'; // You'll create this

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Supabase
  await Supabase.initialize(
    url: 'https://your-project.supabase.co',
    anonKey: 'your-anon-key-here',
  );
  
  // Configure with Supabase backend
  AuthService.instance.configure(SupabaseAuthImplementation());
  
  runApp(const MyApp());
}
```

> Get your URL and anon key from: Supabase Dashboard → Your Project → Settings → API

#### Custom REST API Setup

```dart
import 'backend/rest_api_auth_implementation.dart'; // You'll create this

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // No initialization needed - just configure
  AuthService.instance.configure(RestApiAuthImplementation());
  
  runApp(const MyApp());
}
```

**For complete backend setup instructions, see [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md)** - it has step-by-step guides with code examples!

---

## Customization Guide

### 🎨 Changing the Theme

Open `lib/onfinty_auth/auth_config.dart`:

```dart
class ClientConfig {
  // Change this to any of the 7 available themes
  static const AppThemeType themeType = AppThemeType.midnight;
  
  // Available themes:
  // - AppThemeType.cosmic (purple/blue/pink gradients)
  // - AppThemeType.ocean (blue/teal)
  // - AppThemeType.nature (green/earth tones)
  // - AppThemeType.sunset (orange/red)
  // - AppThemeType.royal (purple/gold)
  // - AppThemeType.midnight (dark blue/purple)
  // - AppThemeType.minimal (clean black/white)
}
  
### 🎥 Changing the Background Style

Want a different vibe? You can switch between 3 professional animation styles:

```dart
class ClientConfig {
  // Choose your animation style
  static const AuthBackgroundStyle backgroundStyle = AuthBackgroundStyle.mesh;
  
  // Options:
  // - AuthBackgroundStyle.mesh (Aurora-like gradients, very trendy)
  // - AuthBackgroundStyle.orbs (Floating glass spheres with depth)
  // - AuthBackgroundStyle.geometric (Abstract 3D-like shapes)
}
```
```

### 📝 Customizing Text

Want to change "Welcome" to "Hello there!"? Easy!

```dart
class ClientConfig {
  // Custom welcome screen text
  static const Map<String, String>? customWelcomeTitle = {
    'en': 'Hello there!',
    'ar': 'أهلاً بك!',
  };

  static const Map<String, String>? customWelcomeSubtitle = {
    'en': 'Login to continue using MyApp',
  };
  
  // You can also customize login and register subtitles
  static const Map<String, String>? customLoginSubtitle = {
    'en': 'Enter your credentials to get started',
  };
}
```

### 🖼️ Adding Your Logo

1. Add your logo to your assets:
   ```
   my_app/
   ├── assets/
   │   ├── images/
   │   │   ├── logo.png  ← Your logo here
   ```

2. Update `pubspec.yaml`:
   ```yaml
   flutter:
     assets:
       - assets/images/logo.png
   ```

3. Configure in `auth_config.dart`:
   ```dart
   class ClientConfig {
     static const String? logoPath = 'assets/images/logo.png';
     
     // Customize logo size per screen
     static const double welcomeLogoWidth = 120;
     static const double welcomeLogoHeight = 120;
     
     static const double loginLogoWidth = 80;
     static const double loginLogoHeight = 80;
     
     // ... and so on for other screens
   }
   ```

### ⚙️ Behavior Settings

```dart
class ClientConfig {
  // Show errors while user is typing?
  static const bool enableRealTimeValidation = true;
  
  // Use OTP page for password reset?
  // (Set to false for Firebase/Supabase - they use email links)
  static const bool useOtpPage = false;
  
  // How long until user can resend OTP?
  static const int otpResendSeconds = 30;
  
  // Auto-navigate after success?
  static const int successScreenAutoNavSeconds = 3;
  
  // Your app name
  static const String appName = "MyAwesomeApp";
  
  // Show app name in welcome screen?
  static const bool showAppNameInWelcome = true;

  // ----------------------------------
  // SOCIAL LOGIN OPTIONALITY
  // ----------------------------------
  
  // Toggle social providers on/off:
  static const bool enableGoogleSignIn = true;
  static const bool enableFacebookSignIn = true;
  static const bool enableAppleSignIn = false;
}
```

### 🌍 Adding Another Language

Unlike many Flutter apps, this kit uses a **custom Map-based localization system** - not ARB files. This gives you complete control without code generation!

#### Step 1: Open the Localization File
Navigate to `lib/onfinty_auth/core/l10n/app_localization.dart`.

#### Step 2: Add Your Locale
Add your new locale to the `supportedLocales` list:

```dart
static const List<Locale> supportedLocales = [
  Locale('en'),
  Locale('ar'),
  Locale('es'),
  Locale('ja'),  // ← Add your new language
];
```

#### Step 3: Add Translations
Add your translations to the `_localizedValues` map:

```dart
'ja': {
  'welcomeTitle': 'お帰りなさい',
  'loginButton': 'ログイン',
  'email': 'メール',
  // ... translate all keys following the English pattern
},
```

#### Step 4: Update Theme (Optional)
If your language needs a specific font (like Japanese or Chinese), update `lib/onfinty_auth/core/theme/auth_theme.dart`:

```dart
case 'ja':
  return GoogleFonts.notoSansJP();
```

That's it! No code generation needed.

---

## Understanding the Structure

Let's demystify what's in the `onfinty_auth` folder:

```
onfinty_auth/
├── auth_config.dart          ← Your customization hub (stays at root!)
│
├── core/                      ← Core utilities and infrastructure
│   ├── theme/
│   │   ├── auth_theme.dart
│   │   └── auth_colors.dart
│   ├── router/
│   │   ├── auth_router.dart
│   │   └── auth_wrapper.dart
│   ├── utils/
│   │   └── auth_validators.dart
│   └── l10n/
│       └── app_localization.dart
│
├── backend/                   ← Backend integration
│   ├── auth_interface.dart
│   ├── auth_service.dart
│   └── auth_backend_examples.dart
│
├── models/                    ← Data models
│   └── user_entity.dart
│
├── screens/                   ← UI screens
│   ├── auth_welcome_screen.dart
│   ├── auth_login_screen.dart
│   ├── auth_register_screen.dart
│   ├── auth_forgot_password_screen.dart
│   ├── auth_otp_verification_screen.dart
│   ├── auth_reset_password_screen.dart
│   ├── auth_success_screen.dart
│   └── auth_error_screen.dart
│
├── widgets/                   ← Reusable UI components
│   ├── auth_scaffold.dart
│   ├── auth_button.dart
│   ├── auth_glass_card.dart
│   ├── auth_text_field.dart
│   └── ...
│
└── CHANGELOG.md
```

**What you'll typically modify:**
- ✏️ `auth_config.dart` - All your customizations
- ✏️ Create backend implementations (Firebase, Supabase, etc.)
- ✏️ Localization files if adding languages

**What you probably won't touch:**
- 🔒 `screens/` - Pre-built UI
- 🔒 `widgets/` - Reusable components
- 🔒 `auth_interface.dart` - The contract
- 🔒 `auth_service.dart` - The singleton

---

## Adding a Backend (The Complete Story)

Alright, let's say you want to use **Firebase**. Here's the complete journey from zero to hero:

### 🔥 Firebase Complete Setup

#### Part 1: Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or select existing)
3. Add your app:
   - Click "Add app" → Choose platform (iOS/Android/Web)
   - Follow platform-specific steps
   - Download config files:
     - Android: `google-services.json` → `android/app/`
     - iOS: `GoogleService-Info.plist` → `ios/Runner/`

#### Part 2: Enable Authentication

1. In Firebase Console → Authentication
2. Click "Get Started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password"
5. (Optional) Enable Google, Facebook, Apple for social auth

#### Part 3: Set Up Storage (for avatars)

1. Firebase Console → Storage
2. Click "Get Started"
3. Start in production mode (we'll add rules next)
4. Choose a location close to your users
5. Go to "Rules" tab and add:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

6. Click "Publish"

#### Part 4: Flutter Dependencies

Add to `pubspec.yaml`:
```yaml
dependencies:
  firebase_core: ^4.3.0
  firebase_auth: ^6.1.3
  firebase_storage: ^13.0.5
```

Run:
```bash
flutter pub get
```

#### Part 5: FlutterFire CLI Setup

```bash
# Install FlutterFire CLI (one-time)
dart pub global activate flutterfire_cli

# Configure your project
flutterfire configure
```

This creates `lib/firebase_options.dart` automatically. Select your platforms and Firebase project when prompted.

#### Part 6: Create Backend Implementation

Create `lib/backend/firebase_auth_implementation.dart`:

**You can copy the complete code from `lib/onfinty_auth/auth_backend_examples.dart` (line 186+)** or from the [Backend Integration Guide](BACKEND_INTEGRATION.md).

#### Part 7: Update main.dart

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

#### Part 8: Configure Auth Settings

In `lib/onfinty_auth/auth_config.dart`:

```dart
class ClientConfig {
  static const bool useOtpPage = false; // Firebase uses email links
  
  // Add your app name
  static const String appName = "Your App Name";
}
```

#### Part 9: Test!

```bash
flutter run
```

Try:
1. Creating an account
2. Uploading an avatar
3. Logging out
4. Logging back in
5. Password reset

**Check Firebase Console → Authentication → Users** to see your registered users!

---

### 💙 Supabase Complete Setup

#### Part 1: Supabase Project Setup

1. Go to [Supabase.com](https://supabase.com/)
2. Create new project
3. Wait for database to spin up (grab a coffee ☕)
4. Go to Settings → API
5. Copy:
   - Project URL (looks like `https://xxxxx.supabase.co`)
   - Anon/Public key (the `anon` `public` key)

#### Part 2: Enable Email Auth

1. Go to Authentication → Providers
2. Email provider should be enabled by default
3. Scroll down to "Email Templates" if you want to customize reset emails

#### Part 3: Set Up Storage

1. Go to Storage
2. Create new bucket named `avatars`
3. Make it **public**
4. Go to Policies and add:

**Read Policy:**
```sql
CREATE POLICY "Public avatars viewable"
ON storage.objects FOR SELECT
USING ( bucket_id = 'avatars' );
```

**Write Policy:**
```sql
CREATE POLICY "Users upload own avatar"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'avatars' );
```

#### Part 4: Flutter Dependencies

```yaml
dependencies:
  supabase_flutter: ^2.12.0
```

```bash
flutter pub get
```

#### Part 5: Create Backend Implementation

Create `lib/backend/supabase_auth_implementation.dart`

**Copy the complete code from the [Backend Integration Guide](BACKEND_INTEGRATION.md) or from `auth_backend_examples.dart`** (line 378+).

#### Part 6: Update main.dart

```dart
import 'package:supabase_flutter/supabase_flutter.dart';
import 'backend/supabase_auth_implementation.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  await Supabase.initialize(
    url: 'https://your-project.supabase.co',  // Your URL from Step 1
    anonKey: 'your-anon-key-here',            // Your anon key from Step 1
  );
  
  AuthService.instance.configure(SupabaseAuthImplementation());
  
  runApp(const MyApp());
}
```

#### Part 7: Configure Settings

```dart
class ClientConfig {
  static const bool useOtpPage = false; // Supabase uses email links
  static const String appName = "Your App Name";
}
```

#### Part 8: Test!

Same testing steps as Firebase!

---

### 🌐 Custom REST API Setup

#### Part 1: Understand Your API

You need endpoints for:
- `POST /auth/login` - Returns user + token
- `POST /auth/register` - Creates user, returns user + token
- `POST /auth/logout` - Invalidates token
- `POST /auth/forgot-password` - Sends reset email
- `POST /auth/reset-password` - Resets password with token
- `POST /auth/verify-otp` - Verifies OTP code (optional)

#### Part 2: Add HTTP Package

```yaml
dependencies:
  http: ^1.2.0
```

```bash
flutter pub get
```

#### Part 3: Create Implementation

Create `lib/backend/rest_api_auth_implementation.dart`

**Get the complete template from [Backend Integration Guide](BACKEND_INTEGRATION.md)** (Option 4).

Customize the endpoints and response parsing to match YOUR API.

#### Part 4: Update main.dart

```dart
import 'backend/rest_api_auth_implementation.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  AuthService.instance.configure(RestApiAuthImplementation());
  
  runApp(const MyApp());
}
```

#### Part 5: Handle Token Storage

You'll probably want to persist the auth token. Add:

```yaml
dependencies:
  shared_preferences: ^2.2.2
  # OR for more security:
  flutter_secure_storage: ^9.0.0
```

And update your implementation to save/load tokens on app restart.

---

---

## 👤 Retrieving User Data

Once a user is logged in, you can access their information easily.

### The UserEntity Model
```dart
class UserEntity {
  final String id;           // Unique user ID
  final String? email;       // User's email
  final String? name;        // User's display name
  final String? photoUrl;    // Avatar URL
  final Map<String, dynamic>? metadata;  // Additional data
}
```

### Getting Current User (Synchronous)

```dart
import 'onfinty_auth/backend/auth_service.dart';

// Anywhere in your app:
final user = AuthService.instance.currentUser;

if (user != null) {
  print('Name: ${user.name}');
  print('Avatar: ${user.photoUrl}');
}
```

### Listening to Auth State Changes (Reactive)

```dart
StreamBuilder<UserEntity?>(
  stream: AuthService.instance.authStateChanges,
  builder: (context, snapshot) {
    if (snapshot.hasData) {
      return Text('Welcome ${snapshot.data!.name}');
    }
    return Text('Please log in');
  },
);
```

---

## 🧭 Integrating with Your Existing Go Router

Already have a Go Router setup? Here's how to add the auth routes.

### Method 1: Using `getAuthRoutes()` (Recommended)

```dart
import 'onfinty_auth/core/router/auth_router.dart';
import 'onfinty_auth/core/router/auth_wrapper.dart';

final router = GoRouter(
  initialLocation: '/',
  routes: [
    // Your auth entry point
    GoRoute(
      path: '/',
      builder: (context, state) => AuthWrapper(
        home: const HomePage(),  // Your main app screen
      ),
    ),
    
    // Add all auth routes
    ...getAuthRoutes(),
    
    // Your existing routes...
  ],
);
```

### Method 2: Manual Route Integration

If you want custom paths, define them manually and update `ClientConfig`:

```dart
// onfinty_auth/auth_config.dart
static const String loginPath = '/my-custom-login';
```

---

## 🚀 Adding a Splash Screen

Want a splash screen before auth?

### Step 1: Create Your Splash Screen
```dart
class SplashScreen extends StatefulWidget { ... }
// In initState, wait 2 seconds, then:
context.go('/'); 
```

### Step 2: Update Router
```dart
final router = GoRouter(
  initialLocation: '/splash',  // Start here
  routes: [
    GoRoute(path: '/splash', builder: (_,__) => const SplashScreen()),
    GoRoute(path: '/', builder: (_,__) => AuthWrapper(home: HomePage())),
    ...getAuthRoutes(),
  ],
);
```

---

## Tips, Tricks & Best Practices

### 🎯 Pro Tips

**1. Start with Mock, switch to real backend later**
```dart
// Development
AuthService.instance.configure(MockAuthImplementation());

// Production
AuthService.instance.configure(FirebaseAuthImplementation());
```

**2. Use environment variables for API keys**

Don't commit your Firebase config or Supabase keys! Use `--dart-define`:

```bash
flutter run --dart-define=SUPABASE_URL=https://xxx.supabase.co --dart-define=SUPABASE_KEY=xxx
```

Access in code:
```dart
const supabaseUrl = String.fromEnvironment('SUPABASE_URL');
const supabaseKey = String.fromEnvironment('SUPABASE_KEY');
```

**3. Customize validation rules**

Edit `lib/onfinty_auth/auth_validators.dart` if you need stricter password rules.

**4. Handle deep links for password reset**

If using Firebase/Supabase email links, configure deep linking:

Android: `android/app/src/main/AndroidManifest.xml`
iOS: `ios/Runner/Info.plist`

See Firebase/Supabase docs for platform-specific setup.

**5. Test error scenarios**

With Mock backend, try:
- Email containing "error" → Login fails
- Email containing "exists" → Registration fails
- OTP anything except "1234" → Fails

This helps you see how errors look in the UI.

### 🚫 Common Mistakes

**❌ Forgetting to call `AuthService.instance.configure()`**

You'll get: "AuthService not configured!"

✅ Always call it in `main()` before `runApp()`.

---

**❌ Initializing backend AFTER configuring AuthService**

```dart
// ❌ WRONG ORDER
AuthService.instance.configure(FirebaseAuthImplementation());
await Firebase.initializeApp(); // Too late!
```

```dart
// ✅ CORRECT ORDER
await Firebase.initializeApp(); // Initialize first
AuthService.instance.configure(FirebaseAuthImplementation()); // Then configure
```

---

**❌ Not setting `useOtpPage = false` for Firebase/Supabase**

Firebase and Supabase send email links for password reset, not OTP codes.

```dart
static const bool useOtpPage = false; // For Firebase/Supabase
```

---

**❌ Forgetting `flutter pub get` after adding dependencies**

Always run `flutter pub get` after editing `pubspec.yaml`!

---

**❌ Not handling session persistence**

The kit handles this for you! The `AuthWrapper` widget listens to auth state changes and redirects users automatically. Just make sure your router uses it:

```dart
GoRoute(
  path: '/',
  builder: (context, state) => AuthWrapper(
    home: const HomePage(),
  ),
),
```

### 🎨 Design Tips

**Match the kit's theme to your app:**

1. Pick a theme that complements your brand
2. The kit uses Google Fonts - make sure to use compatible typography
3. The glassmorphic effect looks best on gradient backgrounds

**Customize colors:**

While themes are pre-defined, you can edit `lib/onfinty_auth/auth_colors.dart` to fine-tune colors for any theme.

### 🔐 Security Best Practices

**1. Never store sensitive data in code**

Use environment variables or secure storage for:
- API keys
- Firebase config (especially API key)
- Supabase anon key
- Backend URLs

**2. Use HTTPS for custom APIs**

Always use `https://` for your REST API endpoints.

**3. Validate on backend too**

The kit validates on the frontend, but ALWAYS validate and sanitize on your backend too.

**4. Enable email verification**

For Firebase/Supabase, enable email verification in their consoles for added security.

**5. Set up proper storage rules**

The examples in [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) include secure storage rules. Use them!

---

## Need More Help?

### 📖 Documentation

- [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) - Detailed backend setup guides
- [CHANGELOG.md](CHANGELOG.md) - See what's new and what changed
- `lib/onfinty_auth/auth_backend_examples.dart` - Full code examples

### 🔍 Debugging

**Auth not working?**
1. Check console for errors
2. Verify `AuthService.instance.configure()` was called
3. Check backend initialization happened BEFORE configuring AuthService
4. Enable debug mode: `debugShowCheckedModeBanner: true` to see route errors

**UI looks weird?**
1. Make sure `ScreenUtilInit` wraps your `MaterialApp`
2. Check that Google Fonts package is installed
3. Try a different theme in `auth_config.dart`

**Avatar upload fails?**
1. Check storage bucket exists (Firebase Storage / Supabase Storage)
2. Verify storage rules allow writes
3. Check internet connection (sounds obvious, but... 😅)

### 💬 Support

If you purchased this kit, you should have access to support. Reach out to OnFiNtY for:
- Bug reports
- Feature requests
- Integration assistance

---

## Quick Command Reference

```bash
# Get dependencies
flutter pub get

# Clean build (if things are weird)
flutter clean
flutter pub get

# Run on specific device
flutter devices          # List devices
flutter run -d chrome    # Run on Chrome
flutter run -d macos     # Run on macOS

# Firebase setup
dart pub global activate flutterfire_cli
flutterfire configure

# Generate localizations (if you add languages)
flutter gen-l10n

# Build for production
flutter build apk        # Android
flutter build ios        # iOS
flutter build web        # Web
flutter build macos      # macOS
```

---

## What's Next?

You've got the kit integrated, backend connected, and users can now sign up! 🎉

Here are some next steps:

1. **Customize the design** - Make it match your brand
2. **Add social sign-in** - Implement Google/Facebook/Apple in your backend implementation
3. **Set up analytics** - Track auth events
4. **Add user profiles** - Extend `UserEntity` with more fields
5. **Build your app** - The auth is done, now focus on your awesome features!

---

**Congratulations!** 🎊 You've successfully integrated the OnFiNtY Auth UI Kit into your app. Your users are going to love how smooth and beautiful the auth experience is.

Now go build something amazing! 🚀

---

*Made with ❤️ by OnFiNtY*

*Questions? Check the documentation files or reach out for support!*
