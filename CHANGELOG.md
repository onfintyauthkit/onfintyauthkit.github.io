#  Changelog





## [1.7.0] - 2026-01-11

### 🛡️ The "Audit Update"

We conducted a comprehensive commercial code audit and fixed **everything**. This release transforms the kit from "great UI" to "production-grade powerhouse". 🚀

### 🔥 Critical Fixes
- **SafeAuthService Pattern**: No more crashes if you forget to configure `AuthService` in `main.dart`. It now safely auto-initializes a Mock backend (with a helpful warning) so your app never crashes during development hot-restarts or deep-link launches.
- **Glass Performance Engine**: `GlassButton` and `GlassCard` now intelligently respect `BackgroundQuality` settings.
  - **Low/Off Quality**: Completely disables expensive `BackdropFilter` layers (saves ~3ms/frame!).
  - **Medium Quality**: Uses optimized blur sigmas.
- **Async Safety Net**: All async navigation flows now have strict `mounted` checks. "SetState called after dispose" errors are now extinct. 🦖

### 🧠 Architecture Upgrades
- **PasswordStrengthEngine**: A new centralized brain for password logic. The visual strength meter and the form validator now share the exact same logic source. No more "Green meter but invalid form" confusion!
- **AppAnimations System**: Centralized animation constants that respect **Reduce Motion** accessibility settings.
  - If a user disables animations in OS settings, your app now respects it instantly (0ms durations).
- **Type-Safe Localization**: Introduced `LocaleKeys` class. No more string typos like `context.tr('loginnTitle')`. Now it's `context.tr(LocaleKeys.loginTitle)`. Compile-time safety FTW!

### 🧪 Testing Infrastructure
- **Test Suite Zero**: We shipped the first comprehensive unit tests!
  - `password_strength_engine_test.dart`: 100% coverage of password logic.
  - `app_animations_test.dart`: Verifies reduced motion compliance.
  - `validators_test.dart`: Robust email/password validation testing.

### 🧹 Polish
- **Equality Logic**: `UserEntity` now properly implements `==` and `hashCode`. StreamBuilders won't rebuild uselessly anymore.
- **Code Hygiene**: Standardized `SizedBox` usage, added missing `const` constructors, and cleaned up duplicate comments.

---

## [1.6.9] - 2026-01-11

### 🚀 Performance & Stability Boost

We've gone under the hood to make the kit faster, smoother, and more robust than ever! 🏎️

- **Background Performance Tiers**: Added `BackgroundQuality` configuration (`high`, `medium`, `low`, `off`). No more stuttering on older devices!
  - `low` mode removes expensive blurs and complex shadows while keeping the core aesthetic.
  - `off` mode provides a static gradient for maximum battery saving.
- **RepaintBoundary Architecture**: All animated background styles now use `RepaintBoundary` to drastically reduce CPU/GPU redraws.
- **Standardized Blurs (`AppBlur`)**: Gone are the magic blur numbers! Introduced a centralized `AppBlur` class for consistent glassmorphism across all screens.
- **Smart Validation Debouncing**: Password strength calculations are now debounced (300ms). Your UI remains responsive even during fast typing! ⌨️
- **Async Safety Overhaul**: Added `if (!mounted)` guards to all `await` calls and `setState` blocks to prevent pesky runtime navigation crashes.

---

## [1.6.8] - 2026-01-10

### 🎨 Deep Glass Redesigns

The Forgot Password screen was feeling a little... forgotten. Not anymore! ✨

- **Forgot Password Screen Overhaul**: Completely rebuilt with the "Deep Glass" aesthetic matching Login and Register. Gone is the basic card—hello multi-layered shadows, 25px backdrop blur, and premium gradients!
- **Encapsulated Design**: All content (back button, logo, icon, form) now lives inside a single gorgeous glass container. It's organized. It's premium. It sparks joy.
- **Icon Badge**: The key icon now sits in a glassy circular badge, because plain icons are so 2024.

---

### 📱 Mobile UX & Keyboard Magic

