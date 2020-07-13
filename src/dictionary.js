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
    'bg-color': 'background',
    'bg-color-secondary': 'backgroundSurface',
    'brand-accent': 'accent',
    'brand-default': 'muted',
    'brand-error': 'error',
    'brand-inverse': 'black',
    'brand-primary': 'primary',
    'brand-success': 'success',
    'brand-warning': 'warning',
    'btn-default-bg': 'muted',
    'btn-default-color': 'text',
    'btn-inverse-bg': 'text',
    'btn-inverse-color': 'white',
    'default-border-color': 'muted',
    'font-base-color': 'text',
    'font-color-detail': 'subduedText',
    'font-color-headers': 'text',
    'form-input-bg-hover': 'accent',
    'form-input-border-focus-color': 'focus',
    'gray-primary': 'muted',
    'link-color': 'accent',
    'sidebar-bg': 'background',
};
