# 🚦 Router Guide: Pick Your Poison!

*Navigation in Flutter is like choosing a pizza topping—everyone has strong opinions, and there's no universally "wrong" answer... unless you pick pineapple. Just kidding. Maybe.*

---

## 📚 Table of Contents

- [WTF is Routing Anyway?](#-wtf-is-routing-anyway)
- [Option 1: GoRouter (The "I Like Typing Less" Approach)](#-option-1-gorouter---the-default-choice)
- [Option 2: GetX (The "I Want It All" Approach)](#-option-2-getx---the-swiss-army-knife)
- [Option 3: Navigator 2.0 Manual (The "I Enjoy Suffering" Approach)](#-option-3-navigator-20---the-purist-path)
- [Which Should I Use?](#-which-should-i-use)
- [Troubleshooting](#-troubleshooting)

---

## 🤔 WTF is Routing Anyway?

Before we dive into the code, let's make sure we're on the same page.

**Routing** = How your app decides which screen to show when.

Think of it like a GPS for your app:
- User taps "Login" → Show LoginScreen
- User finishes registration → Show SuccessScreen → Then HomeScreen
- User hits the back button → Go back (duh)

**The Auth Kit needs to tell your app:**
> "Hey, when someone goes to `/login`, show this beautiful screen I made for you."

That's it. That's routing. You're now 50% of the way to a Medium article.

---

## 🎯 Option 1: GoRouter - The Default Choice

**GoRouter** is what this kit uses by default. It's maintained by the Flutter team (so it won't randomly disappear), has excellent documentation, and supports deep linking out of the box.

### Why GoRouter?
- ✅ URL-based routing (great for web and deep links)
- ✅ Type-safe navigation
- ✅ Official Flutter package
- ✅ Minimal boilerplate
- ✅ The kit works with it immediately

### Minimum Viable Setup (Copy This, We Won't Judge)

```dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

// Auth Kit Imports
import 'onfinty_auth/core/l10n/app_localization.dart';
import 'onfinty_auth/core/router/auth_router.dart';
import 'onfinty_auth/core/router/auth_wrapper.dart';
import 'onfinty_auth/core/theme/auth_theme.dart';
import 'onfinty_auth/auth_config.dart';
import 'onfinty_auth/backend/auth_service.dart';
import 'onfinty_auth/backend/auth_backend_examples.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Use Mock for testing, swap with Firebase/Supabase later
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
          
          // 👇 THE MAGIC HAPPENS HERE
          routerConfig: GoRouter(
            initialLocation: '/',
            routes: [
              // Root: Checks if user is logged in
              GoRoute(
                path: '/',
                builder: (context, state) => AuthWrapper(
                  home: const YourHomePage(), // 👈 Replace with YOUR home page
                ),
              ),
              
              // Auth routes from the kit (the fun stuff)
              ...getAuthRoutes(),
              
              // Add your OTHER app routes here
              // GoRoute(path: '/settings', builder: (_, __) => SettingsPage()),
            ],
          ),
          
          // Localization (don't touch unless you know what you're doing)
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

// Your actual home page (replace this!)
class YourHomePage extends StatelessWidget {
  const YourHomePage({super.key});
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("I'm Logged In! 🎉")),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            AuthService.instance.logout();
            context.go('/'); // Go back to auth check
          },
          child: const Text('Logout'),
        ),
      ),
    );
  }
}
```

### GoRouter Navigation Cheat Sheet

```dart
// Navigate to a route (replaces current screen in stack)
context.go('/login');

// Push a route (adds to stack, user can go back)
context.push('/register');

// Go back
context.pop();

// Navigate with query parameters
context.go('/auth-success?action=register&next=/home');

// Get query parameters
final action = GoRouterState.of(context).uri.queryParameters['action'];
```

### Adding a Splash Screen with GoRouter

```dart
final router = GoRouter(
  initialLocation: '/splash', // Start here
  routes: [
    GoRoute(
      path: '/splash',
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
      path: '/',
      builder: (context, state) => AuthWrapper(home: const HomePage()),
    ),
    ...getAuthRoutes(),
  ],
);

// In your SplashScreen:
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});
  
  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    // Wait 2 seconds then go to auth check
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) context.go('/');
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(child: Text('Your Logo Here ✨')),
    );
  }
}
```

---

## 🔮 Option 2: GetX - The Swiss Army Knife

**GetX** is the "I want state management, dependency injection, AND routing in one package" choice. It's loved by some, controversial to others. Like cilantro.

### Why GetX?
- ✅ Simple syntax
- ✅ No BuildContext needed for navigation
- ✅ Built-in state management
- ❌ Not officially supported by Flutter team
- ❌ Some devs have... *opinions*

### Step 1: Add GetX Dependency

```yaml
# pubspec.yaml
dependencies:
  get: ^4.6.6
```

### Step 2: Create GetX Routes for Auth Kit

Create a new file: `lib/routes/app_routes.dart`

```dart
import 'package:get/get.dart';
import '../onfinty_auth/screens/auth_welcome_screen.dart';
import '../onfinty_auth/screens/auth_login_screen.dart';
import '../onfinty_auth/screens/auth_register_screen.dart';
import '../onfinty_auth/screens/auth_forgot_password_screen.dart';
import '../onfinty_auth/screens/auth_otp_verification_screen.dart';
import '../onfinty_auth/screens/auth_reset_password_screen.dart';
import '../onfinty_auth/screens/auth_success_screen.dart';
import '../onfinty_auth/screens/auth_error_screen.dart';
import '../onfinty_auth/auth_config.dart';
import '../pages/home_page.dart'; // Your home page

class AppRoutes {
  // Route names (use these for navigation)
  static const welcome = '/welcome';
  static const login = '/login';
  static const register = '/register';
  static const forgotPassword = '/forgot-password';
  static const otpVerification = '/otp-verification';
  static const resetPassword = '/reset-password';
  static const authSuccess = '/auth-success';
  static const authError = '/auth-error';
  static const home = '/home';
  
  // The actual route definitions
  static final routes = [
    // Auth Kit Screens
    GetPage(
      name: welcome,
      page: () => const WelcomeScreen(),
      transition: Transition.fadeIn,
    ),
    GetPage(
      name: login,
      page: () => const LoginScreen(),
      transition: Transition.rightToLeft,
    ),
    GetPage(
      name: register,
      page: () => const RegisterScreen(),
      transition: Transition.rightToLeft,
    ),
    GetPage(
      name: forgotPassword,
      page: () => const ForgotPasswordScreen(),
      transition: Transition.rightToLeft,
    ),
    GetPage(
      name: otpVerification,
      page: () => const OtpVerificationScreen(),
      transition: Transition.rightToLeft,
    ),
    GetPage(
      name: resetPassword,
      page: () {
        // Get token from arguments
        final token = Get.arguments?['token'] as String?;
        return ResetPasswordScreen(token: token);
      },
      transition: Transition.rightToLeft,
    ),
    GetPage(
      name: authSuccess,
      page: () {
        final args = Get.arguments as Map<String, String?>?;
        return SuccessScreen(
          nextRoute: args?['next'],
          action: args?['action'],
        );
      },
      transition: Transition.fadeIn,
    ),
    GetPage(
      name: authError,
      page: () => const ErrorScreen(),
      transition: Transition.fadeIn,
    ),
    
    // Your App Screens
    GetPage(
      name: home,
      page: () => const HomePage(),
      transition: Transition.fadeIn,
    ),
  ];
}
```

### Step 3: Modify main.dart for GetX

```dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import 'onfinty_auth/core/l10n/app_localization.dart';
import 'onfinty_auth/core/theme/auth_theme.dart';
import 'onfinty_auth/auth_config.dart';
import 'onfinty_auth/backend/auth_service.dart';
import 'onfinty_auth/backend/auth_backend_examples.dart';
import 'routes/app_routes.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
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
        // 👇 Use GetMaterialApp instead of MaterialApp
        return GetMaterialApp(
          title: ClientConfig.appName,
          theme: AppTheme.getTheme(ClientConfig.defaultLocale),
          debugShowCheckedModeBanner: false,
          
          // GetX routing magic
          initialRoute: _getInitialRoute(),
          getPages: AppRoutes.routes,
          
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
  
  // Check if user is logged in
  String _getInitialRoute() {
    final user = AuthService.instance.currentUser;
    if (user != null) {
      return AppRoutes.home;
    }
    return AppRoutes.welcome;
  }
}
```

### Step 4: Modify Auth Screens for GetX Navigation

The Auth Kit screens use `context.go()` from GoRouter. For GetX, you'll need to modify the screens OR create a navigation abstraction.

**Option A: Simple Find & Replace** (Quick & Dirty)

In each auth screen, replace:
```dart
// GoRouter style
context.go('/login');
context.push('/register');

// GetX style
Get.toNamed('/login');
Get.toNamed('/register');
```

**Option B: Navigation Abstraction** (Cleaner, More Work)

Create `lib/utils/auth_navigator.dart`:

```dart
import 'package:get/get.dart';

/// Abstracts navigation so screens don't care if you use GoRouter or GetX
class AuthNavigator {
  static void toLogin() => Get.toNamed('/login');
  static void toRegister() => Get.toNamed('/register');
  static void toForgotPassword() => Get.toNamed('/forgot-password');
  static void toHome() => Get.offAllNamed('/home');
  
  static void toSuccess({required String action, required String next}) {
    Get.toNamed('/auth-success', arguments: {'action': action, 'next': next});
  }
  
  static void back() => Get.back();
}
```

Then update the screens to use `AuthNavigator.toLogin()` instead of `context.go()`.

### GetX Navigation Cheat Sheet

```dart
// Navigate (adds to stack)
Get.toNamed('/login');

// Navigate with arguments
Get.toNamed('/reset-password', arguments: {'token': 'abc123'});

// Replace current screen
Get.offNamed('/home');

// Remove all previous screens (good for after login)
Get.offAllNamed('/home');

// Go back
Get.back();

// Get arguments in destination screen
final token = Get.arguments?['token'];
```

---

## 🏛️ Option 3: Navigator 2.0 - The Purist Path

**Navigator 2.0** is Flutter's official declarative navigation API. It's powerful, flexible, and will make you question your career choices.

### Why Navigator 2.0?
- ✅ Full control over everything
- ✅ No external dependencies
- ✅ Deep linking support
- ❌ Verbose. So verbose.
- ❌ Steep learning curve
- ❌ You'll write a lot of boilerplate

### When to Use This
- You have a complex app with nested navigation
- You need fine-grained control over the back stack
- You enjoy typing
- You're building a browser

### Basic Setup (Brace Yourself)

Create `lib/router/app_router_delegate.dart`:

```dart
import 'package:flutter/material.dart';
import '../onfinty_auth/backend/auth_service.dart';
import '../onfinty_auth/screens/auth_welcome_screen.dart';
import '../onfinty_auth/screens/auth_login_screen.dart';
import '../onfinty_auth/screens/auth_register_screen.dart';
import '../onfinty_auth/screens/auth_forgot_password_screen.dart';
import '../onfinty_auth/screens/auth_success_screen.dart';
import '../pages/home_page.dart';

// The state that drives our navigation
class AppRoutePath {
  final String location;
  final Map<String, String> queryParams;
  
  AppRoutePath.welcome() : location = '/welcome', queryParams = {};
  AppRoutePath.login() : location = '/login', queryParams = {};
  AppRoutePath.register() : location = '/register', queryParams = {};
  AppRoutePath.forgotPassword() : location = '/forgot-password', queryParams = {};
  AppRoutePath.home() : location = '/home', queryParams = {};
  AppRoutePath.success({String? action, String? next}) 
    : location = '/auth-success',
      queryParams = {
        if (action != null) 'action': action,
        if (next != null) 'next': next,
      };
  
  AppRoutePath._(this.location, this.queryParams);
}

class AppRouterDelegate extends RouterDelegate<AppRoutePath>
    with ChangeNotifier, PopNavigatorRouterDelegateMixin<AppRoutePath> {
  
  @override
  final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();
  
  AppRoutePath _currentPath = AppRoutePath.welcome();
  
  AppRoutePath get currentPath => _currentPath;
  
  set currentPath(AppRoutePath path) {
    _currentPath = path;
    notifyListeners();
  }
  
  @override
  AppRoutePath? get currentConfiguration => _currentPath;
  
  @override
  Widget build(BuildContext context) {
    return Navigator(
      key: navigatorKey,
      pages: _buildPages(),
      onPopPage: (route, result) {
        if (!route.didPop(result)) return false;
        // Handle back navigation
        currentPath = AppRoutePath.welcome();
        return true;
      },
    );
  }
  
  List<Page<dynamic>> _buildPages() {
    final pages = <Page<dynamic>>[];
    
    // Check auth state
    final isLoggedIn = AuthService.instance.currentUser != null;
    
    if (isLoggedIn && _currentPath.location == '/home') {
      pages.add(const MaterialPage(child: HomePage()));
    } else {
      // Build navigation stack based on current path
      switch (_currentPath.location) {
        case '/welcome':
          pages.add(const MaterialPage(child: WelcomeScreen()));
          break;
        case '/login':
          pages.add(const MaterialPage(child: WelcomeScreen()));
          pages.add(const MaterialPage(child: LoginScreen()));
          break;
        case '/register':
          pages.add(const MaterialPage(child: WelcomeScreen()));
          pages.add(const MaterialPage(child: RegisterScreen()));
          break;
        case '/forgot-password':
          pages.add(const MaterialPage(child: WelcomeScreen()));
          pages.add(const MaterialPage(child: LoginScreen()));
          pages.add(const MaterialPage(child: ForgotPasswordScreen()));
          break;
        case '/auth-success':
          pages.add(MaterialPage(
            child: SuccessScreen(
              action: _currentPath.queryParams['action'],
              nextRoute: _currentPath.queryParams['next'],
            ),
          ));
          break;
        default:
          pages.add(const MaterialPage(child: WelcomeScreen()));
      }
    }
    
    return pages;
  }
  
  @override
  Future<void> setNewRoutePath(AppRoutePath path) async {
    _currentPath = path;
  }
  
  // Call these methods to navigate
  void goToLogin() {
    currentPath = AppRoutePath.login();
  }
  
  void goToRegister() {
    currentPath = AppRoutePath.register();
  }
  
  void goToHome() {
    currentPath = AppRoutePath.home();
  }
  
  void goToSuccess({required String action, required String next}) {
    currentPath = AppRoutePath.success(action: action, next: next);
  }
}
```

Create `lib/router/app_route_information_parser.dart`:

```dart
import 'package:flutter/material.dart';
import 'app_router_delegate.dart';

class AppRouteInformationParser extends RouteInformationParser<AppRoutePath> {
  @override
  Future<AppRoutePath> parseRouteInformation(RouteInformation routeInformation) async {
    final uri = routeInformation.uri;
    
    switch (uri.path) {
      case '/login':
        return AppRoutePath.login();
      case '/register':
        return AppRoutePath.register();
      case '/forgot-password':
        return AppRoutePath.forgotPassword();
      case '/home':
        return AppRoutePath.home();
      case '/auth-success':
        return AppRoutePath.success(
          action: uri.queryParameters['action'],
          next: uri.queryParameters['next'],
        );
      default:
        return AppRoutePath.welcome();
    }
  }
  
  @override
  RouteInformation? restoreRouteInformation(AppRoutePath configuration) {
    return RouteInformation(uri: Uri.parse(configuration.location));
  }
}
```

Use in `main.dart`:

```dart
import 'router/app_router_delegate.dart';
import 'router/app_route_information_parser.dart';

class MyApp extends StatefulWidget {
  const MyApp({super.key});
  
  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final _routerDelegate = AppRouterDelegate();
  final _routeInformationParser = AppRouteInformationParser();
  
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerDelegate: _routerDelegate,
      routeInformationParser: _routeInformationParser,
      // ... rest of your config
    );
  }
}
```

*If you made it this far, congratulations. You're either very dedicated or very stubborn. Both are valid.*

---

## 🤷 Which Should I Use?

| You Should Use... | If... |
|------------------|-------|
| **GoRouter** | You want the kit to work immediately with minimal setup |
| **GoRouter** | You're building for web and need URL support |
| **GoRouter** | You want official Flutter team backing |
| **GetX** | You're already using GetX for state management |
| **GetX** | You love `Get.to()` syntax |
| **GetX** | You want navigation without BuildContext |
| **Navigator 2.0** | You have complex nested navigation needs |
| **Navigator 2.0** | You want zero external dependencies |
| **Navigator 2.0** | You enjoy pain (respectfully) |

### TL;DR Decision Tree

```
Start
  │
  ├─ "Do I already use GetX?"
  │     ├─ Yes → Use GetX
  │     └─ No → Continue
  │
  ├─ "Do I need complex nested navigation?"
  │     ├─ Yes → Consider Navigator 2.0 (or GoRouter with ShellRoute)
  │     └─ No → Continue
  │
  └─ "Do I just want this to work?"
        └─ Yes → Use GoRouter (default)
```

---

## 🔧 Troubleshooting

### "context.go is not defined"

You're trying to use GoRouter navigation but haven't imported it:

```dart
import 'package:go_router/go_router.dart';
```

### "Get.toNamed is not defined"

You're trying to use GetX but haven't imported it:

```dart
import 'package:get/get.dart';
```

### "Navigation doesn't work after login"

Make sure `ClientConfig.successRoute` matches an actual route in your router:

```dart
// In auth_config.dart
static const String successRoute = '/home';

// This route MUST exist in your router:
GoRoute(path: '/home', builder: (_, __) => HomePage()),
```

### "I'm stuck in a navigation loop"

You might be calling `context.go('/')` which checks auth and redirects back. Use `context.go('/home')` to go directly to a specific page.

### "Deep links don't work"

For password reset email links, make sure you've configured:
- Android: `AndroidManifest.xml` with intent filters
- iOS: `Info.plist` with URL schemes

See [CLIENT_GUIDE.md → Scenario F: Deep Links](CLIENT_GUIDE.md#scenario-f-handling-deep-links-password-reset) for details.

### "The AuthWrapper keeps showing loading forever"

Your `AuthService` might not be configured:

```dart
// BEFORE runApp():
AuthService.instance.configure(MockAuthImplementation());
```

### "I switched to GetX and everything broke"

Remember to:
1. Replace `MaterialApp.router` with `GetMaterialApp`
2. Replace `context.go()` with `Get.toNamed()` in auth screens
3. Remove GoRouter imports and dependencies

---

## 🎉 You Made It!

You now know more about Flutter routing than 80% of developers on StackOverflow. Go forth and navigate with confidence!

Still confused? Grab the GoRouter setup from Section 1, copy-paste it, and move on. Life's too short to overthink routing.

---

*Made with ☕ and questionable life choices by the OnFiNtY Team*