Your thumbs will thank us! 👍

- **Keyboard Focus Traversal**: Pressing "Enter" on the keyboard now intelligently moves to the next field:
  - **Login**: Email → Password → Submit
  - **Register**: Name → Email → Password → Confirm Password → Submit
  - **Forgot Password**: Email → Submit
- **`textInputAction` Support**: Added `TextInputAction.next` and `TextInputAction.done` to `CustomTextField` widget.
- **`onSubmitted` Callback**: New callback for "Enter" key submission. Keyboard warriors, rejoice!
- **Scroll-Safe Layouts**: All auth screens use `SingleChildScrollView`, so keyboards can pop up without the dreaded "Bottom Overflowed by 47 pixels" error. You're welcome.

---

### 🛠 Layout Fixes

HeroAuth got a makeover and a reality check. 💅

- **Login Screen Back Button Removed**: The HeroAuth layout on Login no longer shows a random back button that leads nowhere. Login is typically the first screen, so... bye-bye button.
- **Social Login Padding Fixed**: Refactored social button layout to use explicit `SizedBox` spacing (12px) instead of complex conditional padding. Works perfectly whether you have 1, 2, or 3 social providers enabled.

---

### ♿ Accessibility Fixes (RTL)

Arabic users, we see you! 🇸🇦

- **Invisible SemanticsNodes Fix**: Resolved a crash in RTL mode caused by the password visibility toggle. The old `Semantics` wrapper was creating phantom accessibility nodes with invalid geometry.
- **Solution**: Switched to using `IconButton(tooltip: ...)` for accessibility labels, letting Flutter handle RTL-aware touch targets correctly.

---

### 🧹 Code Quality

- **Removed Unused Import**: Cleaned up `auth_forgot_password_screen.dart` by removing the now-unused `auth_glass_card.dart` import.
- **`flutter analyze` Status**: **No issues found!** 🎉

---

## [1.6.7] - 2026-01-09

### 🎨 Themes & Visual System

The Dark Side called... and we answered! 🌑

- **7 True Dark Mode Variants**: Because we believe in choices! Introducing `cosmicDark`, `oceanDark`, `natureDark`, `sunsetDark`, `royalDark`, `midnightDark`, and `minimalDark`. These aren't just "darker backgrounds"—they're proper dark themes with all the contrast and accessibility goodies.
- **True Dark Glass Cards**: Our glass cards now actually look like glass in the dark, not like someone just turned the lights off.
- **`isDarkVariant` Helper**: A handy helper for theme-aware UI logic. No more `if (theme.brightness == Brightness.dark)` spaghetti!
- **`accessibleGlassWhite`**: High-contrast white for dark mode readability. Your users' eyes will thank you.

---

## [1.6.6] - 2026-01-09

### 🧩 Layout & Customization

Logos: Now with 87% less headache! 🎯

- **LogoAlignment System**: Forget `Offset(12.5, -34.7)`! New presets:
  - `center`, `topCenter`, `bottomCenter`, `topLeft`, `topRight`, `custom`
- **Global `logoSize`**: Set once, apply everywhere. Revolutionary, we know.
- **Reduced Offset Tweaking**: Because life's too short to adjust pixels manually.
- **Improved Logo Behavior**: Logos now behave across ALL auth screens like good little widgets should.

---

## [1.6.5] - 2026-01-09

### ♿ Accessibility (WCAG-Oriented Enhancements)

Making apps usable for everyone isn't optional—it's essential! 🌟

- **Semantic Headers**: All main screen titles are now proper semantic headers. Screen readers rejoice!
- **Live Regions**: Password strength now announces itself in real-time. "Strong password!" your phone will proudly proclaim.
- **Localized Accessibility Labels**: All interactive elements have proper labels in ALL 7 languages. Yes, even the password visibility toggle. Especially the password visibility toggle.
- **Explicit Button Roles**: Every custom button and icon button now has a properly defined role. No more mystery taps!
- **`accessibilityMode`**: A brand new config flag for healthcare, finance, and elderly-focused apps. Enable it and watch touch targets grow to 48dp+ and contrast kick into high gear.
- **`minTouchTargetSize`**: Configurable minimum touch target size. WCAG recommends 48dp, but we don't judge if you go bigger.
- **`highContrastMode`**: Maximum readability mode for when you really, really need to see that text.

