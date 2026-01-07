#  Changelog



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
