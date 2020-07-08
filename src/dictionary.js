/*
    Dictionary mapping of Mendix sass variable
    to ADS theme color variable

    IMPORTANT: the value of each key MUST be
    part of the ThemeColors exported from
    @adapt-design-system/tokens
*/

/* @TODO
    Can we throw an error if the value in here does not map to a color? example was when setting 'transparent' - that is a CSS value not a token name.
*/
module.exports = {
    'brand-accent': 'accent',
    'link-color': 'accent',
    'bg-color': 'background',
    'sidebar-bg': 'background',
    'bg-color-secondary': 'backgroundSurface',
    'brand-error': 'error',
    'brand-default': 'muted',
    'default-border-color': 'muted',
    'gray-primary': 'muted',
    'brand-primary': 'primary',
    'font-color-detail': 'subduedText',
    'brand-success': 'success',
    'font-base-color': 'text',
    'font-color-headers': 'text',
    'brand-warning': 'warning',
    'form-input-border-focus-color': 'focus',
    'form-input-bg-hover': 'accent',
    'btn-inverse-bg': 'muted',
    'btn-default-bg': 'muted',
    'btn-default-color': 'text',
    'brand-inverse': 'black'
};
