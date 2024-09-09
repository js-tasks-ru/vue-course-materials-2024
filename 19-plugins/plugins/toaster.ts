import { createApp, inject } from 'vue'
import type { Plugin, InjectionKey } from 'vue'
import UiToaster from './UiToaster.vue'

type Toaster = {
  toast: (message: string) => void
} & Plugin<void>

export const TOASTER_KEY: InjectionKey<Toaster> = Symbol('TOASTER_KEY')

export function useToaster() {
  return inject(TOASTER_KEY)!
}

export function createToaster({ container }: { container?: string | HTMLElement } = {}): Toaster {
  const addDefaultContainer = () => document.body.appendChild(document.createElement('div'))
  const containerToMount = container ?? addDefaultContainer()
  const toasterInstance = createApp(UiToaster).mount(containerToMount) as InstanceType<typeof UiToaster>

  const toaster: Toaster = {
    toast: toasterInstance.toast,
    install(app) {
      app.provide(TOASTER_KEY, toaster)
    },
  }

  return toaster
}