---

## [1.6.4] - 2026-01-09

### 📚 Documentation & Learning Experience

Because great code deserves great docs! 📖

- **QUICK_START.md**: New 5-minute setup guide! Copy. Paste. Run. Celebrate.
  - Includes a complete, working `main.dart` template
  - Common issues \& instant fixes section
  - Zero philosophy, maximum productivity
- **ROUTER_GUIDE.md**: Navigation explained for humans!
  - GoRouter explained for beginners (and experts who forgot things)
  - GetX routing alternative (for the rebels)
  - Navigator 2.0 example (for the brave)
  - "When \& why to use each approach" decision tree
- **CLIENT_GUIDE.md Expansion**:
  - "New to Flutter?" beginner section (no judgment zone!)
  - Common mistakes \& pro tips
  - Friendlier tone throughout (we actually like you)

---

## [1.6.3] - 2026-01-09

### 🔐 Authentication & Backend

Social login is here and it's beautiful! 🎉

- **Google Sign-In**: Fully implemented! Works on iOS and Android.
- **Apple Sign-In**: Fully implemented! Works on iOS (obviously) and macOS.
- **Facebook Sign-In**: Fully implemented! Works everywhere Facebook goes.
- **Detailed Setup Instructions**: Per-platform setup guides for each social provider. No more guessing!
- **GraphQL Backend Example**: For the cool kids using GraphQL.
- **OTP vs Email Link Clarity**: Docs now clearly explain when you need OTP and when your backend uses magic links instead.

---

## [1.6.2] - 2026-01-09

### 🛠 Fixed

Squashing bugs like it's our job. Oh wait, it is! 🐛

- **iOS Avatar Upload**: Fixed silent Supabase avatar upload failures. iOS was being... iOS.
- **Storage Permission Handling**: Explicit error handling for when users deny storage access.
- **Color Contrast Issues**: Multiple themes now have better text contrast.
- **Glass Border Visibility**: Dark environment glass borders are actually visible now!
- **OTP Flow Confusion**: Fixed documentation ambiguities around Firebase/Supabase OTP flows.
- **Resolved User-Reported Issues**: Multiple documentation clarifications based on real user feedback.

---

## [1.6.1] - 2026-01-09

### 🧠 Developer Experience (DX)

We heard you. Setup should take 30-60 minutes, not a whole weekend! ⚡

- **Clarified Dependencies**: Required vs optional dependencies are now crystal clear.
- **Faster Setup Time**: Weekend → ~30-60 minutes (your mileage may vary based on coffee intake).
- **Config Discoverability**: `auth_config.dart` is now easier to navigate with clear section headers.
- **Beginner-Safe Defaults**: Start simple, unlock complexity when you're ready.
- **Less Internal File Modification**: Reduced need to touch utility files. Keep your hands clean!

---

## [1.6.0] - 2026-01-09

### 🏆 Major Milestone Release

Version 1.6.0 marks a significant maturity milestone for the OnFiNtY Auth UI Kit. This release focuses on professional-grade accessibility, complete social authentication, and developer experience improvements.

### ⚠️ Notes

This release significantly improves accessibility but does not yet include:
- ❌ Biometric authentication (Face ID / Touch ID)
- ❌ MFA/2FA flows
- ❌ Full widget/unit test coverage

These are planned for the next major release (2.0). Stay tuned!

---

## [1.5.5] - 2026-01-09

### Added
- **OTP Slot Configuration**: New `otpSlotCount` config option. Want 4 digits? 6? 8? You decide!
- **Configurable Touch Targets**: Accessibility-conscious touch target sizing.
- **Enhanced Theme Detection**: `isDarkVariant` utility function for theme-aware logic.

