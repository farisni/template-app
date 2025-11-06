// usePopperOptions.js
export function useDefaultPopperOptions() {
    return {
        modifiers: [
            {
                name: 'flip',
                options: {
                    fallbackPlacements: ['bottom'],
                    allowedAutoPlacements: ['bottom'],
                },
            },
        ],
    }
}
