# 🚀 Backend Integration Guide

Welcome to the **OnFiNtY Auth UI Kit Backend Integration Guide**! This is your one-stop shop for hooking up your shiny new authentication UI to whatever backend your heart desires. Whether you're team Firebase, team Supabase, or even team "I-built-my-own-REST-API-from-scratch," we've got you covered.

## 🚀 Quick Navigation

Jump to the section that solves your problem:

### Start Here
- [Architecture Overview](#understanding-the-architecture)
- [Quick Start (5 Mins)](#quick-start-5-minute-setup)
- [Configuration Tips](#configuration-tips)

### Backend Implementations
- [Option 1: Mock (Testing)](#option-1-mock-backend-testingdemo)
- [Option 2: Firebase](#option-2-firebase-authentication)
- [Option 3: Supabase](#option-3-supabase-authentication)
- [Option 4: REST API](#option-4-custom-rest-api)

### 🔑 Social Login (New!)
- [Setup Guide](#-social-login-setup)
- [Google Setup](#-google-sign-in-setup)
- [Apple Setup](#-apple-sign-in-setup)
- [Facebook Setup](#-facebook-sign-in-setup)

### 🚨 Troubleshooting
- [iOS Avatar Issues](#-ios-avatar-upload-troubleshooting)
- [Common Pitfalls](#common-pitfalls--how-to-avoid-them)
- [FAQ](#faq)

---

## Understanding the Architecture

Before we dive into the fun stuff, let's talk about how this kit is structured. Don't worry, we'll keep it light!

### The Magic Triangle 🔺

```
┌─────────────────┐
│   Your UI       │  ← Beautiful, glassmorphic auth screens
│   Screens       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AuthService    │  ← The middleman (singleton service)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ AuthInterface   │  ← The contract all backends must follow
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Your Backend    │  ← Firebase, Supabase, REST API, or Custom
│ Implementation  │
└─────────────────┘
```

**What does this mean for you?**
- The UI screens don't know (or care) which backend you're using
- You can swap backends anytime without touching the UI
- All you need to do is create a class that implements `AuthInterface`

### The AuthInterface Contract

Every backend implementation must fulfill these promises:

```dart
abstract class AuthInterface {
  Stream<UserEntity?> get authStateChanges;  // Listen to login/logout events
  UserEntity? get currentUser;                // Get current user info
  
  Future<AuthResult<UserEntity?>> login({required String email, required String password});
  Future<AuthResult<UserEntity?>> register({required String email, required String password, required String name, dynamic avatarImage});
  Future<AuthResult<void>> forgotPassword({required String email});
  Future<AuthResult<void>> resetPassword({required String newPassword, String? token});
  Future<AuthResult<void>> verifyOtp({required String otp});
  Future<AuthResult<UserEntity?>> googleSignIn();
  Future<AuthResult<UserEntity?>> facebookSignIn();
  Future<AuthResult<UserEntity?>> appleSignIn();
  Future<AuthResult<void>> logout();
  void dispose();  // Clean up streams and resources
}
```

Don't panic! We've already written implementations for the most popular backends. You can copy-paste and customize them. 😎

---

## Quick Start (5-Minute Setup)

### Just want to see it work? Start with Mock!

1. Open your `main.dart`
2. Add this line before `runApp()`:
   ```dart
   AuthService.instance.configure(MockAuthImplementation());
   ```
3. Done! Run your app and play with the UI.

The Mock backend simulates network delays and basic auth flows. Perfect for testing the UI without any backend setup.

---

## Backend Options

### Option 1: Mock Backend (Testing/Demo)

**When to use:** Testing UI, demoing to clients, or learning how the kit works.

**What you get:**
- ✅ Simulated network delays
- ✅ Basic error scenarios
- ✅ No external dependencies
- ✅ Works offline

**Setup:**

```dart
// In your main.dart
import 'package:your_app/onfinty_auth/backend/auth_backend_examples.dart';
import 'package:your_app/onfinty_auth/backend/auth_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  AuthService.instance.configure(MockAuthImplementation());
  
  runApp(const MyApp());
}
```

**That's it!** No config files, no API keys, no headaches. 🎉

**Testing tips:**
- Try logging in with any email (except ones containing "error")
- Registering creates a fake user
- OTP code is always `1234`
- Everything else just... works!

---

### Option 2: Firebase Authentication

**When to use:** You want Google-backed infrastructure, easy social auth, and don't mind vendor lock-in.

**What you'll need:**
- A Firebase project
- `google-services.json` (Android)
- `GoogleService-Info.plist` (iOS)
- A cup of coffee ☕

#### Step 1: Add Dependencies

Open `pubspec.yaml` and add:

```yaml
dependencies:
  firebase_core: ^4.3.0
  firebase_auth: ^6.1.3
  firebase_storage: ^13.0.5  # Only if you want avatar uploads
  google_sign_in: ^6.2.1      # Optional: for Google Sign-In
```

Run:
```bash
flutter pub get
```

#### Step 2: Initialize Firebase

In your `main.dart`, **before** configuring `AuthService`:

```dart
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart'; // Generated by FlutterFire CLI

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Firebase FIRST
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  
  // Then configure auth service
  AuthService.instance.configure(FirebaseAuthImplementation());
  
  runApp(const MyApp());
}
```

> **Don't have `firebase_options.dart`?** Run `flutterfire configure` in your terminal. It'll walk you through setup.

#### Step 3: Create the Firebase Implementation

**Option A: Copy our ready-made implementation**

Open `lib/onfinty_auth/auth_backend_examples.dart` and find the `FirebaseAuthImplementation` section (it's commented out around line 186). Copy the entire class.

**Option B: Create a new file**

Create `lib/backend/firebase_auth_implementation.dart` and paste this:

```dart
import 'dart:io';
import 'package:your_app/onfinty_auth/backend/auth_interface.dart';
import 'package:your_app/onfinty_auth/models/user_entity.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:image_picker/image_picker.dart';

class FirebaseAuthImplementation implements AuthInterface {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  UserEntity? _mapUser(User? user) {
    if (user == null) return null;
    return UserEntity(
      id: user.uid,
      email: user.email ?? '',
      name: user.displayName,
      photoUrl: user.photoURL,
    );
  }

  AuthError _mapFirebaseError(String code) {
    switch (code) {
      case 'user-not-found':
        return AuthError.userNotFound;
      case 'wrong-password':
        return AuthError.wrongPassword;
      case 'email-already-in-use':
        return AuthError.emailAlreadyInUse;
      case 'invalid-email':
        return AuthError.invalidEmail;
      case 'weak-password':
        return AuthError.weakPassword;
      case 'network-request-failed':
        return AuthError.networkError;
      default:
        return AuthError.unknown;
    }
  }

  @override
  Stream<UserEntity?> get authStateChanges =>
      _auth.authStateChanges().map(_mapUser);

  @override
  UserEntity? get currentUser => _mapUser(_auth.currentUser);

  @override
  Future<AuthResult<UserEntity?>> login({
    required String email,
    required String password,
  }) async {
    try {
      final cred = await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      return AuthResult.success(_mapUser(cred.user));
    } on FirebaseAuthException catch (e) {
      return AuthResult.failure(_mapFirebaseError(e.code), e.message);
    } catch (e) {
      return AuthResult.failure(AuthError.unknown, e.toString());
    }
  }

  @override
  Future<AuthResult<UserEntity?>> register({
    required String email,
    required String password,
    required String name,
    dynamic avatarImage,
  }) async {
    try {
      // 1. Create User
      UserCredential cred = await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );

      String? photoUrl;

      // 2. Upload Avatar (if present)
      if (avatarImage != null && cred.user != null) {
        try {
          final ref = FirebaseStorage.instance.ref().child(
            'avatars/${cred.user!.uid}',
          );

          if (avatarImage is XFile) {
            final bytes = await avatarImage.readAsBytes();
            final metadata = SettableMetadata(
              contentType: 'image/${avatarImage.name.split('.').last}',
            );
            await ref.putData(bytes, metadata);
          } else if (avatarImage is File) {
            await ref.putFile(avatarImage);
          }

          photoUrl = await ref.getDownloadURL();
        } catch (e) {
          print("Firebase Storage Upload Error: $e");
        }
      }

      // 3. Update Profile
      await cred.user?.updateDisplayName(name);
      if (photoUrl != null) {
        await cred.user?.updatePhotoURL(photoUrl);
      }

      // Reload user to get updated info
      await cred.user?.reload();
      final updatedUser = _auth.currentUser;

      return AuthResult.success(_mapUser(updatedUser));
    } on FirebaseAuthException catch (e) {
      return AuthResult.failure(_mapFirebaseError(e.code), e.message);
    } catch (e) {
      return AuthResult.failure(AuthError.unknown, e.toString());
    }
  }

  @override
  Future<AuthResult<void>> logout() async {
    await _auth.signOut();
    return AuthResult.success();
  }

  @override
  Future<AuthResult<void>> forgotPassword({required String email}) async {
    try {
      await _auth.sendPasswordResetEmail(email: email);
      return AuthResult.success();
    } on FirebaseAuthException catch (e) {
      return AuthResult.failure(_mapFirebaseError(e.code), e.message);
    } catch (e) {
      return AuthResult.failure(AuthError.unknown, e.toString());
    }
  }

  @override
  Future<AuthResult<void>> verifyOtp({required String otp}) async {
    // Firebase Auth mainly uses phone auth for OTP
    return AuthResult.success();
  }

  @override
  Future<AuthResult<void>> resetPassword({
    required String newPassword,
    String? token,
  }) async {
    // Firebase handles this via email link normally
    return AuthResult.success();
  }

  @override
  Future<AuthResult<UserEntity?>> googleSignIn() async {
    // Requires google_sign_in package setup
    return AuthResult.failure(
      AuthError.operationNotAllowed,
      'Not implemented yet',
    );
  }

  @override
  Future<AuthResult<UserEntity?>> facebookSignIn() async {
    return AuthResult.failure(
      AuthError.operationNotAllowed,
      'Not implemented yet',
    );
  }

  @override
  Future<AuthResult<UserEntity?>> appleSignIn() async {
    return AuthResult.failure(
      AuthError.operationNotAllowed,
      'Not implemented yet',
    );
  }
}
```

#### Step 4: Configure Storage Rules (for avatars)

In your Firebase Console → Storage → Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{userId} {
      allow read: if true; // Anyone can view avatars
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

#### Step 5: Update main.dart

```dart
import 'package:your_app/backend/firebase_auth_implementation.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  
  AuthService.instance.configure(FirebaseAuthImplementation());
  
  runApp(const MyApp());
}
```

**🎉 You're done!** Firebase is now powering your auth.

---

### Option 3: Supabase Authentication

**When to use:** You want an open-source alternative to Firebase with SQL database included.

**What you'll need:**
- A Supabase project
- Your Supabase URL and anon key
- A sense of adventure 🏴‍☠️

#### Step 1: Add Dependencies

```yaml
dependencies:
  supabase_flutter: ^2.12.0
```

Run:
```bash
flutter pub get
```

#### Step 2: Initialize Supabase

In your `main.dart`:

```dart
import 'package:supabase_flutter/supabase_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Supabase FIRST
  await Supabase.initialize(
    url: 'https://your-project.supabase.co',  // Get this from your Supabase dashboard
    anonKey: 'your-anon-key',                  // Get this from your Supabase dashboard
  );
  
  // Then configure auth service
  AuthService.instance.configure(SupabaseAuthImplementation());
  
  runApp(const MyApp());
}
```

> **Where do I find my URL and anon key?** 
> Log into Supabase → Your Project → Settings → API

#### Step 3: Create the Supabase Implementation

**Option A: Copy our ready-made implementation**

Open `lib/onfinty_auth/auth_backend_examples.dart` and find the `SupabaseAuthImplementation` section (around line 378). Copy it.

**Option B: Create a new file**

Create `lib/backend/supabase_auth_implementation.dart`:

```dart
import 'dart:io';
import 'package:your_app/onfinty_auth/backend/auth_interface.dart';
import 'package:your_app/onfinty_auth/models/user_entity.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:image_picker/image_picker.dart';

class SupabaseAuthImplementation implements AuthInterface {
  final SupabaseClient _supabase = Supabase.instance.client;

  UserEntity? _mapUser(User? user) {
    if (user == null) return null;
    
    // Get avatar URL from user metadata or public avatars bucket
    String? photoUrl = user.userMetadata?['avatar_url'] as String?;
    
    return UserEntity(
      id: user.id,
      email: user.email,
      name: user.userMetadata?['full_name'] as String? ?? 'No Name',
      photoUrl: photoUrl,
      metadata: user.userMetadata,
    );
  }

  @override
  Stream<UserEntity?> get authStateChanges => _supabase.auth.onAuthStateChange
      .map((data) => _mapUser(data.session?.user));

  @override
  UserEntity? get currentUser => _mapUser(_supabase.auth.currentUser);

  @override
  Future<AuthResult<UserEntity?>> login({
    required String email,
    required String password,
  }) async {
    try {
      final response = await _supabase.auth.signInWithPassword(
        email: email,
        password: password,
      );
      if (response.user != null) {
        return AuthResult.success(_mapUser(response.user));
      } else {
        return AuthResult.failure(
          AuthError.unknown,
          "Login succeeded but user is null",
        );
      }
    } on AuthException catch (e) {
      return AuthResult.failure(_mapError(e), e.message);
    } catch (e) {
      return AuthResult.failure(AuthError.unknown, e.toString());
    }
  }

  @override
  Future<AuthResult<UserEntity?>> register({
    required String email,
    required String password,
    required String name,
    dynamic avatarImage,
  }) async {
    try {
      String? avatarUrl;

      // 1. Upload avatar first (if provided)
      if (avatarImage != null) {
        try {
          final timestamp = DateTime.now().millisecondsSinceEpoch;
          final fileName = 'avatar_$timestamp.jpg';
          
          List<int> bytes;
          if (avatarImage is XFile) {
            bytes = await avatarImage.readAsBytes();
          } else if (avatarImage is File) {
            bytes = await avatarImage.readAsBytes();
          } else {
            throw Exception('Unsupported avatar type');
          }

          final uploadPath = await _supabase.storage
              .from('avatars')
              .uploadBinary(fileName, bytes);

          avatarUrl = _supabase.storage.from('avatars').getPublicUrl(fileName);
        } catch (e) {
          print("Avatar upload error: $e");
          // Continue without avatar
        }
      }

      // 2. Register user
      final response = await _supabase.auth.signUp(
        email: email,
        password: password,
        data: {
          'full_name': name,
          if (avatarUrl != null) 'avatar_url': avatarUrl,
        },
      );

      // Note: If email confirmation is enabled, user might be logged in or waiting for confirmation
      if (response.user != null) {
        return AuthResult.success(_mapUser(response.user));
      }
      
      // Registration success, but might need email confirmation
      return AuthResult.success(null);
    } on AuthException catch (e) {
      return AuthResult.failure(_mapError(e), e.message);
    } catch (e) {
      return AuthResult.failure(AuthError.unknown, e.toString());
    }
  }

  @override
  Future<AuthResult<void>> logout() async {
    await _supabase.auth.signOut();
    return AuthResult.success();
  }

  @override
  Future<AuthResult<void>> forgotPassword({required String email}) async {
    try {
      await _supabase.auth.resetPasswordForEmail(email);
      return AuthResult.success();
    } on AuthException catch (e) {
      return AuthResult.failure(_mapError(e), e.message);
    } catch (e) {
      return AuthResult.failure(AuthError.unknown, e.toString());
    }
  }

  @override
  Future<AuthResult<void>> verifyOtp({required String otp}) async {
    // Supabase uses email links by default for email/pass
    return AuthResult.failure(
      AuthError.operationNotAllowed,
      "Supabase uses Email Links by default.",
    );
  }

  @override
  Future<AuthResult<void>> resetPassword({
    required String newPassword,
    String? token,
  }) async {
    try {
      // User is auto-logged in via reset link, so just update password
      await _supabase.auth.updateUser(UserAttributes(password: newPassword));
      return AuthResult.success();
    } on AuthException catch (e) {
      return AuthResult.failure(_mapError(e), e.message);
    } catch (e) {
      return AuthResult.failure(AuthError.unknown, e.toString());
    }
  }

  AuthError _mapError(AuthException e) {
    final msg = e.message.toLowerCase();
    if (msg.contains('invalid login credentials') || msg.contains('invalid password')) {
      return AuthError.wrongPassword;
    }
    if (msg.contains('user not found')) return AuthError.userNotFound;
    if (msg.contains('already registered') || msg.contains('user already exists')) {
      return AuthError.emailAlreadyInUse;
    }
    if (msg.contains('email')) return AuthError.invalidEmail;
    if (msg.contains('weak password') || msg.contains('password')) {
      return AuthError.weakPassword;
    }
    return AuthError.unknown;
  }

  @override
  Future<AuthResult<UserEntity?>> googleSignIn() async =>
      AuthResult.failure(AuthError.operationNotAllowed, "Coming Soon");
      
  @override
  Future<AuthResult<UserEntity?>> facebookSignIn() async =>
      AuthResult.failure(AuthError.operationNotAllowed, "Coming Soon");
      
  @override
  Future<AuthResult<UserEntity?>> appleSignIn() async =>
      AuthResult.failure(AuthError.operationNotAllowed, "Coming Soon");
}
```

#### Step 4: Set Up Storage Bucket (for avatars)

1. Go to Supabase Dashboard → Storage
2. Create a new bucket called `avatars`
3. Make it **public**
4. Set this RLS policy:

```sql
-- Allow anyone to read avatars
CREATE POLICY "Public avatars are viewable by everyone"
ON storage.objects FOR SELECT
USING ( bucket_id = 'avatars' );

-- Allow authenticated users to upload their own avatar
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1] );
```

#### Step 5: Update main.dart

```dart
import 'package:your_app/backend/supabase_auth_implementation.dart';

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

**🚀 Supabase is ready to roll!**

---

### Option 4: Custom REST API

**When to use:** You have your own backend with custom endpoints.

#### Step 1: Add HTTP Package

```yaml
dependencies:
  http: ^1.2.0
  flutter_secure_storage: ^9.0.0
```

#### Step 2: Create Your Implementation

Create `lib/backend/rest_api_auth_implementation.dart`:

```dart
import 'package:your_app/onfinty_auth/backend/auth_interface.dart';
import 'package:your_app/onfinty_auth/models/user_entity.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'dart:convert';
import 'dart:async';

class RestApiAuthImplementation implements AuthInterface {
  final String baseUrl = 'https://api.yourapp.com/v1';
  final _storage = const FlutterSecureStorage();
  
  String? _token;
  UserEntity? _currentUser;
  final _authController = StreamController<UserEntity?>.broadcast();

  // Initialize: Try to restore session on app start
  RestApiAuthImplementation() {
    _restoreSession();
  }

  Future<void> _restoreSession() async {
    _token = await _storage.read(key: 'auth_token');
    if (_token != null) {
      // Ideally, validate token with backend here or fetch user profile
      // _currentUser = await _fetchProfile(); 
      // _authController.add(_currentUser);
    }
  }

  @override
  Stream<UserEntity?> get authStateChanges => _authController.stream;

  @override
  UserEntity? get currentUser => _currentUser;

  @override
  Future<AuthResult<UserEntity?>> login({
    required String email,
    required String password,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/login'),
        body: jsonEncode({'email': email, 'password': password}),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        _token = data['token'];
        _currentUser = UserEntity(
          id: data['user']['id'],
          email: data['user']['email'],
          name: data['user']['name'],
          photoUrl: data['user']['photoUrl'],
        );
        _authController.add(_currentUser);
        return AuthResult.success(_currentUser);
      } else {
        final error = jsonDecode(response.body);
        return AuthResult.failure(
          _mapHttpError(response.statusCode),
          error['message'] ?? 'Login failed',
        );
      }
    } catch (e) {
      return AuthResult.failure(AuthError.networkError, e.toString());
    }
  }

  @override
  Future<AuthResult<UserEntity?>> register({
    required String email,
    required String password,
    required String name,
    dynamic avatarImage,
  }) async {
    try {
      // For file upload, you might need multipart/form-data
      final request = http.MultipartRequest(
        'POST',
        Uri.parse('$baseUrl/auth/register'),
      );
      
      request.fields['email'] = email;
      request.fields['password'] = password;
      request.fields['name'] = name;
      
      if (avatarImage != null) {
        // Handle avatar upload - adjust based on your API
        final bytes = await avatarImage.readAsBytes();
        request.files.add(http.MultipartFile.fromBytes(
          'avatar',
          bytes,
          filename: 'avatar.jpg',
        ));
      }

      final streamedResponse = await request.send();
      final response = await http.Response.fromStream(streamedResponse);

      if (response.statusCode == 201 || response.statusCode == 200) {
        final data = jsonDecode(response.body);
        _token = data['token'];
        _currentUser = UserEntity(
          id: data['user']['id'],
          email: data['user']['email'],
          name: data['user']['name'],
          photoUrl: data['user']['photoUrl'],
        );
        _authController.add(_currentUser);
        return AuthResult.success(_currentUser);
      } else {
        final error = jsonDecode(response.body);
        return AuthResult.failure(
          _mapHttpError(response.statusCode),
          error['message'] ?? 'Registration failed',
        );
      }
    } catch (e) {
      return AuthResult.failure(AuthError.networkError, e.toString());
    }
  }

  @override
  Future<AuthResult<void>> logout() async {
    try {
      if (_token != null) {
        await http.post(
          Uri.parse('$baseUrl/auth/logout'),
          headers: {
            'Authorization': 'Bearer $_token',
            'Content-Type': 'application/json',
          },
        );
      }
      
      _token = null;
      _currentUser = null;
      _authController.add(null);
      return AuthResult.success();
    } catch (e) {
      // Even if API call fails, clear local state
      _token = null;
      _currentUser = null;
      _authController.add(null);
      return AuthResult.success();
    }
  }

  @override
  Future<AuthResult<void>> forgotPassword({required String email}) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/forgot-password'),
        body: jsonEncode({'email': email}),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        return AuthResult.success();
      } else {
        final error = jsonDecode(response.body);
        return AuthResult.failure(
          _mapHttpError(response.statusCode),
          error['message'] ?? 'Failed to send reset email',
        );
      }
    } catch (e) {
      return AuthResult.failure(AuthError.networkError, e.toString());
    }
  }

  @override
  Future<AuthResult<void>> resetPassword({
    required String newPassword,
    String? token,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/reset-password'),
        body: jsonEncode({
          'token': token,
          'newPassword': newPassword,
        }),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        return AuthResult.success();
      } else {
        final error = jsonDecode(response.body);
        return AuthResult.failure(
          _mapHttpError(response.statusCode),
          error['message'] ?? 'Failed to reset password',
        );
      }
    } catch (e) {
      return AuthResult.failure(AuthError.networkError, e.toString());
    }
  }

  @override
  Future<AuthResult<void>> verifyOtp({required String otp}) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/verify-otp'),
        body: jsonEncode({'otp': otp}),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        return AuthResult.success();
      } else {
        return AuthResult.failure(
          AuthError.invalidCredential,
          'Invalid OTP',
        );
      }
    } catch (e) {
      return AuthResult.failure(AuthError.networkError, e.toString());
    }
  }

  AuthError _mapHttpError(int statusCode) {
    switch (statusCode) {
      case 400:
        return AuthError.invalidEmail;
      case 401:
        return AuthError.wrongPassword;
      case 404:
        return AuthError.userNotFound;
      case 409:
        return AuthError.emailAlreadyInUse;
      case 429:
        return AuthError.tooManyRequests;
      default:
        return AuthError.unknown;
    }
  }

  @override
  Future<AuthResult<UserEntity?>> googleSignIn() async =>
      AuthResult.failure(AuthError.operationNotAllowed, "Not implemented");
      
  @override
  Future<AuthResult<UserEntity?>> facebookSignIn() async =>
      AuthResult.failure(AuthError.operationNotAllowed, "Not implemented");
      
  @override
  Future<AuthResult<UserEntity?>> appleSignIn() async =>
      AuthResult.failure(AuthError.operationNotAllowed, "Not implemented");
}
```

#### Step 3: Update main.dart

```dart
import 'package:your_app/backend/rest_api_auth_implementation.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  AuthService.instance.configure(RestApiAuthImplementation());
  
  runApp(const MyApp());
}
```

---

### Option 5: Build Your Own

Want to connect to something totally custom? Maybe PostgreSQL directly? MongoDB? A blockchain? (okay, maybe not blockchain for auth... but you do you!)

#### Here's what you need to do:

1. **Create a new class** that implements `AuthInterface`
2. **Implement all the required methods** (see the interface in `lib/onfinty_auth/auth_interface.dart`)
3. **Return `AuthResult` objects** for success/failure
4. **Map your errors** to `AuthError` enum values
5. **Provide a stream** for auth state changes
6. **Configure it** in `main.dart`

**Example skeleton:**

```dart
import 'package:your_app/onfinty_auth/backend/auth_interface.dart';
import 'package:your_app/onfinty_auth/models/user_entity.dart';
import 'dart:async';

class MyCustomAuthImplementation implements AuthInterface {
  UserEntity? _currentUser;
  final _authController = StreamController<UserEntity?>.broadcast();

  @override
  Stream<UserEntity?> get authStateChanges => _authController.stream;

  @override
  UserEntity? get currentUser => _currentUser;

  @override
  Future<AuthResult<UserEntity?>> login({
    required String email,
    required String password,
  }) async {
    // Your custom login logic here
    // Connect to your database/API/service
    // On success: return AuthResult.success(user);
    // On failure: return AuthResult.failure(AuthError.wrongPassword, "message");
  }

  // Implement the rest of the methods...
  
  @override
  Future<AuthResult<UserEntity?>> register({
    required String email,
    required String password,
    required String name,
    dynamic avatarImage,
  }) async {
    // Your registration logic
  }
  
  // ... and so on
}
```

**Pro tips:**
- Look at `MockAuthImplementation` for a simple reference
- Use `_authController.add(_currentUser)` when user logs in/out
- The UI will automatically react to stream changes!

---

## Configuration Tips

### Managing Auth Config

Edit `lib/onfinty_auth/auth_config.dart` to customize behavior:

```dart
class ClientConfig {
  // Your app name
  static const String appName = "My Awesome App";
  
  // Use OTP for password reset? (Firebase/Supabase use email links, so set to false)
  static const bool useOtpPage = false;  // false for Firebase/Supabase
  
  // Theme
  static const AppThemeType themeType = AppThemeType.midnight;
  
  // More options available in the file!
}
```

### Important Settings:

| Setting | What it does | Firebase/Supabase Value |
|---------|--------------|-------------------------|
| `useOtpPage` | Shows OTP input for password reset | `false` (they use email links) |
| `enableRealTimeValidation` | Validate as user types | `true` (recommended) |
| `appName` | Shows in welcome screen | Your app name |
| `themeType` | Visual theme | Pick from 7 options! |

---

## Common Pitfalls & How to Avoid Them

### 1. "AuthService not configured!" Error

**Problem:** You forgot to call `AuthService.instance.configure()` before `runApp()`.

**Solution:**
```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // ✅ Do this BEFORE runApp()
  AuthService.instance.configure(YourImplementation());
  
  runApp(const MyApp());
}
```

### 2. Firebase: "No Firebase App '[DEFAULT]' has been created"

**Problem:** You forgot to initialize Firebase.

**Solution:**
```dart
await Firebase.initializeApp(
  options: DefaultFirebaseOptions.currentPlatform,
);
```

Do this **before** configuring AuthService!

### 3. Avatar uploads fail silently

**Problem:** Storage bucket not configured or wrong permissions.

**For Firebase:** Check Storage Rules (see Step 4 in Firebase section)
**For Supabase:** Make sure `avatars` bucket exists and is public

### 4. "User already exists" but register succeeds

**Problem:** Your backend implementation isn't checking for duplicate emails.

**Solution:** Make sure your implementation returns `AuthResult.failure(AuthError.emailAlreadyInUse)` when email exists.

### 5. Password reset doesn't work

**Problem:** `useOtpPage` is set to `true` but your backend uses email links (Firebase/Supabase).

**Solution:** Set `useOtpPage = false` in `auth_config.dart`.

---

## 🔑 Social Login Setup

Want those fancy "Sign in with Google/Apple/Facebook" buttons to actually work? Here's the full setup. Grab a snack, this might take a minute. ☕

### Required Dependencies

Add these to your `pubspec.yaml`:

```yaml
dependencies:
  # ================================
  # SOCIAL LOGIN (Pick what you need)
  # ================================
  
  # Google Sign-In
  google_sign_in: ^6.2.1
  
  # Apple Sign-In
  sign_in_with_apple: ^6.1.1
  crypto: ^3.0.3  # Required for Apple's nonce
  
  # Facebook Sign-In
  flutter_facebook_auth: ^7.0.1
```

---

### 🔵 Google Sign-In Setup

#### For Firebase:

1. **Firebase Console Setup:**
   - Go to Firebase Console → Authentication → Sign-in method
   - Enable "Google" provider
   - Download the updated config files

2. **Android Setup:**
   - Add your SHA-1 fingerprint to Firebase Console
   - Run: `keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android`
   - Download updated `google-services.json` → `android/app/`

3. **iOS Setup:**
   - Download `GoogleService-Info.plist` → `ios/Runner/`
   - Add URL scheme to `ios/Runner/Info.plist`:
   ```xml
   <key>CFBundleURLTypes</key>
   <array>
     <dict>
       <key>CFBundleURLSchemes</key>
       <array>
         <!-- Reversed client ID from GoogleService-Info.plist -->
         <string>com.googleusercontent.apps.YOUR_CLIENT_ID</string>
       </array>
     </dict>
   </array>
   ```

#### For Supabase:

1. **Google Cloud Console:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs (from Supabase dashboard)

2. **Supabase Dashboard:**
   - Go to Authentication → Providers → Google
   - Enable and add your Client ID + Secret

3. **Platform Setup:** Same as Firebase (SHA-1 for Android, URL scheme for iOS)

---

### 🍎 Apple Sign-In Setup

*iOS users expect this. App Store might reject you without it!*

#### Prerequisites:
1. Apple Developer account ($99/year)
2. App registered in Apple Developer portal
3. Sign in with Apple capability enabled

#### Xcode Setup:

1. Open your iOS project in Xcode
2. Select your target → Signing & Capabilities
3. Click "+ Capability" → Add "Sign in with Apple"

#### For Firebase:

1. **Firebase Console:**
   - Go to Authentication → Sign-in method → Apple
   - Enable it
   - For web, you'll need to configure Services ID

2. **Apple Developer Portal:**
   - Create a Services ID for web
   - Configure the redirect URL from Firebase

#### For Supabase:

1. **Supabase Dashboard:**
   - Go to Authentication → Providers → Apple
   - Enable and follow the setup instructions

#### Android Support (Yes, it works!):

Apple Sign-In on Android requires additional setup:
1. Create a Services ID in Apple Developer portal
2. Add your redirect URL
3. Configure the `sign_in_with_apple` package for web/Android

```dart
// For Android, you need to use the web flow:
SignInWithApple.getAppleIDCredential(
  scopes: [AppleIDAuthorizationScopes.email],
  webAuthenticationOptions: WebAuthenticationOptions(
    clientId: 'your.services.id',
    redirectUri: Uri.parse('https://your-backend.com/callback'),
  ),
);
```

---

### 👤 Facebook Sign-In Setup

*More steps than Google, but still manageable!*

#### Step 1: Create Facebook App

1. Go to [developers.facebook.com](https://developers.facebook.com/)
2. Create a new app
3. Add "Facebook Login" product
4. Note your App ID and App Secret

#### Step 2: Android Setup

Add to `android/app/src/main/res/values/strings.xml`:
```xml
<resources>
    <string name="facebook_app_id">YOUR_APP_ID</string>
    <string name="facebook_client_token">YOUR_CLIENT_TOKEN</string>
    <string name="fb_login_protocol_scheme">fbYOUR_APP_ID</string>
</resources>
```

Add to `android/app/src/main/AndroidManifest.xml` inside `<application>`:
```xml
<meta-data android:name="com.facebook.sdk.ApplicationId" 
           android:value="@string/facebook_app_id"/>
<meta-data android:name="com.facebook.sdk.ClientToken" 
           android:value="@string/facebook_client_token"/>

<activity android:name="com.facebook.FacebookActivity"
          android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
          android:label="@string/app_name" />
```

#### Step 3: iOS Setup

Add to `ios/Runner/Info.plist`:
```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>fbYOUR_APP_ID</string>
    </array>
  </dict>
</array>
<key>FacebookAppID</key>
<string>YOUR_APP_ID</string>
<key>FacebookClientToken</key>
<string>YOUR_CLIENT_TOKEN</string>
<key>FacebookDisplayName</key>
<string>Your App Name</string>
```

#### Step 4: Backend Configuration

**Firebase:**
- Go to Authentication → Sign-in method → Facebook
- Add your App ID and App Secret

**Supabase:**
- Go to Authentication → Providers → Facebook
- Add your App ID and App Secret

---

### 🎯 Quick Reference: Social Login Dependencies

| Provider | Package | Firebase | Supabase | Custom Backend |
|----------|---------|----------|----------|---------------|
| Google | `google_sign_in: ^6.2.1` | ✅ | ✅ | ✅ |
| Apple | `sign_in_with_apple: ^6.1.1` + `crypto: ^3.0.3` | ✅ | ✅ | ✅ |
| Facebook | `flutter_facebook_auth: ^7.0.1` | ✅ | ⚠️ OAuth flow | ✅ |

---

## 🔗 Deep Linking & Callback Handling

For magic links, password resets, and email confirmations (especially with Supabase/Firebase) to redirect back to your app on iOS, you need to configure Deep Links.

### 1. Universal Links (Recommended)

Universal links allow standard HTTPS URLs (e.g., `https://your-project.supabase.co/auth/v1/verify`) to open your app directly.

**Setup:**
1. **Apple Developer Portal:** Enable "Associated Domains" capability.
2. **Xcode:** Add `applinks:your-domain.com` to Associated Domains capability.
3. **Host:** Host an `apple-app-site-association` file on your domain.

### 2. Custom URL Schemes (Easier)

If you don't want to mess with associated domains, use a custom scheme (e.g., `io.supabase.flutter://`).

**Info.plist Setup:**

Append this to your `ios/Runner/Info.plist`:

```xml
<key>FlutterDeepLinkingEnabled</key>
<true/>
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleTypeRole</key>
    <string>Editor</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>io.supabase.flutterquickstart</string> <!-- Replace with your scheme -->
    </array>
  </dict>
</array>
```

**Supabase Config:**
- Go to Auth -> URL Configuration
- Add `io.supabase.flutterquickstart://login-callback` to Redirect URLs.

**Firebase Config:**
- Add your dynamic link domain in Firebase Console.

### 3. Handling Callbacks in App

The `go_router` setup in `router/app_router.dart` handles incoming links. Ensure your `AuthService` listens to the incoming link if your backend SDK doesn't handle it automatically.

---

## 📱 iOS Avatar Upload Troubleshooting

*"Why does avatar upload work on Android but fail on iOS?!"* — Every Flutter dev ever

### Common iOS Issues and Fixes

#### Issue 1: Silent Upload Failures

**Symptom:** No error, but avatar doesn't appear

**Causes & Solutions:**

1. **Wrong MIME type:**
   ```dart
   // ❌ BAD - iOS doesn't like this
   await storage.upload(fileName, file);
   
   // ✅ GOOD - Explicit content type
   await storage.uploadBinary(
     fileName,
     bytes,
     fileOptions: FileOptions(
       contentType: 'image/jpeg', // CRITICAL!
     ),
   );
   ```

2. **File path not accessible:**
   ```dart
   // ❌ BAD - XFile path might not work on iOS
   final file = File(xFile.path);
   await storage.upload(fileName, file);
   
   // ✅ GOOD - Read bytes directly
   final bytes = await xFile.readAsBytes();
   await storage.uploadBinary(fileName, Uint8List.fromList(bytes));
   ```

#### Issue 2: 403 Forbidden Errors

**For Supabase:**
```sql
-- Make sure your bucket has proper policies!

-- Allow anyone to read avatars
CREATE POLICY "Public avatars are viewable"
ON storage.objects FOR SELECT
USING ( bucket_id = 'avatars' );

-- Allow users to upload their own avatar
CREATE POLICY "Users can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'avatars' );
```

**For Firebase:**
```javascript
// storage.rules
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

#### Issue 3: HEIC Format Problems

iOS cameras use HEIC by default. Some backends don't like it.

**Solution:** Handle HEIC MIME type:
```dart
String getMimeType(String extension) {
  switch (extension.toLowerCase()) {
    case 'heic': return 'image/heic';
    case 'heif': return 'image/heif';
    case 'jpg':
    case 'jpeg': return 'image/jpeg';
    case 'png': return 'image/png';
    default: return 'image/jpeg';
  }
}
```

#### Issue 4: Permission Denied

Make sure `ios/Runner/Info.plist` has:
```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>We need access to your photos to set your profile picture.</string>
<key>NSCameraUsageDescription</key>
<string>We need access to your camera to take a profile picture.</string>
```

---

## FAQ


**Q: Can I use multiple auth methods (email + Google Sign-In)?**  
A: Absolutely! Implement the social sign-in methods in your backend implementation.

**Q: Do I need to modify the UI screens?**  
A: Nope! The beauty of this architecture is that UI is completely decoupled from backend.

**Q: Can I switch from Firebase to Supabase later?**  
A: Yes! Just create a new implementation and swap one line in `main.dart`. The UI won't even notice.

**Q: What about user sessions/persistence?**  
A: The `AuthWrapper` widget handles this! It listens to `authStateChanges` and redirects users automatically.

**Q: How do I customize error messages?**  
A: Check `lib/onfinty_auth/l10n/` for localization files. You can override error messages there.

**Q: Can I add my own fields to user registration (like phone number)?**  
A: Yes! Add fields to `UserEntity` in `models/user_entity.dart` and adjust your backend implementation.

**Q: Is this production-ready?**  
A: The UI and architecture? Absolutely! Your backend implementation? That's on you. 😉

---

## Need Help?

- Check `lib/onfinty_auth/auth_backend_examples.dart` for complete code examples
- Read the `CHANGELOG.md` for recent updates
- The `AuthInterface` is your contract - fulfill it, and everything will work!

---

**You made it! 🎉** Now go forth and authenticate all the things. Remember: with great auth power comes great responsibility (to not store passwords in plain text). 

Happy coding! 🚀