### Changed
- **Default Theme**: Changed to `midnightDark` for that premium feel out of the box.
- **Documentation Consistency**: All markdown files now share the same friendly, helpful tone.

---

## [1.5.4] - 2026-01-08

### Added
- **Stardust Particles**: Replaced generic particle dust with a multi-layered "Stardust" system featuring varying depths, blurs, and speeds.
- **Cyber Grid**: Redesigned the "Grid" background to be a high-end "Cyber Plane" with perspective fades and smooth horizon flows.
- **Deep Nebula**: Completely new "Nebula" logic using large, gas-like cloud formations with complex blending modes.

### Fixed
- **Animation Smoothness**: All background loops have been retimed to prevent "jumps" or frame drops.
- **Logo Concepts**: Resolved conceptual issues with logo scaling and null-safety handling in `AuthLogo`.

---

## [1.5.3] - 2026-01-08

### Changed
- **Cosmic Palette**: Removed "Neon Pink" and "Green" accents in favor of a deep "Galactic Purple" and "Cyan Starlight" aesthetic for a more mature look.
- **Nature Palette**: Replaced "Bright Green" with "Sage," "Deep Forest," and "Sand/Gold" tones for a premium earthy feel.

### Refined
- **Global Shadows**: Applied consistent `BoxShadow` logic to all glass panels to ensure separation from the new deeper backgrounds.

---

## [1.5.2] - 2026-01-08

### Added
- **Register Split**: Brought the "Split" layout of the registration screen up to par with the Welcome screen standards.
- **Live Feedback**: Added "Live Email" reflection in the step-by-step registration flow.

### Refined
- **Card Layouts**: Adjusted padding and border radii for the "Card" layout in both Login and Register screens to match the new "Glassy" standard.

---

## [1.5.1] - 2026-01-08

### Changed
- **Spectrum -> Galactic**: Renamed and completely redesigned the "Spectrum" background. It is no longer just a gradient mesh but a full deep-space scene with stars and aurora effects.

### Technical
- **Performance**: Optimized the large radial gradients used in the Galactic background to prevent rasterization stutter on mobile devices.

---

## [1.5.0] - 2026-01-08

### Added
- **3D Geometric**: Transformed the "Geometric" background from simple 2D shapes to simulated 3D objects (Prisims, Monoliths, Cubes).
- **Glass Simulation**: Implemented a custom `_GlassShape` widget that simulates refractive edges and internal gradients for all geometric objects.

### Milestone
- **Premium Standard**: This release marks the official transition to the "Premium Glass" design language for the entire kit.

---

## [1.4.9] - 2026-01-08

### Changed
- **Orbs Redesign**: The "Orbs" background has been upgraded from solid colors to "Premium Glassy" spheres.
- **Physics**: Added "Parallax" movement logic where orbs move at different speeds relative to the scroll/mouse.
- **Visuals**: Orbs now feature sharp specular highlights and deep inner shadows to simulate real glass materials.

---

## [1.4.8] - 2026-01-08

### Fixed
- **Codebase Health**: Resolved all pending lints, warnings, and information messages from `flutter analyze`.
- **Stability**: Fixed invalid null-aware operator usage in `AuthLogo` and `WelcomeScreen`.
- **Async Safety**: Added `if (!context.mounted) return;` checks to all async social login callbacks to prevent runtime errors.

---

## [1.4.7] - 2026-01-08

### Added
- **Welcome Split**: The "Split" layout for the Welcome Screen has been completely rebuilt.
- **Layout Logic**: Fixed the issue where the glass sheet would cover the top branding branding area on smaller screens.
- **Buttons**: Action buttons in the Split layout now reside correctly within the bottom glass sheet for better reachability.

---

## [1.4.6] - 2026-01-08

### Added
- **Background Foundation**: Implemented the base architecture for `_OrbsBackground` and `_GeometricBackground`.
- **Widgets**: Created reusable `Blur` and `GlassCard` wrappers for consistent background implementation.

### Technical
- **AnimationController**: Standardized the `flutter_animate` controller reuse across all background types to save memory.

