import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token:
      'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJzdXBlcmFkbWluIiwidXNlcl9pZCI6ImM4ZTgwMDA0LWE0NDktNGI5NC1hNTY2LTZmZmY2Y2U1MmI0NCIsImlhdCI6MTcyNjA0ODQxNywiZXhwIjoxNzI2MTM0ODE3fQ.p9AQj4rLzUAa3oeaFLdQ2kKzDf4Eh-e5vOq2WcEmzIRP9cJa3GyirGzpmAnssJL8AKwyW-bwlSFsJlZtnPIOZnQJBpV6fX_bZUxkLSEDZF95dHtquSRyKcvmD6F88EqF69zFq7_-V2slZkmA2pAyNFbuCc9HSDXB1-0o_L8cRsbZrmUNQKPBlZOqR9Aqwegyiov6CNr4BzQkrgg7TYD3W0DvQfkBtYIWTybBWkJXIrawk8DRnU8Wqn-vsuceV5CjSZutv5CZJ7U267cOU1ku9g55ft2FEktrXP5NwgTxsyGfOKEFMrf1Tebxcavx0CjDjsAPYlr8rxTTLfRkWWTDew',
  }),
  getters: {},
  actions: {},
});
