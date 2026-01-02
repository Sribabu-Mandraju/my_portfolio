# React Native Guide for React Developers

> **A comprehensive guide to help React developers transition to React Native development using Expo Router and NativeWind.**

---

## 📋 Table of Contents

- [Key Differences: React vs React Native](#-key-differences-react-vs-react-native)
- [Project Architecture: Expo Router](#-project-architecture-expo-router-file-based-routing)
- [Architecture Breakdown](#️-architecture-breakdown)
- [Styling with NativeWind](#-styling-with-nativewind-tailwind-css)
- [Writing Your Own Components](#-writing-your-own-components)
- [Navigation Patterns](#-navigation-patterns)
- [React Native Specific Concepts](#-react-native-specific-concepts)
- [Best Practices](#-best-practices)
- [Creating a New Screen](#-creating-a-new-screen)
- [Common Patterns](#-common-patterns-in-this-project)
- [Quick Reference](#-quick-reference)

---

## 🎯 Key Differences: React vs React Native

### 1. Components Instead of HTML Elements

**React (Web):**

```jsx
<div className="container">
  <h1>Hello</h1>
  <button onClick={handleClick}>Click me</button>
</div>
```

**React Native:**

```jsx
<View className="container">
  <Text>Hello</Text>
  <TouchableOpacity onPress={handleClick}>
    <Text>Click me</Text>
  </TouchableOpacity>
</View>
```

**Key Component Mappings:**

| React (Web)             | React Native                   | Notes                                |
| ----------------------- | ------------------------------ | ------------------------------------ |
| `<div>`                 | `<View>`                       | Container component                  |
| `<p>`, `<h1>`, `<span>` | `<Text>`                       | **ALL text must be wrapped in Text** |
| `<button>`              | `<TouchableOpacity>`           | Provides press feedback              |
| `<img>`                 | `<Image>`                      | Requires `source` prop               |
| `<input type="text">`   | `<TextInput>`                  | Text input component                 |
| `<ul>`, `<ol>`          | `<FlatList>` or `<ScrollView>` | For lists                            |

### 2. Styling Differences

**React (Web):**

```jsx
// CSS file or inline styles
<div style={{ color: 'blue', fontSize: 16 }}>Text</div>
<div className="my-class">Text</div>
```

**React Native (with NativeWind):**

```jsx
<View className="bg-blue-500 p-4 rounded-lg">
  <Text className="text-white text-lg">Text</Text>
</View>
```

**Important Styling Notes:**

- ❌ **No CSS files** (unless using NativeWind/Tailwind)
- ✅ Use `style` prop for inline styles (object, not string)
- ✅ Use `className` with NativeWind (Tailwind CSS for React Native)
- ✅ Flexbox is default (no need for `display: flex`)
- ✅ All dimensions are unitless (numbers represent density-independent pixels)

---

## 📁 Project Architecture: Expo Router (File-Based Routing)

This project uses **Expo Router**, which provides file-based routing similar to Next.js.

### Directory Structure

```
project-root/
├── app/                      # Routes directory
│   ├── _layout.tsx          # Root layout (wraps everything)
│   ├── (tabs)/              # Tab group (parentheses = route group)
│   │   ├── _layout.tsx      # Tab navigation layout
│   │   ├── index.tsx        # Home tab (/)
│   │   ├── explore.tsx      # Explore tab (/explore)
│   │   ├── favorites.tsx    # Favorites tab (/favorites)
│   │   └── settings.tsx      # Settings tab (/settings)
│   ├── index.tsx            # Root route (/)
│   ├── details.tsx          # Details page (/details)
│   └── about.tsx            # About page (/about)
│
├── components/              # Reusable components
│   ├── Header.tsx
│   ├── SideDrawer.tsx
│   └── TabsHeader.tsx
│
├── contexts/                # React Context providers
│   └── DrawerContext.tsx
│
├── assets/                  # Images, fonts, etc.
└── global.css              # NativeWind/Tailwind styles
```

### How Routing Works

1. **File = Route**: `app/index.tsx` → `/` route
2. **Folders = Nested Routes**: `app/(tabs)/index.tsx` → `/` (inside tabs)
3. **Parentheses = Route Groups**: `(tabs)` doesn't add to URL, just groups routes
4. **`_layout.tsx`**: Special file that wraps child routes

### Navigation Examples

**Programmatic Navigation:**

```tsx
import { router } from "expo-router";

// Navigate forward
router.push("/details"); // Adds to stack
router.replace("/about"); // Replaces current route

// Navigate back
router.back();
```

**Link Component:**

```tsx
import { Link } from "expo-router";

<Link href="/details">Go to Details</Link>;
```

**Passing Parameters:**

```tsx
// Navigate with params
router.push({
  pathname: "/details",
  params: { id: "123", name: "John" },
});

// Receive params
import { useLocalSearchParams } from "expo-router";

export default function DetailsScreen() {
  const { id, name } = useLocalSearchParams();
  return (
    <Text>
      ID: {id}, Name: {name}
    </Text>
  );
}
```

---

## 🏗️ Architecture Breakdown

### 1. Root Layout (`app/_layout.tsx`)

The entry point that wraps your entire app:

```tsx
import { Stack } from "expo-router";
import { DrawerProvider } from "../contexts/DrawerContext";
import "../global.css"; // NativeWind CSS import

export default function RootLayout() {
  return (
    <DrawerProvider>
      {" "}
      {/* Context provider for drawer state */}
      <Stack>
        {" "}
        {/* Stack navigator (like React Router) */}
        <Stack.Screen name="(tabs)" /> {/* Tab navigation group */}
        <Stack.Screen name="details" /> {/* Individual screen */}
      </Stack>
    </DrawerProvider>
  );
}
```

**What it does:**

- Provides global context (drawer state)
- Sets up navigation structure
- Imports global styles

### 2. Tab Layout (`app/(tabs)/_layout.tsx`)

Defines bottom tab navigation:

```tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
    </Tabs>
  );
}
```

**Key Concepts:**

- `Tabs` component creates bottom navigation
- Each `Tabs.Screen` = one tab
- `options` prop configures tab appearance

### 3. Screen Components (`app/(tabs)/index.tsx`)

Regular React components that become screens:

```tsx
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      <Text className="text-2xl font-bold">Home Screen</Text>
    </View>
  );
}
```

**Important:**

- ✅ Must have a default export
- ✅ Component name doesn't matter (file name does)
- ✅ Use React Native components, not HTML

---

## 🎨 Styling with NativeWind (Tailwind CSS)

### Setup (Already Done)

The project is pre-configured with:

1. **`tailwind.config.js`** - Tailwind configuration
2. **`global.css`** - Tailwind directives
3. **`babel.config.js`** - NativeWind babel plugin
4. **`metro.config.js`** - Metro bundler config

### Usage

```tsx
// Use className prop (just like Tailwind)
<View className="flex-1 bg-white p-4">
  <Text className="text-2xl font-bold text-primary-600">Hello World</Text>
</View>
```

### Custom Colors

```tsx
// Use your custom primary colors from tailwind.config.js
<View className="bg-primary-500">
  <Text className="text-primary-600">Green text</Text>
</View>
```

### Combining with Inline Styles

```tsx
<View
  className="flex-1 bg-white"
  style={{ paddingTop: 20 }} // Dynamic styles
>
  <Text>Content</Text>
</View>
```

---

## 🧩 Writing Your Own Components

### Basic Component Structure

```tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MyComponentProps {
  title: string;
  onPress: () => void;
}

export default function MyComponent({ title, onPress }: MyComponentProps) {
  return (
    <View className="p-4 bg-white rounded-lg shadow-sm">
      <Text className="text-xl font-bold mb-2">{title}</Text>
      <TouchableOpacity
        onPress={onPress}
        className="bg-primary-500 p-3 rounded-lg"
        activeOpacity={0.7}
      >
        <Text className="text-white text-center font-semibold">Click Me</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Using Hooks (Same as React)

```tsx
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);

  return (
    <View>
      <Text>Count: {count}</Text>
      <TouchableOpacity onPress={() => setCount(count + 1)}>
        <Text>Increment</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Using Context (Same as React)

```tsx
// In contexts/MyContext.tsx
import { createContext, useContext, useState } from "react";

const MyContext = createContext();

export function MyProvider({ children }) {
  const [value, setValue] = useState(0);
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

export const useMyContext = () => useContext(MyContext);

// In component
import { useMyContext } from "../contexts/MyContext";

export default function MyComponent() {
  const { value, setValue } = useMyContext();
  return <Text>{value}</Text>;
}
```

---

## 🧭 Navigation Patterns

### 1. Stack Navigation (Push/Pop)

```tsx
import { router } from "expo-router";

// Navigate forward
router.push("/details"); // Adds to stack
router.replace("/details"); // Replaces current

// Navigate back
router.back();
```

### 2. Tab Navigation (Switch Tabs)

```tsx
import { router } from "expo-router";

// Programmatically switch tabs
router.push("/(tabs)/explore"); // Switch to explore tab
```

### 3. Passing Data Between Screens

```tsx
// Navigate with params
router.push({
  pathname: "/details",
  params: { id: "123", name: "John" },
});

// Receive params
import { useLocalSearchParams } from "expo-router";

export default function DetailsScreen() {
  const { id, name } = useLocalSearchParams();
  return (
    <Text>
      ID: {id}, Name: {name}
    </Text>
  );
}
```

---

## 📱 React Native Specific Concepts

### 1. Safe Area Insets (Notches, Home Indicators)

```tsx
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MyScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top, // Top notch
        paddingBottom: insets.bottom, // Bottom home indicator
      }}
    >
      <Text>Content</Text>
    </View>
  );
}
```

### 2. ScrollView (Scrollable Content)

```tsx
import { ScrollView, View, Text } from "react-native";

export default function ScrollableScreen() {
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ padding: 20 }}
    >
      <View className="h-96 bg-primary-100 mb-4">
        <Text>Item 1</Text>
      </View>
      <View className="h-96 bg-primary-200 mb-4">
        <Text>Item 2</Text>
      </View>
      {/* More items... */}
    </ScrollView>
  );
}
```

### 3. FlatList (Efficient Lists)

```tsx
import { FlatList, View, Text } from "react-native";

const data = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
];

export default function ListScreen() {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="p-4 bg-white mb-2">
          <Text>{item.title}</Text>
        </View>
      )}
    />
  );
}
```

### 4. Animations (React Native Reanimated)

```tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function AnimatedComponent() {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  return (
    <Animated.View style={animatedStyle}>
      <Text>Fade in animation</Text>
    </Animated.View>
  );
}
```

---

## 🎯 Best Practices

### 1. Component Organization

```
components/
├── ui/              # Basic UI components
│   ├── Button.tsx
│   └── Card.tsx
├── features/        # Feature-specific components
│   ├── UserProfile.tsx
│   └── ProductList.tsx
└── layout/          # Layout components
    ├── Header.tsx
    └── Footer.tsx
```

### 2. File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- **Screens**: `lowercase.tsx` (e.g., `index.tsx`, `details.tsx`)
- **Contexts**: `PascalCase.tsx` (e.g., `DrawerContext.tsx`)

### 3. TypeScript Types

```tsx
// Define props interface
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

export default function Button({
  title,
  onPress,
  disabled = false,
  variant = "primary",
}: ButtonProps) {
  // Component code
}
```

### 4. State Management

- **Local State**: `useState` for component-specific state
- **Context**: For app-wide state (like drawer state)
- **External Libraries**: Redux, Zustand, Jotai (if needed)

### 5. Performance Tips

```tsx
// Use React.memo for expensive components
export default React.memo(function ExpensiveComponent({ data }) {
  return <View>{/* Complex rendering */}</View>;
});

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// Use useCallback for stable function references
const handlePress = useCallback(() => {
  doSomething();
}, [dependencies]);
```

---

## 🚀 Creating a New Screen

### Step-by-Step Guide

**1. Create file**: `app/my-new-screen.tsx`

```tsx
import { View, Text } from "react-native";

export default function MyNewScreen() {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Text className="text-2xl font-bold text-primary-600">My New Screen</Text>
    </View>
  );
}
```

**2. Add to navigation** (if needed in Stack):

```tsx
// In app/_layout.tsx
<Stack.Screen name="my-new-screen" />
```

**3. Navigate to it**:

```tsx
import { router } from "expo-router";

router.push("/my-new-screen");
```

---

## 🔧 Common Patterns in This Project

### 1. Drawer Pattern (Side Menu)

```tsx
// Context provides state
const { isOpen, openDrawer, closeDrawer } = useDrawer();

// Component uses state
<SideDrawer isOpen={isOpen} onClose={closeDrawer} />;
```

### 2. Header Pattern

```tsx
// Custom header component
<Tabs
  screenOptions={{
    header: () => <TabsHeader />,  // Custom header
  }}
>
```

### 3. Tab Navigation Pattern

```tsx
<Tabs>
  <Tabs.Screen
    name="index"
    options={{
      title: "Home",
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" size={size} color={color} />
      ),
    }}
  />
</Tabs>
```

---

## 📚 Key Libraries Used

1. **Expo Router** - File-based routing (like Next.js)
2. **NativeWind** - Tailwind CSS for React Native
3. **React Navigation** - Navigation primitives
4. **React Native Reanimated** - Smooth animations
5. **Expo Vector Icons** - Icon library

---

## 🎓 Quick Reference

### React → React Native Cheat Sheet

| React (Web)             | React Native             | Notes                    |
| ----------------------- | ------------------------ | ------------------------ |
| `<div>`                 | `<View>`                 | Container                |
| `<p>`, `<h1>`, `<span>` | `<Text>`                 | All text must be in Text |
| `<button>`              | `<TouchableOpacity>`     | With press feedback      |
| `<img>`                 | `<Image source={...} />` | Requires source prop     |
| `<input>`               | `<TextInput />`          | Text input               |
| `onClick`               | `onPress`                | Event handler            |
| `className`             | `className`              | With NativeWind          |
| CSS files               | NativeWind/Tailwind      | Styling approach         |
| `window`                | ❌ Not available         | Use Platform API         |
| `document`              | ❌ Not available         | Use React Native APIs    |

---

## 💡 Tips for React Developers

1. **No CSS**: Use NativeWind (Tailwind) or StyleSheet API
2. **No DOM**: Use React Native components
3. **Flexbox Default**: Everything uses flexbox by default
4. **Text Must Be Wrapped**: All text must be in `<Text>` component
5. **Images Need Source**: `<Image source={require('./image.png')} />`
6. **No Hover States**: Use `activeOpacity` for press feedback
7. **Platform Specific**: Use `Platform.OS === 'ios'` for platform checks

---

## 🎯 Next Steps

1. **Create a new screen** in `app/`
2. **Build a reusable component** in `components/`
3. **Add navigation** between screens
4. **Style with NativeWind** classes
5. **Add state management** with Context or hooks

---

## 📝 Summary

This guide covers the essential differences between React and React Native, focusing on:

- ✅ Component differences and mappings
- ✅ Styling with NativeWind (Tailwind CSS)
- ✅ File-based routing with Expo Router
- ✅ Navigation patterns
- ✅ React Native specific concepts
- ✅ Best practices and performance tips

**Happy coding! 🚀**

---

_For more information, check out the [React Native Documentation](https://reactnative.dev/) and [Expo Router Documentation](https://docs.expo.dev/router/introduction/)._