---

## [1.4.5] - 2026-01-08

### Added
- **Galactic Concept**: Initial implementation of the "Space/Galactic" theme concept (initially based on Northern Lights mesh).
- **Star Field**: Added dynamic twinkling star logic to the background rendering system.

### Refined
- **Gradients**: Switched from simple `LinearGradient` to complex `RadialGradient` mixtures for better depth simulation.

---

## [1.4.4] - 2026-01-08

### Added
- **Premium Layouts**: Complete overhaul of `Illustration` and `BottomCTA` layouts.
- **Brand Focus**: Removed generic placeholder icons in favor of central brand logo integration.
- **Glassmorphism**: Enhanced bottom navigation bar with deep blur, shimmer, and refined borders.
- **Animations**: Coordinated entrance animations for brand elements using `easeOutBack` curves.

### Refined
- **UX**: Simplified layout hierarchy for better focus on content and actions.

---

## [1.4.3] - 2026-01-08

### Added
- **Classic Layout**: Enlarged branding cards and reduced internal padding for a majestic look.
- **Visuals**: Added periodic shimmer effects to main branding containers.


### Fixed
- **Clarity**: Implemented `FilterQuality.high` for all logo assets to ensure sharpness at any scale.

---

## [1.4.2] - 2026-01-08

### Fixed
- **Split Layout**: Resolved issue where bottom sheets stopped in the middle of the screen.
- **Stability**: Changed `Flexible` components to `Expanded` for guaranteed edge-to-edge coverage.

### Added
- **Art Section**: New animated, pulsing orbital artwork for the branding section of Split layouts.
- **Interactions**: Added `BouncingScrollPhysics` to all informational sheets.

---

## [1.4.1] - 2026-01-08

### Fixed
- **Layout Robustness**: Fixed `RenderFlex` overflow bugs affecting smaller device viewports.
- **Constraints**: Added `SingleChildScrollView` to informational containers to prevent vertical overlaps.

### Refined
- **Theme Sync**: Updated register screen avatar icons to respect current theme secondary colors.

---

## [1.4.0] - 2026-01-08

### Added
- **Adaptive Logo Engine**: New `AuthLogo` system with intelligent scaling logic.
- **Customization**: Introduced `showSpacing` toggle to allow logos to fit perfectly within tight glass cards.
- **Flexibility**: Logos now support global offsets and individual screen constraints.

---

## [1.3.9] - 2026-01-08

### Refined
- **Developer Experience**: Streamlined `ClientConfig` by moving logic to centralized widgets.
- **Branding**: Simplified logo path handling with robust null-safety and fallback logic.

---

## [1.3.8] - 2026-01-08

### Added
- **Visual Extensions**: Expanded layout types to include architectural asymmetric sheets.
- **Buttons**: Unified button animation properties across all welcome layouts.

### Fixed
- **Alignment**: Corrected logo positioning issues in "Hero" and "Classic" layout modes.

---

## [1.3.7] - 2026-01-07

### Added
- **Configuration**: Exposed `AuthBackgroundStyle` configuration in `ClientConfig`.
- **Integration**: All screens now automatically respect the selected background style.
- **Documentation**: Updated guides to reflect backend animation options.

### Refined
- **Performance**: Optimized animation controllers to reduce CPU usage.
- **Glassmorphism**: Fine-tuned blur and opacity values for maximum text readability against all background types.

---

## [1.3.6] - 2026-01-07

### Added
- **Geometric Style**: Added `AuthBackgroundStyle.geometric` option.
- **Visuals**: Abstract 3D-like shapes floating in space with glass transparency.
- **Animation**: Complex rotation and scale animations for a high-tech feel.

### Technical
- **Canvas**: Utilized advanced transforms for 3D perspective simulation.

---

## [1.3.5] - 2026-01-07

### Added
- **Orbs Style**: Added `AuthBackgroundStyle.orbs` option.
- **Physics**: Reimagined floating spheres with realistic depth and movement.
- **Depth**: Added multi-layered orb system (primary, secondary, accent) with varying speeds.

