<template>
  <div class="min-h-screen">
    <header class="fixed w-full bg-slate-950 z-10">
      <MainHeader />
    </header>
    <main>
      <div class="p-9" />
      <slot />
    </main>
  </div>
</template>

<style scoped>
.gd-container {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
}
</style>
