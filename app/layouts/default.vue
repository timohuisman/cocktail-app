<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100">
    <header class="border-b border-neutral-800">
      <nav class="mx-auto flex max-w-4xl items-center gap-6 px-4 py-4">
        <NuxtLink to="/" class="text-lg font-semibold tracking-tight">
          🍸 Cocktail App
        </NuxtLink>
        <div class="flex gap-4 text-sm text-neutral-300">
          <NuxtLink to="/" class="hover:text-white" active-class="text-white font-medium">Ontdekken</NuxtLink>
          <NuxtLink to="/what-can-i-make" class="hover:text-white" active-class="text-white font-medium">Wat kan ik maken</NuxtLink>
          <NuxtLink to="/recipes" class="hover:text-white" active-class="text-white font-medium">Mijn recepten</NuxtLink>
          <NuxtLink to="/favorites" class="hover:text-white" active-class="text-white font-medium">Favorieten</NuxtLink>
        </div>
      </nav>
    </header>
    <main class="mx-auto max-w-4xl px-4 py-8">
      <slot />
    </main>
  </div>
</template>