### Changed
- **Legacy**: Replaced old `auth_animated_background.dart` with new `AuthProfessionalBackground` widget.

---

## [1.3.4] - 2026-01-07

### Added
- **Mesh Style**: Added `AuthBackgroundStyle.mesh` option (Aurora-like gradients).
- **Design System**: Introduction of `AuthProfessionalBackground` widget architecture.

### Changed
- **Color Architecture**: Complete refactor of `AuthColors` to support the new background system.
- **Themes**: All 7 themes (Cosmic, Ocean, Nature, Sunset, Royal, Midnight, Minimal) updated with scientifically harmonious color palettes.
- **Visual Identity**: Significant upgrade to "Premium" design standard.

---

## [1.3.3] - 2026-01-06

### Changed
- **Folder Organization**: Restructured file layout for better maintainability
  - Created `core/` folder containing `theme/`, `router/`, `utils/`, and `l10n/` subdirectories
  - Created `backend/` folder for auth interface, service, and implementation examples
  - `auth_config.dart` remains at root for easy access
  - All import statements updated across the codebase
- **Documentation**: Major comprehensive updates
  - Fixed localization explanation (Map-based system, not ARB files)
  - Added detailed "Retrieving User Data" section with complete code examples  
  - Added Go Router integration guide for existing apps
  - Added splash screen setup guide with smart auth-aware example
  - Updated all folder structure diagrams and file path references
  - Added section explaining optional social login configuration

### Technical
- Updated 30+ import statements to reflect new folder structure
- Maintained full backwards compatibility
- No breaking changes to public API

---

## [1.3.2] - 2026-01-06

### Added
- **Social Login Control**: New configuration flags in `ClientConfig` for optional social auth providers
  - `enableGoogleSignIn` - Toggle Google Sign-In button visibility
  - `enableFacebookSignIn` - Toggle Facebook Sign-In button visibility
  - `enableAppleSignIn` - Toggle Apple Sign-In button visibility
- **Smart Rendering**: Login screen dynamically shows/hides social auth section based on enabled providers
- **Flexible Layout**: Social buttons auto-adjust spacing based on number of enabled providers
- **Apple Sign-In**: Added Apple sign-in button support (optional, disabled by default)

### Changed
- **Login Screen**: Social auth section now conditional - only displays if at least one provider is enabled
- **Defaults**: Google and Facebook enabled by default, Apple disabled by default
- **Spacing**: Improved button spacing logic for 1, 2, or 3 social providers

---

## [1.3.1] - 2026-01-06

### Added
- **Documentation**: Added comprehensive `BACKEND_INTEGRATION.md` guide covering Mock, Firebase, Supabase, and REST setups.
- **Documentation**: Added `CLIENT_GUIDE.md` for a complete "zero-to-hero" onboarding experience.
- **Developer Experience**: "Copy-paste ready" code examples provided for all major backends.

---

## [1.3.0] - 2026-01-06

### Added
- **Architecture**: Complete decoupling of UI from backend logic using new `AuthInterface`.
- **Core**: Introduced singleton `AuthService` to manage backend connections dynamically.

### Changed
- **Breaking Change**: `main.dart` must now configure `AuthService` before app startup.

---

## [1.2.9] - 2026-01-06

### Added
- **Supabase**: Production-ready `SupabaseAuthImplementation` with correct avatar upload logic.
- **Error Handling**: precise mapping for "User already exists" and other Supabase-specific errors.
- **Optimization**: OTP flow automatically skipped for Supabase (uses email links by default).

---

## [1.2.8] - 2026-01-06

### Added
- **Firebase**: Added dedicated `FirebaseAuthImplementation` class.
- **Storage**: Fixed avatar upload metadata handling for Firebase Storage.
- **Security**: Comprehensive error mapping for all Firebase Auth exceptions.

---

## [1.2.7] - 2026-01-06

