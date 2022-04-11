import {defineStore} from 'pinia'

export const useGeneralPreferencesStore = defineStore({
    id: 'generalPreferences',
    state: () => ({
        side: ''
    }),
    actions: {
        setSide(selectedSide: string): void {
            this.side = selectedSide;
        }
    }
})