### Refined
- **ClientConfig Maturity**: Sections organized into General, Branding, Custom Messages, Behavior, and Routing.
- **Defaults**: Safe default values established for all new configurations.
- **Organization**: Clear visual separators added to configuration file for better DX.

### Added
- **Power-User Ready**: Full customization options exposed while keeping simple defaults for beginners.

---

## [1.2.6] - 2026-01-06

### Added
- **App Name Control**: `showAppNameInWelcome` flag to toggle app name visibility in titles.
- **Custom Text**: Support for custom Welcome title, Welcome subtitle, Login subtitle, and Register subtitle via config maps.

### Changed
- **Localization**: All custom text fields support localization maps (e.g., 'en', 'ar') for full internationalization.

---

## [1.2.5] - 2026-01-06

### Added
- **Granular Logo Control**: Distinct `width` and `height` configuration for EACH screen (Welcome, Login, Register, Forgot Password, OTP, Reset Password).
- **Flexibility**: Solves layout issues where logos need different sizes on different screens (e.g., Hero vs Functional).

---

## [1.2.4] - 2026-01-06

### Added
- **Optional Logo Support**: New `logoPath` configuration in `ClientConfig`.
- **AuthLogo Widget**: Responsive logo placement in the header of all authentication screens.
- **Null Safety**: If `logoPath` is null, the logo is invisible, ensuring no broken UI.

---

## [1.2.3] - 2026-01-06

### Added
- **Disable OTP Page**: New `useOtpPage` flag in configuration.
- **Flow Logic**: If backend uses email links (like Supabase/Firebase), the OTP page is automatically skipped in the password reset flow.

---

## [1.2.2] - 2026-01-06

### Added
- **Account Already Exists Dialog**: Smart error handling dialog when duplicate registration is detected.
- **User Recovery**: "Recover Password" button in the dialog takes users directly to Forgot Password screen.

---

## [1.2.1] - 2026-01-06

### Added
- **Realistic Mock Backend**: In-memory storage implemented for realistic testing experience.
- **Validation**: Mock backend now correctly reports "Account already exists" errors like a real server.

---

## [1.2.0] - 2026-01-06

### Cleaned
- **Duplicate try-catch**: Removed redundant error handling blocks for cleaner, more readable code.

### Fixed
- **Navigation Inconsistency**: Unified use of `go()` and `push()` for predictable back button behavior across the stack.

---

## [1.1.2] - 2026-01-06

### Fixed
- **Success Screen Messaging**: Now displays context-aware messages based on action (Login vs Register vs Reset) - "Logged in" vs "Account Created".
- **Action Parameters**: `action` query parameter drives the success screen text logic.

---

## [1.1.1] - 2026-01-06

### Added
- **Session Persistence**: `AuthWrapper` now listens to `authStateChanges` for true session management.
- **Smart Redirect**: App opens directly to Home if session exists, else Welcome screen.
- **Restart Experience**: Users stay logged in across app restarts.

---

## [1.1.0] - 2026-01-06

### Added
- **UserEntity**: Unified model (`id`, `email`, `name`, `photoUrl`, `metadata`) separating UI from Backend SDKs.
- **Decoupling**: UI no longer depends on specific backend implementations (Firebase/Supabase).

---

## [1.0.8] - 2026-01-06

### Added
- **Backend-Agnostic System**: Introduced `AuthInterface` and generic `AuthService`.
- **Multi-Backend Support**: Architecture ready for Mock, Firebase, Supabase, or REST implementations.
- **No SDK Lock-in**: Full architectural decoupling of authentication logic.

---

## [1.0.7] - 2026-01-04

### Added
- Comprehensive `BACKEND_INTEGRATION.md` with Firebase and Supabase step-by-step guides
- Detailed `CLIENT_GUIDE.md` with customization instructions
- Complete `README.md` with all features documented
- New localization keys: `orContinueWith`, `contactSupport`, `ok`, `sent`, `nameTooShort`

### Fixed
- Hardcoded 'Or continue with' string now uses localized `orContinueWith` key
- Forgot password auto-navigation delay increased from 1s to 3s for better UX
- String concatenation replaced with proper interpolation
- All deprecated `withOpacity()` calls replaced with `withAlpha()`

### Changed
- Default locale changed to English (`en`) for broader compatibility
- Home route placeholder now shows clear "Replace in your app!" message
- Extended RTL font support to Persian (fa), Farsi, and Urdu (ur)

---

## [1.0.6] - 2026-01-01

### Added
- `CODE_AUDIT_REPORT.md` documenting 60+ identified issues
- MIT `LICENSE` file

### Fixed
- All 15 lint warnings from `dart analyze` resolved
- Curly braces added to if statements per style guide
- Unnecessary underscores removed in route redirects

### Changed
- Email regex improved for better validation (subdomains, plus signs)
- Removed verbose developer comments from validators

---

## [1.0.5] - 2025-12-25

### Added
- `isLoading` and `isDisabled` properties to `GlassButton` 
- `enabled`, `maxLength`, `autofillHints` properties to `CustomTextField`
- Password strength indicator to Reset Password screen

### Fixed
- LucideIcons now used consistently (visibility toggle in text fields)
- Button animation no longer replays on every rebuild

### Changed
- `GlassCard` now uses `AppColors` for consistent theming

---

## [1.0.4] - 2025-12-24

### Added
- Configurable `otpResendSeconds` timer in `ClientConfig`
- Configurable `successScreenAutoNavSeconds` in `ClientConfig`
- TODO markers for social login integration (Google, Apple)
- TODO marker for avatar image picker implementation

### Fixed
- OTP input direction forced LTR for correct digit order
- Success screen navigation now correctly uses `next` query parameter
- Confirm password validation now checks for empty field

### Changed
- Removed mock OTP verification (now requires backend implementation)

---

## [1.0.3] - 2025-12-22

### Added
- Complete `app_localization.dart` with 7 languages
- `nameHint` localization key for all languages
- Real-time validation toggle in config

### Fixed
- Chinese `registerSubtitle` translation corrected
- Name validation now distinguishes between empty and "too short"
- Removed duplicate localization keys

### Changed
- All screens now use localized strings via `context.tr()`
- Validators accept BuildContext for localized error messages

---

## [1.0.2] - 2025-12-21

### Added
- Arabic (ar) language support with Cairo font
- RTL layout support for Arabic
- Spanish (es), French (fr), Chinese (zh), Hindi (hi), German (de) translations

### Fixed
- Arabic text rendering with proper Cairo font
- RTL layout direction for Arabic screens

### Changed
- Theme system now accepts locale for font selection
- Email hints kept in English format (universal)

---

## [1.0.1] - 2025-12-20

### Added
- `auth_error_dialog.dart` for beautiful error display
- `AutovalidateMode` for real-time validation
- Loading states with `CircularProgressIndicator`

### Fixed
- Form validation now triggers properly on submit
- Navigation context errors with `if (mounted)` checks

### Changed
- All screens use consistent error handling pattern
- Controllers properly disposed in all screens

---

## [1.0.0] - 2025-12-20

### Added
- **Initial Release** of OnFiNtY Auth UI Kit
- 8 complete authentication screens:
  - Welcome Screen
  - Login Screen
  - Register Screen
  - Forgot Password Screen
  - OTP Verification Screen
  - Reset Password Screen
  - Success Screen
  - Error Screen
- Glassmorphism design system with:
  - `GlassCard` widget
  - `GlassButton` widget
  - `GlassScaffold` with animated background
  - `CustomTextField` with validation
- 7 color themes: Cosmic, Ocean, Nature, Sunset, Royal, Midnight, Minimal
- `GoRouter` integration with configurable paths
- `flutter_screenutil` for responsive design
- `flutter_animate` for smooth animations
- Centralized `ClientConfig` for easy configuration

### Technical
- Dart SDK: ^3.10.4
- Flutter: Latest stable
- Dependencies: go_router, flutter_screenutil, flutter_animate, google_fonts, lucide_icons, intl, flutter_localizations
